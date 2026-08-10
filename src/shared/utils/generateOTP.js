import crypto from "crypto";

/**
 * Generates a cryptographically secure, uniform random alphanumeric OTP.
 * Uses Rejection Sampling to completely eliminate modulo bias.
 * 
 * @param {number} length - Desired OTP length (defaults to process.env.OTP_LENGTH or 6)
 * @returns {string} Generated OTP string
 */
const generateAlphanumericOTP = (length = Number(process.env.OTP_LENGTH) || 6) => {
  // 1. Fallback defaults if env vars are undefined
  const characters = process.env.OTP_CHARACTERS || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charLength = characters.length;
  
  // 2. ELIMINATE MODULO BIAS:
  // A single raw byte ranges from 0 to 255 (256 total values).
  // If 256 is not evenly divisible by charLength, using `byte % charLength`
  // directly will give the first few characters a higher statistical chance.
  //
  // maxValidByte finds the highest multiple of charLength that fits in 256.
  // Any byte >= maxValidByte is considered "unfair" and rejected.
  const maxValidByte = 256 - (256 % charLength);
  
  let otp = '';

  // 3. Keep drawing bytes until the full OTP length is met
  while (otp.length < length) {
    // Request only as many bytes as needed to fill the remaining OTP characters.
    // crypto.randomBytes uses OS hardware entropy (cryptographically secure).
    const bytes = crypto.randomBytes(length - otp.length);
    
    // 4. Process each byte in the buffer
    for (let i = 0; i < bytes.length && otp.length < length; i++) {
      const byte = bytes[i];
      
      // REJECTION SAMPLING: Discard byte if it falls in the biased upper remainder range
      if (byte < maxValidByte) {
        // Safe to use modulo — every valid character index now has 100% equal probability
        otp += characters[byte % charLength];
      }
      // Note: If (byte >= maxValidByte), it silently skips and the outer while loop
      // will fetch replacement bytes.
    }
  }

  return otp;
};

// Export the function for use across the application
export { generateAlphanumericOTP };