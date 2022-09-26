import { genSalt, hash, compare } from 'bcrypt';

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

let saltedPassword: any;

// Promise.all([
// 	hash(myPlaintextPassword, saltRounds),
// 	compare(myPlaintextPassword, saltedPassword)
// ]).then(val => console.log('val -> ', val))

hash(myPlaintextPassword, saltRounds)
	.then(hash => {
		console.log('hashed password -> ', hash);
		saltedPassword = hash;

		return compare(myPlaintextPassword, saltedPassword)
	})
	.then(result => {
		console.log(
		 result ? 'You have permission!':'Acces denied!'
		);
		return compare(myPlaintextPassword, someOtherPlaintextPassword)
	})
	.then(result => {
		console.log(
		 result ? 'You have permission!':'Acces denied!'
		)
	})
	.catch(err => console.log(err));