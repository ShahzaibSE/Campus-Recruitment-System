'use strict'

var app = require('./app');
// Server config.
var port = process.env.PORT| 3000;
var server = app.listen(port, ()=> {
    console.log(`      --        `);
    console.log(`^ ------------- ^`);
    console.log(`Listening on port : ${server.address().port}`);
});