import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import compression from 'compression';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
app.use(compression());

const angularApp = new AngularNodeAppEngine();

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Language detection and redirect middleware
 * This runs before Angular handles the routes
 */
app.use((req, res, next) => {
  const path = req.url;
  const supportedLocales = ['ro', 'en'];

  // Skip if it's already a localized URL, static asset, or root path
  if (supportedLocales.some(locale => path.startsWith(`/${locale}/`)) ||
      path.includes('.') ||
      path === '/' ||
      path.startsWith('/_')) {
    return next();
  }

  // Extract browser language preference
  const acceptLanguage = req.headers['accept-language'] || '';
  let detectedLocale = 'ro'; // default to Romanian (your sourceLocale)

  // Parse accept-language header to find supported languages
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [language] = lang.split(';')[0].trim().split('-');
      return language.toLowerCase();
    })
    .filter(lang => supportedLocales.includes(lang));

  if (languages.length > 0) {
    detectedLocale = languages[0];
  }

  // Redirect to localized URL
  const redirectUrl = `/${detectedLocale}${path}`;
  console.log(`Redirecting ${path} -> ${redirectUrl}`);
  res.redirect(302, redirectUrl);
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);