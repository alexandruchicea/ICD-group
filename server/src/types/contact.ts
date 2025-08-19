export interface ContactFormData {
  recaptchaToken: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  partnershipType?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

export interface ContactFormError {
  error: string;
  details?: {
    name?: string;
    email?: string;
    message?: string;
    recaptchaToken?: string;
  };
  message?: string;
}

export interface PartnershipType {
  value: string;
  label: string;
}

// Partnership types that match the frontend
export const PARTNERSHIP_TYPES: PartnershipType[] = [
  { value: 'Investitor', label: 'Investitor' },
  { value: 'Proprietar de Teren', label: 'Proprietar de Teren' },
  { value: 'Partener Industrial', label: 'Partener Industrial' },
  { value: 'Alt tip de parteneriat', label: 'Alt tip de parteneriat' }
];
