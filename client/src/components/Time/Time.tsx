//Time convert
export const formatDate = (date: any) => {
  // Extract components
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, "0");

  // Convert hours and minutes to 12-hour format with AM/PM
  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Hour '0' should be '12'
  const formattedHours = String(hours).padStart(2, "0");

  // Return the formatted date and time string
  return `${year}-${month}-${day} ${formattedHours}:${minutes}${ampm} UTC+0`;
};
