'use strict'

const mongoose = require('mongoose');
const userModel = require('./dbInjector').dataModels.user;

exports.selectall =  async function (req,res) { 
    req.headers.type = "test API";
    var result = await [1, 2, 3, 4, 5].map( (element) => {
        return element * 2;
    });
    res.send({
        status : true,
        resCode : 200,
        isError: false,
        message : "Data succesfully found",
        data : result, 
        headers : req.headers.type
    });
}

exports.selectAll = async function (req, res) { // Search user or get all users.
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
            console.log('List of all users s');
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

exports.user_CRUD = {
    selectall : async (req,res) => {
        req.headers.type = "test API";
        var result = await [1, 2, 3, 4, 5].map( (element) => {
            return element * 2;
        });
            res.send({
                status : true,
                resCode : 200,
                isError: false,
                message : "Data succesfully found",
                data : result
            });
    }
}