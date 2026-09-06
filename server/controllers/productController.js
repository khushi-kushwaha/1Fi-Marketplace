const Product = require("../models/Product");
const calculateEmi = require("../utils/calculateEmi");

const addCalculatedEmi = (product) => {
  const productObject = product.toObject();

  productObject.emiPlans = productObject.emiPlans.map((plan) => ({
    ...plan,

    monthlyEmi: productObject.variants.map((variant) => ({
      variant: variant.label,

      amount: calculateEmi(
        variant.price,
        plan.months,
        plan.interestRate
      ),
    })),
  }));

  return productObject;
};

// GET all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const formattedProducts = products.map((product) =>
      addCalculatedEmi(product)
    );

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("Get products error:", error.message);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

// GET single product by slug
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const formattedProduct = addCalculatedEmi(product);

    res.status(200).json(formattedProduct);
  } catch (error) {
    console.error("Get product error:", error.message);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
};