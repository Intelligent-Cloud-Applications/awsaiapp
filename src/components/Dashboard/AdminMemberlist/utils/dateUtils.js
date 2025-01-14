/**
 * Formats an epoch timestamp or date string to a readable date format (YYYY-MM-DD)
 * @param {number|string} epochDate - The epoch timestamp or date string to format
 * @returns {string} The formatted date string
 */
export const formatEpochToReadableDate = (epochDate) => {
  const date = isNaN(epochDate) ? new Date(parseFloat(epochDate)) : new Date(epochDate);
  
  if (!isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
}; 