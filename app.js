const express = require('express');
const app = express();
const connection = require('./connection');
const taskRoute = require('./routes/taskRoute');
const userRoutes = require('./routes/userRoute');

app.use(express.json());
app.use(express.static('public'))

app.use('/api', taskRoute);
app.use('/api', userRoutes);

connection();

app.listen(5000, (error) => {
    if (error) {
        console.log("error starting server");
    }
    else {
        console.log("server started at port 5000");
    }
});
