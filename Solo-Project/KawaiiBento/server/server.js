require('./config/mongoose.config');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.port || 4000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors({ credentials: true}));
app.use(express.json(), express.urlencoded({ extended: true }));

require('./routes/kawaii.routes')(app)
require('./routes/user.routes')(app)

app.listen(port, () => console.log(`Listening on port: ${port}`) );