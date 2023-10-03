// import express from "express";
const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.status(200).send("Hello");
});

app.listen(5000, () => {
  console.log("Listening on PORT 5000");
});
