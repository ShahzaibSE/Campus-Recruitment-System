'use strict'

const mongoose = require('mongoose');
const studentModel = require('./dbInjector').dataModels.student;
const roleModel = require('./dbInjector').dataModels.user;

exports.selectall = async function (req, res) { // Search user or get all users.
    var body = req.body;
    var query = req.query;
    // Query.
    try {
        if (query.roleId) {
            let role = await studentModel.findOne({ _id: query.roleId });
            res.send({
                status : true,
                resCode : 200,
                isError : false,
                message : "Data found successfully",
                data: role
            });
        } else if (!query.userId){
            var roleList = await studentModel.find({});
            res.send({
                status: true,
                resCode : 200,
                isError: false,
                message : "Data found successfully",
                data : roleList
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
        let user = await studentModel.findOne({ name: params.name });
        // If user already exists.
        if (user) {
            res.send({
                status: true,
                resCode: 403,
                isError : false,
                message : "Role already exists"
            });
        } else {
            let newRole = new studentModel({ name: params.name });
            await newRole.save();
            res.send({
                status : true,
                resCode : 200,
                isError : false,
                message : "Role created successfully" 
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
    let roleId = req.params.roleid; 
    try {
     await roleModel.findByIdAndUpdate(roleId, {$set : params});
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
        let user = roleModel.findOne({ name: params.name });
        await roleModel.remove({_id: user._id});
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