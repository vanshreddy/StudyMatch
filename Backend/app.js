const express = require("express");
const routes = require('./routes/v1');
const cors = require('cors');
const ApiError = require('./utils/ApiError');
const helmet = require('helmet');
// const httpStatus = require('http-status');


const app = express();
const PORT = process.env.PORT || 3000;


// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded requnpst body
app.use(express.urlencoded({ extended: true }));



// enable cors
app.use(cors());
app.options('*', cors());


// v1 api routes
app.use('/v1', routes);


app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

module.exports = app;