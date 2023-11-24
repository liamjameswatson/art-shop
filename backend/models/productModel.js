import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    otherImages: [String],
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    stockNumber: {
      type: Number,
      required: true,
      default: 0,
    },
    isPrint: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true, // add createdAt and updatedAt timestamps
  }
);

productSchema.pre("save", async function (next) {
  if (this.isPrint) {
    this.stockNumber = 999;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
