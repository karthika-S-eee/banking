const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToMongoose = async () => {
  try {
    const db = await mongoose.connect("mongodb+srv://karthikas2022eee:karthikas1411@cluster0.rax4udu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to Mongoose Through ${db.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  connectToMongoose,
};
