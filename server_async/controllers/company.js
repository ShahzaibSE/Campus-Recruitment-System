'use strict'

const mongoose = require('mongoose');
const companyModel = require('./dbInjector').dataModels.company;
const userModel = require('./dbInjector').dataModels.user;

exports.selectall = async function (req, res) { // Search user or get all users.
    var body = req.body;
    var query = req.query;
    // Query.
    try {
        if (query.studentId) {
            let user = await companyModel.findOne({ _id: query.studentId });
            res.send({
                status : true,
                resCode : 200,
                isError : false,
                message : "Data found successfully"
            });
        } else if (!query.userId){
            var userList = await companyModel.find({});
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
        let user = await companyModel.findOne({ name: params.name });
        // If user already exists.
        if (user) {
            res.send({
                status: true,
                resCode: 403,
                isError : false,
                message : "User already exists"
            });
        } else {
            let newUser = new companyModel({ name: params.name, email: params.email, password: params.password });
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
    let studentId = req.params.studentid; 
    try {
     await companyModel.findByIdAndUpdate(studentId, {$set : params});
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
        console.log("Student record updated");
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
        let user = companyModel.findOne({ name: params.name });
        await companyModel.remove({_id: user._id});
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