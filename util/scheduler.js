const schedule = require("node-schedule");
const postHistory = require("../controller/emailController");
//Every 20 or 30 seconds
module.exports = async function (data) {
    let seconds = data.body.recurring;
    let weekly = data.body.week;
    let monthly = data.body.month;
    let yearly = data.body.year;

    if (seconds.schedule) {
        if (seconds.dateAndTime == 20) {
            schedule.scheduleJob("*/20 * * * * *", async function () {
                await postHistory.postHistory(data);
                console.log("sending a mail every 20 seconds");
            });
        } else {
            schedule.scheduleJob("*/30 * * * * *", async function () {
                await postHistory.postHistory(data);
                console.log("sending a mail every 30 seconds");
            });
        }
    }
    if (weekly.schedule) {
        //Weekly
        let data = new Date(weekly.dateAndTime);
        let date = data.getDate();
        let minutes = data.getMinutes();
        let hour = data.getHours();

        schedule.scheduleJob(
            {
                hour: hour,
                minute: minutes,
                dayOfWeek: date,
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
    if (monthly.schedule) {
        let data = new Date(weekly.dateAndTime);
        let date = data.getDate();
        let minutes = data.getMinutes();
        let hour = data.getHours();

        //monthly
        var rule = new schedule.RecurrenceRule();
        rule.month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        rule.date = date;
        rule.hour = hour;
        rule.minute = minutes;

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
    if (yearly.schedule) {
        let data = new Date(weekly.dateAndTime);
        let date = data.getDate();
        let minutes = data.getMinutes();
        let hour = data.getHours();
        let month = data.getMonth() + 1;
        //yearly
        let cronString =
            minutes + " " + hour + " " + date + " " + month + " " + "*";
        schedule.scheduleJob(cronString, async function () {
            await postHistory.postHistory(data);
            console.log("sending a mail yearly at" + cronString);
        });
    }
};
