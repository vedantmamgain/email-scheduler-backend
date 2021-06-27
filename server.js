const mongoose = require("mongoose");
const app = require("./index");

const DB =
    "mongodb+srv://admin:mamgainvedant23@cluster0.4a5eb.mongodb.net/production?retryWrites=true&w=majority";
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Datbase Connected"));

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
