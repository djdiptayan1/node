const express = require("express"); // import express
const app = express(); // initialize express
const mongoose = require("mongoose");
const Product = require("./models/productModel");

app.use(express.json()); // use express.json() middleware
app.use(express.urlencoded({ extended: true })); // use express.urlencoded() middleware and send data in form

//routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/page", (req, res) => {
  res.send("Hello page");
});

//connect to mongodb atlas
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://djdiptayan:dj2037@cluster0.uydje5k.mongodb.net/nodeapi?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });

    console.log("\tCONNECTED TO MONGODB ATLAS DATABASE YEAH");
  })
  .catch((error) => {
    console.log("Connection failed");
  });

//PUSHING DATA TO MONGODB ATLAS
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body); //create is a mongoose method
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//GETTING DATA FROM MONGODB ATLAS
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}); //find is a mongoose method
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//SEARCHING DATA FROM MONGODB ATLAS BY ID
app.get("/search/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Product.findById(id); //findById is a mongoose method
    res.status(200).json(item);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//SEARCHING DATA FROM MONGODB ATLAS BY NAME
app.get("/searchbyname/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Product.find({ name: id }); //findById is a mongoose method
    res.status(200).json(item);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//UPDATING DATA IN MONGODB ATLAS
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body); //findByIdAndUpdate is a mongoose method
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETING DATA FROM MONGODB ATLAS
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id); //findByIdAndDelete is a mongoose method
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
