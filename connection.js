const { default: mongoose } = require('mongoose');

const url = "mongodb+srv://sanyam:0721@cluster0.cuvuh8j.mongodb.net/userBackend?retryWrites=true&w=majority";

const connection = () => {
    mongoose.connect(url).then(() => {
        console.log("connected to database");
    }).catch((error) => {
        console.log("error connecting to database", error);
    })
}

module.exports = connection;