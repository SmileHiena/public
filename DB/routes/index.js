var express = require('express');
var router = express.Router();

const connectDb = require('../model/db');
const { ObjectId } = require('mongodb');

// Lấy tất cả sản phẩm dạng json
router.get('/products', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const products = await productCollection.find().toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Lấy sản phẩm theo ID
router.get('/products/:id', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const product = await productCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Thêm sản phẩm mới
router.post('/products', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const newProduct = req.body;
    const result = await productCollection.insertOne(newProduct);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Cập nhật sản phẩm theo ID
router.put('/products/:id', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const updatedProduct = req.body;
    const result = await productCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedProduct }
    );
    if (result.matchedCount > 0) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Xóa sản phẩm theo ID
router.delete('/products/:id', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const result = await productCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Xóa thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Lấy sản phẩm theo danh mục
router.get('/products/category/:categoryId', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const categoryId = parseInt(req.params.categoryId, 10);
    const products = await productCollection.find({ categoryId }).toArray();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm nào trong danh mục này" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Lấy tất cả danh mục
router.get('/categories', async (req, res, next) => {
  try {
    const db = await connectDb();
    const categoryCollection = db.collection('categories');
    const categories = await categoryCollection.find().toArray();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Lấy danh mục theo ID
router.get('/categories/:id', async (req, res, next) => {
  try {
    const db = await connectDb();
    const categoryCollection = db.collection('categories');
    const category = await categoryCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Thêm danh mục mới
router.post('/categories', async (req, res, next) => {
  try {
    const db = await connectDb();
    const categoryCollection = db.collection('categories');
    const newCategory = req.body;
    const result = await categoryCollection.insertOne(newCategory);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Cập nhật danh mục theo ID
router.put('/categories/:id', async (req, res, next) => {
  try {
    const db = await connectDb();
    const categoryCollection = db.collection('categories');
    const updatedCategory = req.body;
    const result = await categoryCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedCategory }
    );
    if (result.matchedCount > 0) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Xóa danh mục theo ID
router.delete('/categories/:id', async (req, res, next) => {
  try {
    const db = await connectDb();
    const categoryCollection = db.collection('categories');
    const result = await categoryCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Xóa thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Tìm kiếm theo sản phẩm
router.get('/search/:keyword', async(req, res, next)=> {
  const db=await connectDb();
  const productCollection=db.collection('products');
  const products=await productCollection.find({name: new RegExp(req.params.keyword, 'i')}).toArray();
  if(products){
    res.status(200).json(products);
  }else{
    res.status(404).json({message : "Không tìm thấy"})
  }
}
);


// Lấy sản phẩm hot
router.get('/products/hot', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const products = await productCollection.find({ isHot: true }).toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Lấy sản phẩm bestsale
router.get('/products/bestsale', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const products = await productCollection.find({ isBestsale: true }).toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

module.exports = router;
