const bcrypt = require('bcrypt');

exports.hashpass = async (data, saltRounds) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash data
        return await bcrypt.hash(data, salt);
    } catch (error) {
        console.log(error);
    }

    // Return null if error
    return null;
};