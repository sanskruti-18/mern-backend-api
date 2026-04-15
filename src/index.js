const express = require('express');
const apiRoutes = require('./routes');
const dotenv=require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
dotenv.config();
app.use(cors());

app.use('/api', apiRoutes);
const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Server is started at port ${PORT}`);
});
//Code for connection start
const Connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connection Successful");
  } catch (error) {
    console.log("Error while connecting to the database", error);
  }
};
Connection();
//Code for connection end