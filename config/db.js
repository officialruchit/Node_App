const mongoose = require("mongoose");
const url =
  "mongodb+srv://testing:test@atlascluster.ij20tlj.mongodb.net/userApp?retryWrites=true&w=majority";

const connectdb = () => {
  mongoose
    .connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err.message));
};

module.exports = connectdb;
