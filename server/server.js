/**
 * Created by shahzaib on 3/15/17.
 */

var express = require('express');

//Requiring application object
var app = require('./app');

var port = process.env.PORT|3000;
var server = app.listen(port,function(){
    console.log('|-----------------------------------------------------|');
    console.log("|-----------------Listining on:"+" "+server.address().port+"------------------|");
    console.log('|-----------------------------------------------------|');
})
