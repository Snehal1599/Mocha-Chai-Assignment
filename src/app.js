const express = require('express');
var app = express();
const router = require('./user-services');
app.use(router);


app.listen(3000, () => {
    console.log('Express server is running at http://localhost:3000');
});






