const schedule = require("node-schedule");
const postHistory = require("../controller/emailController");
//Every 20 or 30 seconds
module.exports = async function (data) {
    let seconds = data.body.seconds;
    let weekly = data.body.weekly;
    let monthly = data.body.monthly;

    if (seconds) {
        if (data.body.time.seconds == 2) {
            schedule.scheduleJob("*/2 * * * * *", async function () {
                await postHistory.postHistory(data);
                console.log("sending a mail every 2 seconds");
            });
        } else {
            schedule.scheduleJob("*/3 * * * * *", async function () {
                await postHistory.postHistory(data);
                console.log("sending a mail every 3 seconds");
            });
        }
    }
    if (weekly) {
        //Weekly
        schedule.scheduleJob(
            {
                hour: data.body.time.hours,
                minute: data.body.time.minute,
                dayOfWeek: data.body.time.day,
            },
            async function () {
                await postHistory.postHistory(data);
                console.log(
                    "sending a mail weekly every" +
                        data.body.time.day +
                        " " +
                        data.body.time.hour +
                        " : " +
                        data.body.time.minute
                );
            }
        );
    }
    if (monthly) {
        //monthly
        var rule = new schedule.RecurrenceRule();
        rule.month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        rule.date = data.body.date;
        rule.hour = data.body.time.hour;
        rule.minute = data.body.time.minute;

        schedule.scheduleJob(rule, async function () {
            await postHistory.postHistory(data);
            console.log(
                "sending a mail monthly every" +
                    data.body.time.day +
                    " " +
                    data.body.time.hour +
                    " : " +
                    data.body.time.minute
            );
        });
    }
    if (yearly) {
        //yearly
        let cronString =
            data.body.time.minute +
            " " +
            data.body.time.hour +
            " " +
            data.body.time.date +
            " " +
            data.body.time.month +
            " " +
            "*";
        schedule.scheduleJob(cronString, async function () {
            await postHistory.postHistory(data);
            console.log("sending a mail yearly at" + cronString);
        });
    }
};
