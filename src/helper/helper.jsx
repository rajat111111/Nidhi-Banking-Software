export const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

// Converts a string to a number safely
export const changeStringToNumber = (str) => {
  const num = Number(str);
  return isNaN(num) ? 0 : num; // returns 0 if conversion fails
};


export const lowerCaseAndRemoveTrailingS = (str) => {
  if (!str) return "";
  const lower = str.toLowerCase();
  return lower.endsWith("s") ? lower.slice(0, -1) : lower;
};
