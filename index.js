const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
};

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
//app.use(express.static(path.join(__dirname, "client", "build")))

app.use("/user", require('./routes/user.js'))
app.use("/post", require('./routes/post.js'))
app.use("/comments", require('./routes/comments.js'))


const PORT = process.env.PORT || 3001;

//app.get("*", (req, res) => {
   // res.sendFile(path.join(__dirname, "client", "build", "index.html"))
//})

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on ${PORT}`)); 
