import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "about",
    loadComponent: () =>
      import("./components/about/about.component").then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: "energy-solutions",
    loadComponent: () =>
      import("./components/energy-solutions/energy-solutions.component").then(
        (m) => m.EnergySolutionsComponent
      ),
  },
  {
    path: "portfolio",
    loadComponent: () =>
      import("./components/portfolio/portfolio.component").then(
        (m) => m.PortfolioComponent
      ),
  },
  {
    path: "partnership",
    loadComponent: () =>
      import("./components/partnership/partnership.component").then(
        (m) => m.PartnershipComponent
      ),
  },
  {
    path: "contact",
    loadComponent: () =>
      import("./components/contact/contact.component").then(
        (m) => m.ContactComponent
      ),
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];