const { NtpTimeSync } = require('ntp-time-sync');

// Create a singleton instance of the NTP sync object
const timeSync = NtpTimeSync.getInstance({ timeout: 5000 });

const getCurrentNtpTime = async () => {
  try {
    // Request the current time
    const result = await timeSync.getTime();

    // Check if the result is valid
    if (!result || !result.now) {
      console.log('Failed to retrieve NTP time');
      return;
    }

    // Convert the NTP time to a Date object
    const ntpTime = new Date(result.now);
    ntpTime.setHours(ntpTime.getHours())
    ntpTime.setMinutes(ntpTime.getMinutes())
    return ntpTime;
  } catch (error) {
    console.error("Failed to fetch NTP time:", error);
  }
};

module.exports = { time: getCurrentNtpTime };
