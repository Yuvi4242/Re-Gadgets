// Config object for base repair durations in hours
export const BASE_DURATIONS = {
  Smartphone: 3,
  Laptop: 6,
  Tablet: 4,
  Other: 5
};

// Complexity multipliers based on keywords
export const COMPLEXITY_MULTIPLIERS = [
  { keywords: ['screen', 'display', 'glass'], multiplier: 1.0 },
  { keywords: ['motherboard', 'water damage', 'liquid damage', 'board'], multiplier: 1.8 }
];

export const DEFAULT_MULTIPLIER = 1.2;

/**
 * Calculates estimated completion time as an ISO string.
 * Formula: Base Duration * Complexity Multiplier + Queue Delay (Queue Length * 1.5 hours)
 * 
 * @param {Object} params
 * @param {string} params.deviceType - E.g. 'Smartphone', 'Laptop', 'Tablet', 'Other'
 * @param {string} params.issue - Description of the device issue
 * @param {string} [params.shopId] - Shop ID (optional/used for context)
 * @param {number} params.currentQueueLength - Number of active orders in queue for this shop
 * @returns {string} ISO Date String
 */
export const calculateEstimatedCompletion = ({ deviceType, issue, shopId, currentQueueLength = 0 }) => {
  // 1. Get base duration based on device type (casing-insensitive fallback to 'Other')
  const matchedType = Object.keys(BASE_DURATIONS).find(
    type => type.toLowerCase() === (deviceType || '').toLowerCase()
  ) || 'Other';
  const baseDuration = BASE_DURATIONS[matchedType];

  // 2. Determine complexity multiplier by scanning issue text keywords
  let multiplier = DEFAULT_MULTIPLIER;
  const issueLower = (issue || '').toLowerCase();
  
  for (const rule of COMPLEXITY_MULTIPLIERS) {
    if (rule.keywords.some(keyword => issueLower.includes(keyword))) {
      multiplier = rule.multiplier;
      break;
    }
  }

  // 3. Queue delay calculation: +1.5 hours per active order in queue
  const queueDelay = currentQueueLength * 1.5;

  // 4. Calculate total hours from now
  const totalHours = (baseDuration * multiplier) + queueDelay;
  
  const estimatedDate = new Date();
  estimatedDate.setMilliseconds(estimatedDate.getMilliseconds() + totalHours * 60 * 60 * 1000);

  return estimatedDate.toISOString();
};
