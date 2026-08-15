/**
 * Formats a number as an Indian Rupee (INR - ₹) currency string.
 * Uses en-IN locale with Indian numbering format (e.g. ₹3,076.48).
 * @param {number|string} value
 * @param {number} decimals
 * @returns {string}
 */
export const formatCurrency = (value, decimals = 2) => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return '—';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(value));
};

/**
 * Formats a number as a percentage string with sign.
 * @param {number|string} value
 * @param {boolean} includeSign
 * @param {number} decimals
 * @returns {string}
 */
export const formatPercent = (value, includeSign = true, decimals = 2) => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return '—';
  }
  const num = Number(value);
  const formatted = Math.abs(num).toFixed(decimals);
  if (!includeSign) {
    return `${formatted}%`;
  }
  if (num > 0) {
    return `+${formatted}%`;
  }
  if (num < 0) {
    return `-${formatted}%`;
  }
  return `0.00%`;
};

/**
 * Formats large numbers with Indian/Standard abbreviations (K, L, Cr or M, B).
 * @param {number|string} value
 * @returns {string}
 */
export const formatCompactNumber = (value) => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return '—';
  }
  const num = Number(value);
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(2)} L`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)} K`;
  }
  return num.toString();
};

/**
 * Formats confidence score as a percentage 0 - 100%.
 * @param {number|string} value
 * @returns {number}
 */
export const normalizeConfidence = (value) => {
  if (value === null || value === undefined) return 0;
  const num = Number(value);
  if (isNaN(num)) return 0;
  // If score is 0.85, normalize to 85. If already 85, keep 85.
  return num <= 1 && num > 0 ? Math.round(num * 100) : Math.min(100, Math.max(0, Math.round(num)));
};

/**
 * Formats ISO date or timestamp into readable date string.
 * @param {string|Date|number} dateValue
 * @param {boolean} includeTime
 * @returns {string}
 */
export const formatDate = (dateValue, includeTime = false) => {
  if (!dateValue) return '—';
  try {
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return String(dateValue);
    
    if (includeTime) {
      return d.toLocaleString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return d.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return String(dateValue);
  }
};
