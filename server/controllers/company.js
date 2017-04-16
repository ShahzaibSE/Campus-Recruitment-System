// /**
//  * Created by shahzaib on 3/15/17.
//  */
//
// // 'use strict'

var exec = require('exec');
var dbModels = require('./dbInjector').dataModels;

var Con = dbModels.company;
var con = new Con();

exports.add = function(req,res){
    console.log(req);
    console.log();

    // var con = new Con();

    var newCompany = {
        name:con.name,
        email:con.email,
        website:con.website,
        createdAt:new Date()
    }

    Con.find({name:con.name.toLowerCase()}).exec(function(err,data){

        if(err){
            console.log({
                status:false,
                resCode:400,
                isError:true,
                message:"Internal error while adding company",
                error:err
            });

            res.send({
                status:false,
                resCode:400,
                isError:true,
                message:"Internal error while adding company"
                // error:err
            });
        }else if(data){

            console.log({
                status:true,
                resCode:200,
                isError:false,
                message:"Data already exist",
                data:data
            });

            res.send({
                status:true,
                resCode:200,
                isError:false,
                message:"Data already exist",
                data:data
            })

        }else if(!data){

            var newDocument = new Con(newCompany);  //Registering new company

            newDocument.save(function(err,data){
                console.log({
                    status:true,
                    resCode:200,
                    isError:false,
                    message:"Data inserted successfully",
                    data:data
                })

                res.send({
                    status:true,
                    resCode:200,
                    isError:false,
                    message:"Data inserted successfully",
                    data:data
                })
            })
        }

    })

}

exports.delete = function(req,res){

    Con.remove({$or:[{_id:con.id},{name:con.name}]}).exec(function(err,data){

        if(err){
            console.log({
                status:false,
                resCode:400,
                isError:true,
                message:"Internal error while deleting company data",
                error:err
            });

            res.send({
                status:false,
                resCode:400,
                isError:true,
                message:"Internal error while deleting company data",
                // error:err
            });
        }else if(data){
            console.log({
                status:true,
                resCode:200,
                isError:false,
                message:"Data deleted successfully",
                data:data
            });

            res.send({
                status:true,
                resCode:200,
                isError:false,
                message:"Data deleted successfully",
                // data:data
            });
        }

    })

}

exports.update = function(req,res){

    var updateObj = {
        name:con.name,
        email:con.email,
        website:con.website,
        updatedAt:new Date()
    }

    Con.update({$or:[{_id:con.id},{name:con.name}]},{$set:updateObj}).exec(function(err,data){

        if(err){
            console.log({
                status:false,
                resCode:400,
                isError:true,
                message:"Internal error while updating data",
                error:err
            });

            res.send({
                status:false,
                resCode:400,
                isError:true,
                message:"Internal error while updating data",
                // error:err
            });
        }else if(data){
            console.log({
                status:true,
                resCode:200,
                isError:false,
                message:"Data updated successfully",
                data:data
            });

            res.send({
                status:true,
                resCode:200,
                isError:false,
                message:"Data updated successfully",
                // data:data
            });
        }

    })

}

exports.selectall = function(req,res){

    Con.find({},{__v:0}).exec(function(err,data){

        if(err){
            console.log({
                status:false,
                resCode:400,
                isError:true,
                message:"Internal error while fetching data",
                error:err
            })

            res.send({
                status:false,
                resCode:400,
                isError:true,
                message:"Internal error while fetching data"
                // error:err
            })
        }else if(data){

            console.log({
                status:true,
                resCode:200,
                isError:false,
                message:"Data found successfully",
                data:data
            });

            res.send({
                status:true,
                resCode:200,
                isError:false,
                message:"Data found successfully",
                data:data
            });

        }

    })

}

// // class Rectangle{
// //
// // }