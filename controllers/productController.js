import Product from "../models/Product.js";

// CREATE
export const createProduct = async (req, res) => {
  try {
    const { name, series, category } = req.body;

    if (!name || !series) {
      return res.status(400).json({ message: "Name and series are required" });
    }

    if (!req.files?.tileImage) {
      return res.status(400).json({ message: "Tile image is required" });
    }

    const product = new Product({
      name,
      series,
      category: category || "",
      tileImage: `/uploads/${req.files.tileImage[0].filename}`,
      hoverImage: req.files.hoverImage
        ? `/uploads/${req.files.hoverImage[0].filename}`
        : "",
      previewImages: req.files.previewImages
        ? req.files.previewImages.map(f => `/uploads/${f.filename}`)
        : []
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// READ
export const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// UPDATE
export const updateProduct = async (req, res) => {
  const updates = { ...req.body };

  if (req.files?.tileImage) {
    updates.tileImage = `/uploads/${req.files.tileImage[0].filename}`;
  }

  if (req.files?.hoverImage) {
    updates.hoverImage = `/uploads/${req.files.hoverImage[0].filename}`;
  }

  if (req.files?.previewImages) {
    updates.previewImages = req.files.previewImages.map(
      f => `/uploads/${f.filename}`
    );
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true }
  );

  res.json(product);
};

// DELETE
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
