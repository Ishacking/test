var express = require('express');
var expressJwt = require('express-jwt');
var router = express.Router();
var db = require('../db');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');
var secret = "dahdgabaui21dsd54da21d2a";
router.post('/login', function(req, res){
    email = req.body.email;
    password = req.body.password;
    console.log(email)
    console.log(password)
    con.query("select * from contact where email = ?", [email], function (err, result) {
        if(result.length>0){
            if(result[0].password == password){
                // var res = result[0];
                console.log(result[0])
                const token = jwt.sign({user: result[0].password}, secret, { expiresIn: '1h' });
                res.json({status:"success", user: result[0].email, token:token});
            }else{
                res.status(200).json({status:'pwd wrong'});
            }
        } else {
            res.status(200).json({status:'user not found'});
        }
    }) 
});
router.get('/contact', function(req, res){
    con.query("select * from contact", function (err, result) {
        res.status(200).json(result);
    }) 
});
module.exports = router;