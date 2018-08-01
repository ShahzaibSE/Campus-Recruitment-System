'use strict'

const mongoose = require('mongoose');
const userModel = require('./dbInjector').dataModels.user;
const jwt = require('jsonwebtoken');

// Test Code.
// exports.selectall =  async function (req,res) { 
//     req.headers.type = "test API";
//     var result = await [1, 2, 3, 4, 5].map( (element) => {
//         return element * 2;
//     });
//     res.send({
//         status : true,
//         resCode : 200,
//         isError: false,
//         message : "Data succesfully found",
//         data : result, 
//         headers : req.headers.type
//     });
// }

exports.selectall = async function (req, res) { // Search user or get all users.
    var body = req.body;
    var query = req.query;
    // Query.
    try {
        if (query.userId) {
            let user = await userModel.findOne({ _id: query.userId });
            res.send({
                status : true,
                resCode : 200,
                isError : false,
                message : "Data found successfully"
            });
        } else if (!query.userId){
            var userList = await userModel.find({});
            res.send({
                status: true,
                resCode : 200,
                isError: false,
                message : "Data found successfully",
                data : userList
            });
        }
    }
    catch(err) {
        res.send({
            status: false,
            resCode : 500,
            isError : true,
            message : "Internal server error"
        });
    }
    finally {
        res.send({
            status : false,
            resCode : 503,
            isError: false,
            message : "Service unavailable"
        });
    }
}

exports.add = async function (req,res) {
    var params = req.body;
    try {
        let user = await userModel.findOne({ name: params.name });
        // If user already exists.
        if (user) {
            res.send({
                status: true,
                resCode: 403,
                isError : false,
                message : "User already exists"
            });
        } else {
            let newUser = new userModel({ name: params.name, email: params.email, password: params.password });
            await newUser.save();
            res.send({
                status : true,
                resCode : 200,
                isError : false,
                message : "User created successfully" 
            });
        }
    }
    catch(err) {
        res.send({
            status: false,
            resCode : 500,
            isError : true,
            message : "Internal server error"
        });
    }
    finally {
        res.send({
            status : false,
            resCode : 503,
            isError: false,
            message : "Service unavailable"
        });
    }
}

exports.update = async function(req,res) {
    let params = req.body;
    let userId = req.params.userid; 
    try {
     await userModel.findByIdAndUpdate(userId, {$set : params});
     res.send({
         status: true,
         resCode : 200,
         isError : false,
         message : "Data updated successfully"
     });
    }
    catch(err) {
        res.send({
            status: false,
            resCode : 500,
            isError : true,
            message : "Internal server error"
        });
    }
    finally {
        res.send({
            status : false,
            resCode : 503,
            isError: false,
            message : "Service unavailable"
        });
    }
}

exports.delete = async function(req,res) {
    let params = req.body;
    try {
        let user = userModel.findOne({ name: params.name });
        await userModel.remove({_id: user._id});
        res.send({
            status : true,
            resCode: 200,
            isError : false,
            message : "Data removed successfully"
        });
    }
    catch(err) {
        res.send({
            status: false,
            resCode : 500,
            isError : true,
            message : "Internal server error"
        });
    }
    finally {
        res.send({
            status : false,
            resCode : 503,
            isError: false,
            message : "Service unavailable"
        });
    }
}

exports.signin = async function(req, res) {
    var params = req.body;
    const jwttoken = jwt.sign(params, 'batman');
    try {
        let user = await userModel.findOne({ email: body.email, password: body.password });
        // If user exists then logIn.
        if (user) {
            res.send({
                status : true,
                resCode : 200,
                isError : false,
                message : "User logged In successfully.",
                at : jwttoken
            });
        } else if (!user) {
            let newUser = new userModel({ name: params.name, email: params.email, password: params.password });
            await newUser.save();
            res.send({
                status : true,
                resCode : 200,
                isError : false,
                message : "User created successfully" 
            });
        }

    }
    catch(err) {
        console.log(err);
        throw err;
    }
    finally{
        res.send({
            status : false,
            resCode : 503,
            isError: false,
            message : "Service unavailable"
        });
    }
}