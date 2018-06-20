'use strict'

const oauth = require('oauth2-server');

exports.authenticate = function(req,res,next) {
    let request = new oauth.Request(req);
    console.log('OAuth request object');
    console.log(request);
    oauth.authenticate(req,res).then( token => {
        console.log(`Successfully authenticated.`);
    }).catch( err => {
        console.log(`Failed to authenticate`);
    });
    next();
}