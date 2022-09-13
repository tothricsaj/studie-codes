import { genSalt, hash, compare } from 'bcrypt';

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

let secretPass: string;

genSalt(saltRounds, function(err, salt) {
	console.log('salt -> ', salt);
	
	hash(myPlaintextPassword, salt, function(err, hash) {
		console.log('hash -> ', hash);
		secretPass = hash;

		compare(myPlaintextPassword, secretPass,  (err, result) => {
			console.log('result with myPlainTextPassword -> ', result);
		});

		compare(someOtherPlaintextPassword, secretPass,  (err, result) => {
			console.log('result with someOtherPlainTextPassword -> ', result);
		});
	});
});