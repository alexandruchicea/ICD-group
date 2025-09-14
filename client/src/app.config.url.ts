import { isDevMode } from "@angular/core";

export const API_URL = isDevMode() ?
  'http://localhost:3001/api' :
  'https://icdd.ro/api';
