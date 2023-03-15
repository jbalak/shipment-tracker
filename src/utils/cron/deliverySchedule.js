var CronJob = require("cron").CronJob;

const { userDb, userOrderDb, deliveryOrderDb } = require("../../dataAccess");

const { deliverieServices } = require("../../services");
const scheduleDeliveries = async () => {
  try {
    //every 30 min
    new CronJob("0 */30 * * * *", async () => {
      await deliverieServices.createADelivery();
    }).start();
  } catch (error) {
    console.log("cron err- ", error);
  }
};

module.exports = { scheduleDeliveries };
