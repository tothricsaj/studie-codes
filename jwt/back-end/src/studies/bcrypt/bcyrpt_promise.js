"use strict";
exports.__esModule = true;
var bcrypt_1 = require("bcrypt");
var saltRounds = 10;
var myPlaintextPassword = 's0/\/\P4$$w0rD';
var someOtherPlaintextPassword = 'not_bacon';
var saltedPassword;
// Promise.all([
// 	hash(myPlaintextPassword, saltRounds),
// 	compare(myPlaintextPassword, saltedPassword)
// ]).then(val => console.log('val -> ', val))
bcrypt_1.hash(myPlaintextPassword, saltRounds)
    .then(function (hash) {
    console.log('hashed password -> ', hash);
    saltedPassword = hash;
    return bcrypt_1.compare(myPlaintextPassword, saltedPassword);
})
    .then(function (result) {
    console.log(result ? 'You have permission!' : 'Acces denied!');
    return bcrypt_1.compare(myPlaintextPassword, someOtherPlaintextPassword);
})
    .then(function (result) {
    console.log(result ? 'You have permission!' : 'Acces denied!');
})["catch"](function (err) { return console.log(err); });
