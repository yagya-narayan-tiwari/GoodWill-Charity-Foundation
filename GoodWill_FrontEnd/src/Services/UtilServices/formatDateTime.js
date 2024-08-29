export function formatDateTime(dateTimeString) {
    // Parse the input date-time string
    const date = new Date(dateTimeString);

    // Extract the date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed in JavaScript
    const year = date.getFullYear();

    // Extract the time components
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'

    // Format minutes and seconds to ensure two digits
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    // Construct the date string (e.g., "08/15/2024")
    const formattedDate = `${month}/${day}/${year}`;

    // Construct the time string (e.g., "12:22 AM")
    const formattedTime = `${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

    return {
        date: formattedDate,
        time: formattedTime
    };
}

// Example usage:
// const dateTimeString = "2024-08-15T00:22:58.643+05:30";
// const formattedDateTime = formatDateTime(dateTimeString);

// console.log("Date:", formattedDateTime.date); // "Date: 8/15/2024"
// console.log("Time:", formattedDateTime.time); // "Time: 12:22:58 AM"
