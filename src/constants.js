export const primaryColor = "#6a6db0";
export const primaryColorLight = "#c8b9ec";
export const templateTypes = {
  singleForm: "Single Page Form",
  multiStepForm: "Step Form",
};

const getISTTime = (time) => {
  let utcDate = new Date(time);

  let utcYear = utcDate.getUTCFullYear();
  let utcMonth = utcDate.getUTCMonth();
  let utcDay = utcDate.getUTCDate();
  let utcHours = utcDate.getUTCHours();
  let utcMinutes = utcDate.getUTCMinutes();
  let utcSeconds = utcDate.getUTCSeconds();
  let utcMilliseconds = utcDate.getUTCMilliseconds();

  // Create a new Date object for IST by adding 5 hours and 30 minutes
  let istDate = new Date(
    Date.UTC(
      utcYear,
      utcMonth,
      utcDay,
      utcHours + 5,
      utcMinutes + 30,
      utcSeconds,
      utcMilliseconds
    )
  );

  // Format the IST date as needed
  let formattedDate = istDate.toISOString().slice(0, 19).replace("T", " ");

  return formattedDate;
};

export function timeAgo(dateString) {
  const inputDate = new Date(getISTTime(dateString));
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - inputDate;

  // Helper function to calculate and return the appropriate time ago string
  const getTimeAgoString = (value, unit) => {
    return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
  };

  // Convert time difference to various units
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30); // Approximate
  const years = Math.floor(days / 365); // Approximate

  // Determine the appropriate time ago string
  if (years > 0) {
    return getTimeAgoString(years, "year");
  } else if (months > 0) {
    return getTimeAgoString(months, "month");
  } else if (weeks > 0) {
    return getTimeAgoString(weeks, "week");
  } else if (days > 0) {
    return getTimeAgoString(days, "day");
  } else if (hours > 0) {
    return getTimeAgoString(hours, "hour");
  } else if (minutes > 0) {
    return getTimeAgoString(minutes, "minute");
  } else {
    return getTimeAgoString(seconds, "second");
  }
}
