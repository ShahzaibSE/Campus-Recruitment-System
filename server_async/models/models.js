/**
 * Created by shahzaib on 3/15/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.user = function(){

    var User = Schema({
        id :Schema.ObjectId,
        name: String,
        email: String,
        password: String,
        roleId: [],
        devices: [],
        sessionId: String,
        verificationCode: String,
        isActive: Boolean,
        createdAt: Date,
        updatedAt: Date
    })

    return mongoose.model('users',User)

}

exports.roles = function ()
{
    var roles = mongoose.Schema({
        id :Schema.ObjectId,
        name: String,
        createdAt: Date,
        updatedAt: Date
    });
    return mongoose.model('roles', roles);
}

exports.company = function(){

    var Company = mongoose.Schema({
        id:Schema.ObjectId,
        name:String,
        email:String,
        website:String,
        vacancies:Number,
        createdAt:Date,
        updatedAt:Date
    })

}

exports.student = function(){

    var Student = mongoose.Schema({
        id:Schema.ObjectId,
        name:String,
        email:String,
        // password:String,
        createdAt:String,
        rollno:Number,
        batch:Number,
        Institute:String,
        createdAt:Date,
        updatedAt:Date
    })

}

exports.auditLogs = function(){

    var auditLogs = mongoose.Schema({
        id:Schema.ObjectId,
        user:String,
        role:String,
        Activity:String,
        date:Date
    })

    return mongoose.model('auditLogs',auditLogs);
}

// exports.auditLogs = function ()          //Version1 Auditlog Model
// {
//     var auditLogs = mongoose.Schema({
//         id :Schema.ObjectId,
//         collectionName: String,
//         documentId: String,
//         oldDocument: {},
//         newDocument: {},
//         createdAt: Date,
//         updatedAt: Date,
//         createdBy: String,
//         updatedBy: String,
//         isActive: Boolean
//     });
//     return mongoose.model('auditLogs', auditLogs);
// }