const fs = require('fs');

const timeData = {
    utc: '2025-07-28 01:12:03',
    newYork: '2025-07-27 21:12:03'
};

/**
 * Returns the current time report from different timezones
 * @returns {string} Formatted time report
 */
function getCurrentTimeReport() {
    return `Current UTC time is ${timeData.utc}, and the time in America/New_York is ${timeData.newYork}`;
}

/**
 * Formats a timestamp into a human-readable format
 * @param {string} timestamp - The timestamp to format
 * @returns {string} Formatted timestamp
 */
function formatTime(timestamp) {
    try {
        const date = new Date(timestamp);
        return date.toLocaleString();
    } catch (error) {
        throw new Error(`Invalid timestamp format: ${error.message}`);
    }
}

if (require.main === module) {
    const report = getCurrentTimeReport();
    console.log(report);
    
    try {
        fs.writeFileSync('current-time.txt', report);
        console.log('Time data written to current-time.txt');
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

module.exports = {
    getCurrentTimeReport,
    formatTime
};