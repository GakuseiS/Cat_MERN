const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
  },
  type: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  addon: {
    type: {
      sugar: {
        type: String,
      },
      water: {
        type: String,
      },
      milk: {
        type: String,
      },
      vitamin: {
        type: String,
      },
    },
  },
});

module.exports = model("Programm", schema);
