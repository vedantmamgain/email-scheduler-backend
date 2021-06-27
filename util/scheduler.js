//run postHistory
const cron = require("node-cron");

module.exports = async function (options) {
    cron.schedule("* * * * *", async function () {
        console.log("Running this even after API Request the cron job");
        await main(arr);
    });
};
