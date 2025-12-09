/**
 * Simple Profanity Filter
 * Filters inappropriate content from user-generated text
 */

// Common profanity list (add more as needed)
const profanityList = [
  'fuck', 'shit', 'ass', 'bitch', 'damn', 'crap', 'piss', 'dick', 'cock',
  'pussy', 'bastard', 'slut', 'whore', 'fag', 'nigger', 'nigga', 'retard',
  'cunt', 'twat', 'wank', 'bollocks', 'arse', 'bloody', 'bugger',
  // Add variations
  'f*ck', 'sh*t', 'b*tch', 'a$$', 'f u c k', 's h i t',
  // Common leetspeak
  'fuk', 'sht', 'btch', 'azz', 'phuck', 'shyt'
];

// Inappropriate patterns (URLs, emails, etc.)
const inappropriatePatterns = [
  /https?:\/\//i,  // URLs
  /www\./i,        // www.
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,  // Email addresses
  /<script/i,      // XSS attempts
  /javascript:/i,  // JavaScript injection
  /on\w+=/i        // Event handlers (onclick=, onload=, etc.)
];

/**
 * Check if text contains profanity
 * @param {string} text - Text to check
 * @returns {boolean} - True if profanity found
 */
export function containsProfanity(text) {
  if (!text) return false;

  const lowerText = text.toLowerCase();

  // Check against profanity list
  for (const word of profanityList) {
    // Use word boundaries to avoid false positives (e.g., "class" contains "ass")
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(lowerText)) {
      return true;
    }
  }

  // Check inappropriate patterns
  for (const pattern of inappropriatePatterns) {
    if (pattern.test(text)) {
      return true;
    }
  }

  return false;
}

/**
 * Clean text by replacing profanity with asterisks
 * @param {string} text - Text to clean
 * @returns {string} - Cleaned text
 */
export function cleanText(text) {
  if (!text) return '';

  let cleaned = text;

  // Replace profanity with asterisks
  for (const word of profanityList) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    cleaned = cleaned.replace(regex, '*'.repeat(word.length));
  }

  // Remove URLs
  cleaned = cleaned.replace(/https?:\/\/[^\s]+/gi, '[URL removed]');
  cleaned = cleaned.replace(/www\.[^\s]+/gi, '[URL removed]');

  // Remove emails
  cleaned = cleaned.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[Email removed]');

  return cleaned;
}

/**
 * Validate text for user input
 * @param {string} text - Text to validate
 * @param {number} maxLength - Maximum allowed length
 * @returns {Object} - { valid: boolean, error: string, cleaned: string }
 */
export function validateText(text, maxLength = 500) {
  if (!text || text.trim().length === 0) {
    return { valid: false, error: 'Text cannot be empty' };
  }

  if (text.length > maxLength) {
    return { valid: false, error: `Text exceeds maximum length of ${maxLength} characters` };
  }

  if (containsProfanity(text)) {
    return { valid: false, error: 'Text contains inappropriate content' };
  }

  // Clean the text (remove extra whitespace, etc.)
  const cleaned = text.trim().replace(/\s+/g, ' ');

  return { valid: true, cleaned };
}
