import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  publicKey: {
    type: String,
    required: [true, "Public Key is required"],
    minlength: 56,
    maxlength: 56,
  },
  productPrice: {
    type: Number,
    required: [true, "Product Price is required"],
  },
  productTitle: {
    type: String,
    required: [true, "Product Title is required"],
    trim: true,
  },
  productDescription: {
    type: String,
    required: false,
  },
  productUrl: {
    type: Array,
    required: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  memoIds: {
    type: Array,
    required: false,
  },
});

// eslint-disable-next-line no-undef
module.exports =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
