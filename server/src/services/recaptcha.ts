import axios from "axios";

export interface RecaptchaVerificationResult {
  "success": boolean;
  "score"?: number; // For v3, undefined for v2
  "action"?: string; // For v3, undefined for v2
  "challenge_ts"?: string;
  "hostname"?: string;
  "error-codes"?: string[];
}

/**
 * Verify reCAPTCHA token with Google's verification API
 * @param token - The reCAPTCHA token from the frontend
 * @returns Promise<RecaptchaVerificationResult>
 */
export async function verifyRecaptcha(token: string): Promise<RecaptchaVerificationResult> {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET;

    if (!secretKey) {
      throw new Error("reCAPTCHA secret key not configured");
    }

    // Get client IP from environment or use a default
    const remoteIp = process.env.CLIENT_IP || "127.0.0.1";

    // Make request to Google's verification endpoint
    const response = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
      params: {
        secret: secretKey,
        response: token,
        remoteip: remoteIp,
      },
      timeout: 10000, // 10 second timeout
    });

    const result: RecaptchaVerificationResult = response.data;

    // Log verification result for debugging (remove in production)
    if (process.env.NODE_ENV === "development") {
      console.log("reCAPTCHA verification result:", {
        success: result.success,
        score: result.score,
        action: result.action,
        hostname: result.hostname,
        timestamp: result.challenge_ts,
        errors: result["error-codes"],
      });
    }

    return result;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);

    // Return failure result on error
    return {
      "success": false,
      "error-codes": ["verification-failed"],
    };
  }
}

/**
 * Validate reCAPTCHA token format (basic validation)
 * @param token - The reCAPTCHA token to validate
 * @returns boolean
 */
export function validateRecaptchaToken(token: string): boolean {
  if (!token || typeof token !== "string") {
    return false;
  }

  // Basic format validation for reCAPTCHA v2 token
  // Tokens are typically long strings with alphanumeric characters
  if (token.length < 20 || token.length > 1000) {
    return false;
  }

  // Check if token contains only valid characters
  const validTokenRegex = /^[a-zA-Z0-9_-]+$/;
  return validTokenRegex.test(token);
}
