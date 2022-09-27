var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'mypassword');
console.log('token -> ', token);
var decoded = jwt.verify(token, 'mypassword');
console.log('decoded -> ', decoded);
jwt.verify(token, 'mypassword', function (err, decoded) {
    console.log(decoded.bar);
});
