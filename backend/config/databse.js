const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Database connected successfully!!');

    } catch (error) {
        console.log(error);

        process.exit(1);
    }
};

module.exports = connectDb;