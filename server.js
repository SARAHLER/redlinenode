const express = require('express');
const app =express();
const PORT = 80;
const redLine = require('./routers/redLine.js');



app.use('/redLine' , redLine);


app.listen( PORT , ()=>{console.log(`server running in port ${PORT}`)});
