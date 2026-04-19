import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/products.js";
import Wishlist from "../models/wishlist.js";
import { isAuth, isAdmin } from "../utlis.js";

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.query.category }) //return all products
    res.send(products)
}));



productRouter.get('/search', expressAsyncHandler(async (req, res) => {
    let regEx = new RegExp(req.query.name, 'i');
    const serachedProducts = await Product.find({ name: regEx })
    if (serachedProducts) {
        res.send(serachedProducts)

    } else {
        res.status(402).send({ message: 'Opps No product found!!' })
    }
}))

productRouter.post('/wishlist', isAuth, expressAsyncHandler(async (req, res) => {
    const item = await Wishlist.findOne({ product: req.body._id });
    if (item) {
        res.status(409).send({ message: 'Item Already exits' });
    }
    else {
        const newItem = new Wishlist({
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            rating: req.body.rating,
            description: req.body.description,
            userId: req.user._id,
            product: req.body._id
        })
        const wishlistItem = await newItem.save();
        res.send(wishlistItem)
    }
}))

productRouter.post('/add-product', expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price
    })
    const products = await newProduct.save();
    res.send(products)
}))

productRouter.get('/wishlist', isAuth, expressAsyncHandler(async (req, res) => {

    const items = await Wishlist.find({ userId: req.user._id });
    res.send(items)

}))
productRouter.delete('/wishlist/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const items = await Wishlist.deleteOne({ productId: req.params.id });
    res.send(req.params.id)

}))

productRouter.get('/seed',
    expressAsyncHandler(async (req, res) => {
        const createProducts = await Product.insertMany(data.products)
        res.send({ products: createProducts })
    })
)

productRouter.get('/admin', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.send(products)
}))

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product not found!' })
    }
}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.send({ message: 'Product Deleted', product: deletedProduct })
    } else {
        res.status(404).send({ message: 'Product not found!' })
    }
}))

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.image = req.body.image || product.image;
        product.category = req.body.category || product.category;
        product.description = req.body.description || product.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}));

export default productRouter