// Create a Date object from the ISO string
const date = new Date();

// Define a function to format the date and time
const formatDate = (date) => {
  // Convert date to Bangladesh Time (UTC+6)
  const offset = 6 * 60; // BST is UTC+6, so 6 hours * 60 minutes = 360 minutes
  const localDate = new Date(date.getTime() + offset * 60 * 1000);

  // Extract components
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(localDate.getDate()).padStart(2, "0");

  // Convert hours and minutes to 12-hour format with AM/PM
  let hours = localDate.getHours();
  const minutes = String(localDate.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Hour '0' should be '12'
  const formattedHours = String(hours).padStart(2, "0");

  // Return the formatted date and time string with BST
  return `${year}-${month}-${day} ${formattedHours}:${minutes}${ampm} BST`;
};

// Get the formatted date and time
// const formattedDate = formatDate(date);
