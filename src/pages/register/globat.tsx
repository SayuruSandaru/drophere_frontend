// src/global.d.ts

// Import Firebase Auth types from Firebase v9
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}
