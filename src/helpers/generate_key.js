const crypto = require('crypto');

const keyFirst = crypto.randomBytes(37).toString('hex');
const keySecond = crypto.randomBytes(37).toString('hex');

// eslint-disable-next-line no-console
console.table({ keyFirst, keySecond });
