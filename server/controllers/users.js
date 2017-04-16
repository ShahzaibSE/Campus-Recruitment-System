'use strict';

var dbModels = require('./dbInjector').dataModels;
var User = dbModels.users;
var helper = require('../controllers/helper.js');
var crypto = require('crypto');
var md5 = require('md5');
var async = require('async');
var Roles= dbModels.roles;
var Categories= dbModels.categories_model;
var Languages= dbModels.languages_model;
var news = dbModels.news;

function hashPassword(password) {
    return md5(password);
}

exports.create = function(req, res){
    User.findOne({email:req.body.email}, function(err, usr){
        if(err){
            res.send({
                resCode:400,
                status:false,
                isError:true,
                message:'error connecting with database'
            });
        }
        if(!usr || usr == null){
            var user = {};
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = hashPassword(req.body.password);
            user.createdAt = new Date();
            user.isActive = true;

            if(req.body.role == 'admin') {
                Roles.findOne({name: 'admin'}, function (err, role) {
                    console.log(role._id);
                    user.roleId = role._id;
                    var userObj = new User(user);
                    userObj.save(function(err,us){
                        if(err){
                            return  res.send(err);
                        }
                        else{
                            console.log("user saved")
                            res.send({
                                resCode:200,
                                status:true,
                                isError:false,
                                message:'user created successfully'
                            })
                        }
                    });
                });
            }
            else if(req.body.role == 'user'){
                Roles.findOne({name:'user'}, function(err,role){
                    console.log(role._id);
                    user.roleId = role._id;
                    var userObj = new User(user);
                    userObj.save(function(err,us){
                        if(err){
                            return  res.send(err);
                        }
                        else{
                            console.log("user saved")
                            res.send({
                                resCode:200,
                                status:true,
                                isError:false,
                                message:'user created successfully'
                            })
                        }
                    });
                });
            }

            // user.roleId = req.body.roleId;

        }
        else{
            res.send({
                resCode:400,
                status:false,
                isError:true,
                message:'user already created with this email'
            })
        }
    });
};


/////////////////////////////signin////////////////////////////////////////////////////////////////////

exports.signin=function(req,res) {
    var login = req.body;
    var exists =false;
    User.findOne({email: login.email}, function (err, user) {
        if (err) {
            console.log(err);
            res.send({
                resCode:400,
                status:false,
                isError:true,
                message:'error connecting with database'
            })
        }
        else if (!user || user == null) {
            console.log("User is not registered")
            res.send({
                resCode:400,
                isError:true,
                status:false,
                message:'No user created with this email Id'
            });
        }
        else{
            if(hashPassword(login.password) == user.password) {
                console.log("user is valid");
                var sessiontoken = generateToken();
                var devices=[];
                if(req.body.deviceId  && req.body.tokenId){
                    devices ={ "tokenId": req.body.tokenId, "platform": req.body.platform, "deviceId":req.body.deviceId}
                    var userDevices = user.devices;
                    for(var i=0; i < userDevices.length; i++){
                        if(userDevices[i].deviceId == devices.deviceId){
                            if(userDevices[i].tokenId == devices.tokenId){
                                exists =true;
                            }
                        }
                    }

                    if(!exists){
                        userDevices.push(devices);
                        console.log("userDevices")
                        console.log(userDevices)
                        console.log("not found  deviceId");
                        User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken,devices:userDevices}}, function (er, userDate) {
                            console.log(userDate);
                            if (er) {
                                res.send({resCode: 400, message: 'users unable to login', isError: true});

                                //Check Admin Role.
                            }/*else if(userDate){
                             for(var i=0;i<userDate.length;i++){
                             Roles.findOne({name:userDate[i].name},function(err,admin){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Admin not found"});
                             }else if(admin.name == "admin"){
                             Languages.distinct('name',function(err,language){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Data not found"});
                             }else if(language){
                             console.log({status:true,resCode:200,isError:false,message:"Data found",data:language});
                             console.log();

                             Categories.distinct('name',function(err,category){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Data not found"});
                             }else if(category){
                             console.log({status:true,resCode:200,isError:false,message:"Data found",data:category});
                             console.log();

                             res.render('news',{languages:language,category:category});
                             }
                             })
                             }
                             })
                             }
                             })
                             }
                             }*/

                            else {
                                res.send({
                                    resCode: 200,
                                    isError: false,
                                    userId: user._id,
                                    sessionId: sessiontoken,
                                    name: user.name,
                                    email: user.email,
                                    message: 'user logged In'
                                })
                            }
                        });
                    }
                    else{
                        User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken}}, function (er, us) {
                            console.log("user update with sessionID");
                            if (er) {
                                res.send({resCode: 400, message: 'users unable to login', isError: true});
                            }

                            //Check Admin
                            /*else if(us){
                             for(var i=0;i<userDate.length;i++){
                             Roles.findOne({name:userDate[i].name},function(err,admin){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Admin not found"});
                             }else if(admin.name == "admin"){
                             Languages.distinct('name',function(err,language){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Data not found"});
                             }else if(language){
                             console.log({status:true,resCode:200,isError:false,message:"Data found",data:language});
                             console.log();

                             Categories.distinct('name',function(err,category){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Data not found"});
                             }else if(category){
                             console.log({status:true,resCode:200,isError:false,message:"Data found",data:category});
                             console.log();

                             res.render('news',{languages:language,category:category});
                             }
                             })
                             }
                             })
                             }
                             })
                             }
                             }*/

                            else {
                                res.send({
                                    resCode: 200,
                                    isError: false,
                                    userId: user._id,
                                    sessionId: sessiontoken,
                                    name: user.name,
                                    email: user.email,
                                    message: 'user logged In'
                                })
                            }
                        });
                    }

                }
                else{
                    User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken}}, function (er, us) {
                        console.log(user);
                        if (er) {
                            res.send({resCode: 400, message: 'users unable to login', isError: true});
                        } else {
                            res.send({
                                resCode: 200,
                                isError: false,
                                userId: user._id,
                                sessionId: sessiontoken,
                                name: user.name,
                                email: user.email,
                                message: 'user logged In'
                            })
                        }
                    });

                }
            }
            else {
                console.log("password does not match")
                res.send({
                    resCode: 400,
                    isError: true,
                    status:false,
                    message: 'password does not match'
                });
            }
        }
    });
};

exports.$signin=function(req,res) {

    var login = req.body;
    var exists =false;
    User.findOne({email: login.email}, function (err, user) {
        if (err) {
            console.log(err);
            res.send({
                resCode:400,
                status:false,
                isError:true,
                message:'error connecting with database'
            })
        }
        else if (!user || user == null) {
            console.log("User is not registered")
            res.send({
                resCode:400,
                isError:true,
                status:false,
                message:'No user created with this email Id'
            });
        }
        else{
            if(hashPassword(login.password) == user.password) {
                console.log("user is valid");
                var sessiontoken = generateToken();
                var devices=[];
                if(req.body.deviceId  && req.body.tokenId){
                    devices ={ "tokenId": req.body.tokenId, "platform": req.body.platform, "deviceId":req.body.deviceId}
                    var userDevices = user.devices;
                    for(var i=0; i < userDevices.length; i++){
                        if(userDevices[i].deviceId == devices.deviceId){
                            if(userDevices[i].tokenId == devices.tokenId){
                                exists =true;
                            }
                        }
                    }

                    if(!exists){
                        userDevices.push(devices);
                        console.log("userDevices")
                        console.log(userDevices)
                        console.log("not found  deviceId");
                        User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken,devices:userDevices}}, function (er, userDate) {
                            console.log(userDate);
                            if (er) {
                                res.send({resCode: 400, message: 'users unable to login', isError: true});
                            } else {
                                res.send({
                                    resCode: 200,
                                    isError: false,
                                    userId: user._id,
                                    sessionId: sessiontoken,
                                    name: user.name,
                                    email: user.email,
                                    message: 'user logged In'
                                })
                            }
                        });
                    }
                    else{
                        User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken}}, function (er, us) {
                            console.log("user update with sessionID");
                            if (er) {
                                res.send({resCode: 400, message: 'users unable to login', isError: true});
                            } else {
                                res.send({
                                    resCode: 200,
                                    isError: false,
                                    userId: user._id,
                                    sessionId: sessiontoken,
                                    name: user.name,
                                    email: user.email,
                                    message: 'user logged In'
                                })
                            }
                        });
                    }

                }
                else{
                    User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken}}, function (er, us) {
                        console.log(user);
                        if (er) {
                            res.send({resCode: 400, message: 'users unable to login', isError: true});
                        } else {
                            res.send({
                                resCode: 200,
                                isError: false,
                                userId: user._id,
                                sessionId: sessiontoken,
                                name: user.name,
                                email: user.email,
                                message: 'user logged In'
                            })
                        }
                    });

                }
            }
            else {
                console.log("password does not match")
                res.send({
                    resCode: 400,
                    isError: true,
                    status:false,
                    message: 'password does not match'
                });
            }
        }
    });
};

exports.$$signin=function(req,res) {
    var login = req.body;
    var exists =false;
    User.findOne({email: login.email}, function (err, user) {
        if (err) {
            console.log(err);
            res.send({
                resCode:400,
                status:false,
                isError:true,
                message:'error connecting with database'
            })
        }
        else if (!user || user == null) {
            console.log("User is not registered")
            res.send({
                resCode:400,
                isError:true,
                status:false,
                message:'No user created with this email Id'
            });
        }
        else{
            if(hashPassword(login.password) == user.password) {
                console.log("user is valid");
                var sessiontoken = generateToken();
                var devices=[];
                if(req.body.deviceId  && req.body.tokenId){
                    devices ={ "tokenId": req.body.tokenId, "platform": req.body.platform, "deviceId":req.body.deviceId}
                    // check TokenId in whole databse
                    console.log("Users devices");
                    console.log(devices);
                    User.findOne({'devices.tokenId': devices.tokenId}, function (err, userAll) {
                        if(userAll){
                            console.log("All Users");
                            console.log(userAll);
                            var usersDevices = userAll.devices;  // devices for all users
                            for(var i=0; i < usersDevices.length; i++){
                                if(usersDevices[i].deviceId == devices.deviceId){
                                    if(usersDevices[i].tokenId == devices.tokenId){
                                        exists = true;
                                        console.log("User exists with same TokenId")
                                        usersDevices.splice(i,1);
                                        console.log("Update User Information");
                                        console.log(usersDevices);
                                        User.findByIdAndUpdate(userAll._id, {$set: {devices:usersDevices}}, function (er, userDate) {
                                            console.log("same TokenId is removed ");
                                            var devicesUser = user.devices;
                                            console.log("Devices User");
                                            console.log(devicesUser);
                                            devicesUser.push(devices);
                                            console.log("userDevices")
                                            console.log(devicesUser)
                                            User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken,devices:devicesUser}}, function (er, userDate) {
                                                console.log(userDate);
                                                if (er) {
                                                    res.send({resCode: 400, message: 'users unable to login', isError: true});
                                                } else {
                                                    res.send({
                                                        resCode: 200,
                                                        isError: false,
                                                        userId: user._id,
                                                        sessionId: sessiontoken,
                                                        name: user.name,
                                                        email: user.email,
                                                        message: 'user logged In'
                                                    })

                                                }
                                            });
                                        });
                                        break;
                                    }
                                }
                            }
                        }
                        else{
                            var devicesUser = user.devices;
                            devicesUser.push(devices);
                            console.log("userDevices")
                            console.log(devicesUser)
                            User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken,devices:devicesUser}}, function (er, userDate) {
                                console.log(userDate);
                                if (er) {
                                    res.send({resCode: 400, message: 'users unable to login', isError: true});
                                } else {
                                    res.send({
                                        resCode: 200,
                                        isError: false,
                                        userId: user._id,
                                        sessionId: sessiontoken,
                                        name: user.name,
                                        email: user.email,
                                        message: 'user logged In'
                                    })

                                }
                            });
                        }
                    });
                }
                else{
                    User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken}}, function (er, us) {
                        console.log(user);
                        if (er) {
                            res.send({resCode: 400, message: 'users unable to login', isError: true});
                        } else {
                            res.send({
                                resCode: 200,
                                isError: false,
                                userId: user._id,
                                sessionId: sessiontoken,
                                name: user.name,
                                email: user.email,
                                message: 'user logged In'
                            })
                        }
                    });

                }
            }
            else {
                console.log("password does not match")
                res.send({
                    resCode: 400,
                    isError: true,
                    status:false,
                    message: 'password does not match'
                });
            }
        }
    });
};

exports.$$$signin = function(req,res){
    var login = req.body;
    var exists =false;
    User.findOne({email: login.email}, function (err, user) {
        if (err) {
            console.log(err);
            res.send({
                resCode:400,
                status:false,
                isError:true,
                message:'error connecting with database'
            })
        }
        else if (!user || user == null) {
            console.log("User is not registered")
            res.send({
                resCode:400,
                isError:true,
                status:false,
                message:'No user created with this email Id'
            });
        }
        else{
            if(hashPassword(login.password) == user.password) {
                console.log("user is valid");
                var sessiontoken = generateToken();
                var devices=[];
                if(req.body.deviceId  && req.body.tokenId){
                    devices ={ "tokenId": req.body.tokenId, "platform": req.body.platform, "deviceId":req.body.deviceId}
                    // check TokenId in whole databse
                    console.log("Users devices");
                    console.log(devices);
                    User.findOne({'devices.tokenId': devices.tokenId}, function (err, userAll) {
                        if(userAll){
                            console.log("All Users");
                            console.log(userAll);
                            var usersDevices = userAll.devices;  // devices for all users
                            for(var i=0; i < usersDevices.length; i++){
                                if(usersDevices[i].deviceId == devices.deviceId){
                                    if(usersDevices[i].tokenId == devices.tokenId){
                                        exists = true;
                                        console.log("User exists with same TokenId")
                                        usersDevices.splice(i,1);
                                        console.log("Update User Information");
                                        console.log(usersDevices);
                                        User.findByIdAndUpdate(userAll._id, {$set: {devices:usersDevices}}, function (er, userDate) {
                                            console.log("same TokenId is removed ");
                                            var devicesUser = user.devices;
                                            console.log("Devices User");
                                            console.log(devicesUser);

                                            for(var i=0;i<user.length;i++){
                                                if(user.devices[i] = devices){
                                                    console.log("Device Information Matched");
                                                    console.log(user.devices[i]);
                                                }
                                            }

                                            devicesUser.push(devices);
                                            console.log("userDevices");
                                            console.log(devicesUser);
                                            User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken,devices:devicesUser}}, function (er, userDate) {
                                                console.log(userDate);
                                                if (er) {
                                                    res.send({resCode: 400, message: 'users unable to login', isError: true});
                                                } else {
                                                    res.send({
                                                        resCode: 200,
                                                        isError: false,
                                                        userId: user._id,
                                                        sessionId: sessiontoken,
                                                        name: user.name,
                                                        email: user.email,
                                                        message: 'user logged In'
                                                    })

                                                }
                                            });
                                        });
                                        break;
                                    }
                                }
                            }
                        }
                        else{
                            var devicesUser = user.devices;
                            devicesUser.push(devices);
                            console.log("userDevices")
                            console.log(devicesUser)
                            User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken,devices:devicesUser}}, function (er, userDate) {
                                console.log(userDate);
                                if (er) {
                                    res.send({resCode: 400, message: 'users unable to login', isError: true});
                                } else {
                                    res.send({
                                        resCode: 200,
                                        isError: false,
                                        userId: user._id,
                                        sessionId: sessiontoken,
                                        name: user.name,
                                        email: user.email,
                                        message: 'user logged In'
                                    })

                                }
                            });
                        }
                    });
                }
                else{
                    User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken}}, function (er, us) {
                        console.log(user);
                        if (er) {
                            res.send({resCode: 400, message: 'users unable to login', isError: true});
                        } else {
                            res.send({
                                resCode: 200,
                                isError: false,
                                userId: user._id,
                                sessionId: sessiontoken,
                                name: user.name,
                                email: user.email,
                                message: 'user logged In'
                            })
                        }
                    });

                }
            }
            else {
                console.log("password does not match")
                res.send({
                    resCode: 400,
                    isError: true,
                    status:false,
                    message: 'password does not match'
                });
            }
        }
    });
}

exports.$$$$signin=function(req,res) {
    var login = req.body;
    var exists =false;
    User.findOne({email: login.email}, function (err, user) {
        if (err) {
            console.log(err);
            res.send({
                resCode:400,
                status:false,
                isError:true,
                message:'error connecting with database'
            })
        }
        else if (!user || user == null) {
            console.log("User is not registered")
            res.send({
                resCode:400,
                isError:true,
                status:false,
                message:'No user created with this email Id'
            });
        }
        else{
            if(hashPassword(login.password) == user.password) {
                console.log("user is valid");
                var sessiontoken = generateToken();
                var devices=[];
                if(req.body.deviceId  && req.body.tokenId){
                    devices ={ "tokenId": req.body.tokenId, "platform": req.body.platform, "deviceId":req.body.deviceId}
                    // check TokenId in whole databse
                    User.find({'devices.tokenId': devices.tokenId}, function (err, userAll) {
                        if(userAll){
                            console.log("users Found")
                            async.forEach(userAll, function(userAll, callback) {
                                console.log("User All");
                                console.log(userAll);
                                var usersDevices = userAll.devices;  // devices for all users
                                for(var i=0; i < usersDevices.length; i++){
                                    if(usersDevices[i].deviceId == devices.deviceId){
                                        if(usersDevices[i].tokenId == devices.tokenId){
                                            exists = true;
                                            console.log("After Found")
                                            console.log(usersDevices);
                                            console.log("User exists with same TokenId")
                                            usersDevices.splice(i,1);
                                            console.log("After Deletion");
                                            console.log(usersDevices);
                                            User.findByIdAndUpdate(userAll._id, {$set: {devices:usersDevices}}, function (er, userDate) {
                                                console.log("same TokenId is removed ");
                                                console.log("Updated User")
                                                console.log(userDate);
                                            });
                                        }
                                    }
                                }
                                callback();
                            },function(err) {
                                if (err) return next(err);
                                console.log("All users with same tokenId removed")
                                User.findOne({email: login.email}, function (err, userData) {
                                    var devicesUser = userData.devices;
                                    devicesUser.push(devices);
                                    console.log("userDevices")
                                    console.log(devicesUser)
                                    User.findByIdAndUpdate(userData._id, {$set: {sessionId: sessiontoken,devices:devicesUser}}, function (er, userDate) {
                                        console.log(userDate);
                                        if (er) {
                                            res.send({resCode: 400, message: 'users unable to login', isError: true});
                                        } else {
                                            res.send({
                                                resCode: 200,
                                                isError: false,
                                                userId: user._id,
                                                sessionId: sessiontoken,
                                                name: user.name,
                                                email: user.email,
                                                message: 'user logged In'
                                            })

                                        }
                                    });

                                });
                            });
                        }
                        else{
                            console.log("No user found with tokenID")
                            User.findOne({email: login.email}, function (err, userData) {
                                var devicesUser = userData.devices;
                                devicesUser.push(devices);
                                console.log("userDevices")
                                console.log(devicesUser)
                                User.findByIdAndUpdate(userData._id, {$set: {sessionId: sessiontoken,devices:devicesUser}}, function (er, userDate) {
                                    console.log(userDate);
                                    if (er) {
                                        res.send({resCode: 400, message: 'users unable to login', isError: true});
                                    } else {
                                        res.send({
                                            resCode: 200,
                                            isError: false,
                                            userId: user._id,
                                            sessionId: sessiontoken,
                                            name: user.name,
                                            email: user.email,
                                            message: 'user logged In'
                                        })

                                    }
                                });

                            });
                        }

                        //
                        // if(userAll){
                        //     for(var j=0;j<userAll.length; j++){
                        //         console.log("User All");
                        //         console.log(userAll[j]);
                        //         var usersDevices = userAll[j].devices;  // devices for all users
                        //         for(var i=0; i < usersDevices.length; i++){
                        //             if(usersDevices[i].deviceId == devices.deviceId){
                        //                 if(usersDevices[i].tokenId == devices.tokenId){
                        //                     exists = true;
                        //                     console.log("After Found")
                        //                     console.log(usersDevices);
                        //                     console.log("User exists with same TokenId")
                        //                     usersDevices.splice(i,1);
                        //                     console.log("After Deletion");
                        //                     console.log(usersDevices);
                        //                     User.findByIdAndUpdate(userAll[j]._id, {$set: {devices:usersDevices}}, function (er, userDate) {
                        //                         console.log("same TokenId is removed ");
                        //                         console.log("Updated User")
                        //                         console.log(userDate);
                        //                     });
                        //                 }
                        //             }
                        //         }
                        //     }
                        //     var devicesUser = user.devices;
                        //     devicesUser.push(devices);
                        //     console.log("userDevices")
                        //     console.log(devicesUser)
                        //     User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken,devices:devicesUser}}, function (er, userDate) {
                        //         console.log(userDate);
                        //         if (er) {
                        //             res.send({resCode: 400, message: 'users unable to login', isError: true});
                        //         } else {
                        //             res.send({
                        //                 resCode: 200,
                        //                 isError: false,
                        //                 userId: user._id,
                        //                 sessionId: sessiontoken,
                        //                 name: user.name,
                        //                 email: user.email,
                        //                 message: 'user logged In'
                        //             })
                        //
                        //         }
                        //     });
                        // }
                        // else{
                        //     var devicesUser = user.devices;
                        //     devicesUser.push(devices);
                        //     console.log("userDevices")
                        //     console.log(devicesUser)
                        //     User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken,devices:devicesUser}}, function (er, userDate) {
                        //         console.log(userDate);
                        //         if (er) {
                        //             res.send({resCode: 400, message: 'users unable to login', isError: true});
                        //         } else {
                        //             res.send({
                        //                 resCode: 200,
                        //                 isError: false,
                        //                 userId: user._id,
                        //                 sessionId: sessiontoken,
                        //                 name: user.name,
                        //                 email: user.email,
                        //                 message: 'user logged In'
                        //             })
                        //
                        //         }
                        //     });
                        // }
                    });
                }
                else{
                    User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken}}, function (er, us) {
                        console.log(user);
                        if (er) {
                            res.send({resCode: 400, message: 'users unable to login', isError: true});
                        } else {
                            res.send({
                                resCode: 200,
                                isError: false,
                                userId: user._id,
                                sessionId: sessiontoken,
                                name: user.name,
                                email: user.email,
                                message: 'user logged In'
                            })
                        }
                    });

                }
            }
            else {
                console.log("password does not match")
                res.send({
                    resCode: 400,
                    isError: true,
                    status:false,
                    message: 'password does not match'
                });
            }
        }
    });
};


var generateToken = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};


exports.delete = function(req, res) {
    var id = req.params.id;
    User.findOne({'_id': id}, function(err, user) {
        console.log(err);
        console.log(user);
        if (err)
        {
            return res.status(400).json({
                status:false, resCode:400, message:'database error occurred'
            });
        }
        else if(!user){
            return res.status(400).json({
                status:false, resCode:400, message:'Can not delete item, id not found'
            });
        }
        else
        {
            console.log(user);
            User.find({'_id': id}).remove().exec();
            return res.status(200).json({status:true , resCode:200 ,message: 'Successfully Deleted'});
        }

    });

};

exports.update = function(req, res)

{
    var id = req.params.id;
    var upt =  req.body;
    User.findByIdAndUpdate(id,{$set:upt}, function (err,user) {
        if(err){
            console.log(err);
            return res.status(400).json({status:false, resCode:400, message:'database error occurred'});
        }
        else if(!user){
            return res.status(400).json({status:false, resCode:400, message:'Can not update item, id not found'});
        }
        else{
            return res.status(200).json({status:true , resCode:200 ,message: 'Successfully Updated'});
        }
    });
}


exports.selectAll = function(req, res) {

    User.findOne({sessionId:req.query.sessionId}).exec(function(err, data) {
        if (err) {
            return res.status(400).json({
                status:false, resCode:400, message:'Can not find data'
            });
        }
        else{
            res.send({
                resCode:200,
                status:true,
                isError:false,
                message:'Success Finding Data',
                data:data
            });
        }

    });

};

//Login Page.

exports.loginPage = function(req,res){
    res.render('login');
}

exports.redirection = function(req,res){
    res.redirect('/newsEntry');
}

exports.Adsignin=function(req,res) {

    var adminFlag;

    var login = req.body;
    var exists =false;
    User.findOne({email: login.email}, function (err, user) {
        if (err) {
            console.log(err);
            res.send({
                resCode:400,
                status:false,
                isError:true,
                message:'error connecting with database'
            })
        }
        else if (!user || user == null) {
            console.log("User is not registered")
            res.send({
                resCode:400,
                isError:true,
                status:false,
                message:'No user created with this email Id'
            });
        }
        else{
            if(hashPassword(login.password) == user.password) {
                console.log("user is valid");
                var sessiontoken = generateToken();
                var devices=[];
                if(req.body.deviceId  && req.body.tokenId){
                    devices ={ "tokenId": req.body.tokenId, "platform": req.body.platform, "deviceId":req.body.deviceId}
                    var userDevices = user.devices;
                    for(var i=0; i < userDevices.length; i++){
                        if(userDevices[i].deviceId == devices.deviceId){
                            if(userDevices[i].tokenId == devices.tokenId){
                                exists =true;
                            }
                        }
                    }

                    if(!exists){
                        userDevices.push(devices);
                        console.log("userDevices")
                        console.log(userDevices)
                        console.log("not found  deviceId");
                        User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken,devices:userDevices}}, function (er, userDate) {
                            console.log(userDate);
                            if (er) {
                                res.send({resCode: 400, message: 'users unable to login', isError: true});

                                //Check Admin Role.
                            }/*else if(userDate){
                             for(var i=0;i<userDate.length;i++){
                             Roles.findOne({name:userDate[i].name},function(err,admin){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Admin not found"});
                             }else if(admin.name == "admin"){
                             Languages.distinct('name',function(err,language){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Data not found"});
                             }else if(language){
                             console.log({status:true,resCode:200,isError:false,message:"Data found",data:language});
                             console.log();

                             Categories.distinct('name',function(err,category){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Data not found"});
                             }else if(category){
                             console.log({status:true,resCode:200,isError:false,message:"Data found",data:category});
                             console.log();

                             res.render('news',{languages:language,category:category});
                             }
                             })
                             }
                             })
                             }
                             })
                             }
                             }*/
                            //----------Check Admin------------//
                            /*else if(userDate){
                             for(var i=0;i<userDate.length;i++){
                             Roles.findOne({name:userDate[i].roleId[i]},function(err,admin){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Admin not found"});
                             }else if(admin.name == "admin"){
                             console.log({
                             resCode: 200,
                             isError: false,
                             userId: user._id,
                             sessionId: sessiontoken,
                             name: user.name,
                             email: user.email,
                             message: 'user logged In'
                             });
                             res.redirect('/newsEntry?sessionId='+userDate.sessionId);
                             }
                             })
                             }
                             }*/

                            else if(userDate){
                                console.log("User");
                                console.log(userDate);
                                for(var i=0;i<us.roleId.length;i++){
                                    Roles.findOne({_id:us.roleId[i]},function(err,admin){
                                        if(admin.name=="admin"){
                                            //res.redirect('/newsEntry?sessionId='+sessiontoken);
                                            //break;
                                            console.log({status:false,resCode:404,isError:false,message:"Admin found" , admin:us});
                                            adminFlag = true;
                                            //break;
                                        }else{
                                            console.log({status:false,resCode:404,isError:false,message:"Admin not found"});
                                        }
                                    })
                                }
                                console.log("Admin Flag");
                                console.log(adminFlag);
                                /*res.send({
                                 resCode: 200,
                                 isError: false,
                                 userId: user._id,
                                 sessionId: sessiontoken,
                                 name: user.name,
                                 email: user.email,
                                 message: 'user logged In'
                                 })*/
                                /*console.log({
                                 resCode: 200,
                                 isError: false,
                                 userId: user._id,
                                 sessionId: sessiontoken,
                                 name: user.name,
                                 email: user.email,
                                 message: 'user logged In'
                                 });
                                 res.redirect('/newsEntry?sessionId='+userDate.sessionId);*/
                                res.redirect('/newsEntry?sessionId='+sessiontoken);
                            }
                        });
                    }
                    else{
                        User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken}}, function (er, us) {
                            console.log("user update with sessionID");
                            if (er) {
                                res.send({resCode: 400, message: 'users unable to login', isError: true});
                            }

                            //Check Admin
                            /*else if(us){
                             for(var i=0;i<userDate.length;i++){
                             Roles.findOne({name:userDate[i].name},function(err,admin){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Admin not found"});
                             }else if(admin.name == "admin"){
                             Languages.distinct('name',function(err,language){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Data not found"});
                             }else if(language){
                             console.log({status:true,resCode:200,isError:false,message:"Data found",data:language});
                             console.log();

                             Categories.distinct('name',function(err,category){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Data not found"});
                             }else if(category){
                             console.log({status:true,resCode:200,isError:false,message:"Data found",data:category});
                             console.log();

                             res.render('news',{languages:language,category:category});
                             }
                             })
                             }
                             })
                             }
                             })
                             }
                             }*/
                            //----------Check Admin------------//
                            /*else if(us){
                             for(var i=0;i<userDate.length;i++){
                             Roles.findOne({name:us[i].roleId[i]},function(err,admin){
                             if(err){
                             console.log({status:false,resCode:400,isError:true,message:"Admin not found"});
                             }else if(admin.name == "admin"){
                             console.log({
                             resCode: 200,
                             isError: false,
                             userId: user._id,
                             sessionId: sessiontoken,
                             name: user.name,
                             email: user.email,
                             message: 'user logged In'
                             });
                             res.redirect('/newsEntry?sessionId='+us.sessionId);
                             }
                             })
                             }
                             }*/
                            //-----------------Log in by admin-----------------------//
                            else if(us){
                                console.log("User");
                                console.log(us);
                                for(var i=0;i<us.roleId.length;i++){
                                    Roles.findOne({_id:us.roleId[i]},function(err,admin){
                                        if(admin.name=="admin"){
                                            //res.redirect('/newsEntry?sessionId='+sessiontoken);
                                            //break;
                                            console.log({status:false,resCode:404,isError:false,message:"Admin found" , admin:us});
                                            adminFlag = true;
                                            //break;
                                        }else{
                                            console.log({status:false,resCode:404,isError:false,message:"Admin not found"});
                                        }
                                    })
                                }

                                console.log("Admin Flag");
                                console.log(adminFlag);

                                /*res.send({
                                 resCode: 200,
                                 isError: false,
                                 userId: user._id,
                                 sessionId: sessiontoken,
                                 name: user.name,
                                 email: user.email,
                                 message: 'user logged In'
                                 })*/
                                res.redirect('/newsEntry?sessionId='+sessiontoken);
                            }
                        });
                    }

                }
                else{
                    User.findByIdAndUpdate(user._id, {$set: {sessionId: sessiontoken}}, function (er, us) {
                        console.log(user);
                        if (er) {
                            res.send({resCode: 400, message: 'users unable to login', isError: true});
                        } else if(us){

                            console.log("User");
                            console.log(us);

                            for(var i=0;i<us.roleId.length;i++){
                                Roles.findOne({_id:us.roleId[i]},function(err,admin){
                                    if(admin.name=="admin"){
                                        //res.redirect('/newsEntry?sessionId='+sessiontoken);
                                        //break;
                                        console.log({status:false,resCode:404,isError:false,message:"Admin found" , admin:us});
                                        adminFlag = true;
                                        //break;
                                    }else{
                                        console.log({status:false,resCode:404,isError:false,message:"Admin not found"});
                                    }
                                })
                            }

                            console.log("Admin Flag");
                            console.log(adminFlag);

                            /*res.send({
                             resCode: 200,
                             isError: false,
                             userId: user._id,
                             sessionId: sessiontoken,
                             name: user.name,
                             email: user.email,
                             message: 'user logged In'
                             })*/
                            res.redirect('/newsEntry?sessionId='+sessiontoken);
                        }
                    });

                }
            }
            else {
                console.log("password does not match")
                res.send({
                    resCode: 400,
                    isError: true,
                    status:false,
                    message: 'password does not match'
                });
            }
        }
    });
};


exports.admin_logout = function(req,res){
    res.redirect('/adminLogin');
}