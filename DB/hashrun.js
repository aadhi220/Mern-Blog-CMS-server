const hashPassword = require('./hash');

// Example usage
const passwordToHash = 'Vijay123';

hashPassword(passwordToHash)
  .then((hashedPassword) => {
    console.log('Hashed Password:', hashedPassword);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
