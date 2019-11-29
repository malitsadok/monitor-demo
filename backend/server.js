const express = require('express');
const cors = require('cors');


const app = express();
const port = 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());

const login = require('./routes/login');
const monitor = require('./routes/monitor');


app.use('/', login);
app.use('/monitor', monitor);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
