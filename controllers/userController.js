const { request } = require("express");

exports.login = ((request,response)=>{
    response.render('login');
});

exports.register =((request,response)=>{
    response.render('register');
})