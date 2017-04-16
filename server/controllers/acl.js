/**
 * Created by shahzaib on 3/15/17.
 */
var exec = require('exec');
var User = require('./dbInjector').dataModels.user;   //Import models of user.

exports.hasAutherization = function(req,res,next){
    User.findOne({sessionId:req.query.v}).exec(function(err,data){

        if(err){
            console.log({
                status:false,
                resCode:400,
                isError:true,
                message:"Internal error while finding user",
                error:err
            })
            res.send({
                status:false,
                resCode:400,
                isError:true,
                message:"Internal error while finding user",
                // error:err
            })
        }else if(data){  //User declares to be authorized
            next();
        }

    })
}

var generateToken = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};