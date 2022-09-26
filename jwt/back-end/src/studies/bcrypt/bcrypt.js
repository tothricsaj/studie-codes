"use strict";
exports.__esModule = true;
var bcrypt_1 = require("bcrypt");
var saltRounds = 10;
var myPlaintextPassword = 's0/\/\P4$$w0rD';
var someOtherPlaintextPassword = 'not_bacon';
var secretPass;
bcrypt_1.genSalt(saltRounds, function (err, salt) {
    console.log('salt -> ', salt);
    bcrypt_1.hash(myPlaintextPassword, salt, function (err, hash) {
        console.log('hash -> ', hash);
        secretPass = hash;
        bcrypt_1.compare(myPlaintextPassword, secretPass, function (err, result) {
            console.log('result with myPlainTextPassword -> ', result);
        });
        bcrypt_1.compare(someOtherPlaintextPassword, secretPass, function (err, result) {
            console.log('result with someOtherPlainTextPassword -> ', result);
        });
    });
});
