const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const customerModel = require("./Models/customerModel");
const { json } = require("body-parser");
const bodyParser = require("body-parser");
const rondomPassword = require("./utilities");
const multer = require("multer");
const fs = require("fs");
const imageModel = require("./Models/imageModels");
const productModel = require("./Models/productModel");

const app = express();
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
// app.use(json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", async (req, res) => {
  res.send("api runing for ecom application");
});

app.post("/addcustomer", async (req, res) => {
  connectDB("ecomadmin");
  const count = await customerModel.find({});
  const payload = req.body;
  const ogpaylaod = {
    ...payload,
    id: count.length + 1,
    totalsale: 0,
    totalorder: 0,
    user_id: 8787 + count.length + 1,
    username: payload.email,
    password: rondomPassword(8),
    user_type: "ecom",
    registered_date: new Date(),
    status: true,
  };

  const data = await new customerModel(ogpaylaod);
  data.save();
  res.send("customer added successfully");
});

app.get("/getcustomer", async (req, res) => {
  connectDB("ecomadmin");
  const { rowperpage, page, sortby, order, search } = req.query;
  const skip = (page - 1) * rowperpage;
  const regex = new RegExp(search, "i");
  const count = await customerModel.find({ fname: regex });

  const data = await customerModel
    .find({ fname: regex })
    .sort({ [sortby]: order == "ASC" ? 1 : -1 })
    .skip(skip ? skip : 0)
    .limit(Number(rowperpage))
    .exec();
  res.json({
    data,
    pages: {
      count: count.length,
      rowsPerPage: Number(rowperpage),
      page: Number(page),
      totalPages: Math.ceil(count.length / rowperpage),
    },
  });
});

app.post("/uplaodimage", upload.single("imageData"), async (req, res, next) => {
  connectDB("ecomadmin");
  const count = await imageModel.find({});
  const obj = {
    title: req.body.title,
    category_image: req.body.category,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: req.file.mimetype,
    },
    id: count.length + 1,
  };

  const newImage = await new imageModel(obj);
  newImage
    .save()
    .then(() => {
      res.send("image uploaded successfully");
    })
    .catch((err) => {
      res.status(400);
      res.send("invalid data");
    });
});

app.get("/getgallery", async (req, res) => {
  connectDB("ecomadmin");
  const { rowperpage, page, search } = req.query;
  const skip = (page - 1) * rowperpage;
  const regex = new RegExp(search, "i");
  const count = await imageModel.find({ title: regex });

  const data = await imageModel
    .find({ title: regex })
    .skip(skip ? skip : 0)
    .limit(Number(rowperpage))
    .exec();
  res.json({
    data,
    pages: {
      count: count.length,
      rowsPerPage: Number(rowperpage),
      page: Number(page),
      totalPages: Math.ceil(count.length / rowperpage),
    },
  });
});

app.post("/addproduct", async (req, res) => {
  connectDB("ecomadmin");
  const count = await productModel.find({});
  const payload = req.body;
  const obj = {
    ...payload,
    id: count.length + 1,
    createdproduct: new Date(),
    updatedproduct: new Date(),
  };
  console.log(obj);
  const data = new productModel(obj);
  await data.save();
});

app.get("/getproduct", async (req, res) => {
  connectDB("ecomadmin");

  const count = await ProductModel.find();
  const data = await ProductModel.deleteMany();
  res.json({
    data,
  });
});

app.listen(8000, () => {
  console.log("server is runing on port 8000");
});