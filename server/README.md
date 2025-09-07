# ICD Group Backend API

Backend API for the ICD Group website with reCAPTCHA v2 verification and contact form handling.

## Features

- ✅ reCAPTCHA v2 verification
- ✅ Contact form processing
- ✅ Input validation
- ✅ Rate limiting
- ✅ Security headers (Helmet)
- ✅ CORS configuration
- ✅ TypeScript support
- ✅ Environment-based configuration

## Prerequisites

- Node.js 18+ 
- npm or yarn
- reCAPTCHA v2 site key and secret key

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the server root directory:
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your actual values:
   ```env
   PORT=3001
   NODE_ENV=development
   RECAPTCHA_SECRET=your_actual_recaptcha_secret_key
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### Watch Mode (auto-restart on changes)
```bash
npm run watch
```

## API Endpoints

### POST /api/contact
Submit a contact form with reCAPTCHA verification.

**Request Body:**
```json
{
  "recaptchaToken": "recaptcha_token_from_frontend",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in your services",
  "phone": "+1234567890",
  "company": "Example Corp",
  "partnershipType": "Investitor"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "timestamp": "2025-01-27T10:30:00.000Z"
}
```

### GET /health
Health check endpoint.

## reCAPTCHA Integration

This backend uses reCAPTCHA v2 for bot protection. The verification process:

1. Frontend sends the reCAPTCHA token with form data
2. Backend validates the token with Google's verification API
3. Form is processed only if verification succeeds

## Security Features

- **Rate Limiting:** 100 requests per 15 minutes per IP
- **Security Headers:** Helmet.js for security headers
- **Input Validation:** Comprehensive form validation
- **CORS Protection:** Configurable CORS origins
- **Environment Variables:** Secure configuration management

## Project Structure

```
server/
├── src/
│   ├── routes/
│   │   └── contact.ts          # Contact form routes
│   ├── services/
│   │   └── recaptcha.ts        # reCAPTCHA verification service
│   ├── types/
│   │   └── contact.ts          # TypeScript interfaces
│   └── index.ts                # Main server file
├── package.json
├── tsconfig.json
├── env.example
└── README.md
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 3001 |
| `NODE_ENV` | Environment mode | No | development |
| `RECAPTCHA_SECRET` | reCAPTCHA secret key | Yes | - |
| `CLIENT_IP` | Client IP for reCAPTCHA | No | 127.0.0.1 |

## Development

### Adding New Routes
1. Create route file in `src/routes/`
2. Import and add to `src/index.ts`
3. Follow existing pattern for error handling

### Adding New Services
1. Create service file in `src/services/`
2. Export functions and interfaces
3. Import in route files as needed

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure proper CORS origins
3. Set up environment variables
4. Use PM2 or similar process manager
5. Set up reverse proxy (nginx/Apache)
6. Configure SSL certificates

## Troubleshooting

### Common Issues

1. **reCAPTCHA verification fails:**
   - Check `RECAPTCHA_SECRET` environment variable
   - Verify token format from frontend
   - Check Google reCAPTCHA admin console

2. **CORS errors:**
   - Verify CORS configuration in `src/index.ts`
   - Check frontend origin matches allowed origins

3. **Port already in use:**
   - Change `PORT` in `.env` file
   - Kill existing process using the port

## License

MIT License - see LICENSE file for details.
