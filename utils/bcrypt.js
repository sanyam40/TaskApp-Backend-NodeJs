const bcrypt = require('bcrypt');

const encryptanddecrypt = {

    hasPwd(originalPWD) {
        const hashedPws = bcrypt.hashSync(originalPWD, 10);
        return hashedPws;
    },
    matchPwd(originalPWD, hashedPwd) {
        const matchedornot = bcrypt.compareSync(originalPWD, hashedPwd);
        return matchedornot;

    }
}

module.exports = encryptanddecrypt;