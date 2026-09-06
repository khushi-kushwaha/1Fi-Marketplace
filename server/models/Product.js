const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hex: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const variantSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const emiPlanSchema = new mongoose.Schema(
  {
    months: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Phone", "Laptop"],
    },

    description: {
      type: String,
      default: "",
    },

    colors: {
      type: [colorSchema],
      required: true,
    },

    variants: {
      type: [variantSchema],
      required: true,
    },

    emiPlans: {
      type: [emiPlanSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;