const { scheduleDeliveries } = require("./deliverySchedule");

const cronFunctions = () => {
  console.log("cron started...");
  scheduleDeliveries();
};

module.exports = { cronFunctions };
