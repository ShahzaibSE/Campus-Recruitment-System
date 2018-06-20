/**
 * Created by shahzaib on 3/15/17.
 */
var dbModels = require('./../models/models');
var mongoose = require('mongoose');

exports.dataModels = {
    user:dbModels.user(),
    company:dbModels.company(),
    student:dbModels.student(),
    role: dbModels.roles()
}

