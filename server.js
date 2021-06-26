const mongoose = require("mongoose");
const app = require("./index");
// mongodb+srv://hills2home:<password>@cluster0.ikfbh.mongodb.net/<dbname>?retryWrites=true&w=majority
// const DB =
//     "mongodb+srv://hills2home:hills2home@cluster0.ikfbh.mongodb.net/test?retryWrites=true&w=majority";
// mongoose
//     .connect(DB, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//     })
//     .then(() => console.log("Datbase Connected"));

const port = process.env.PORT || 7000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
