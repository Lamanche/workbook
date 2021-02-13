const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            //useFindAndModify: false
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
};

module.exports = connectDB