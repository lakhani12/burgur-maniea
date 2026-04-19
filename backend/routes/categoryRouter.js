import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/category.js";
import { isAuth, isAdmin } from "../utlis.js";

const categoryRouter = express.Router();

categoryRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.send(categories);
}));

categoryRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const newCategory = new Category({
        name: req.body.name,
        priceRange: req.body.priceRange,
        description: req.body.description,
        categoryName: req.body.categoryName,
    });
    const createdCategory = await newCategory.save();
    res.status(201).send(createdCategory);
}));

categoryRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category) {
        category.name = req.body.name || category.name;
        category.priceRange = req.body.priceRange || category.priceRange;
        category.description = req.body.description || category.description;
        category.categoryName = req.body.categoryName || category.categoryName;
        const updatedCategory = await category.save();
        res.send(updatedCategory);
    } else {
        res.status(404).send({ message: 'Category Not Found' });
    }
}));

categoryRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        res.send({ message: 'Category Deleted', category: deletedCategory });
    } else {
        res.status(404).send({ message: 'Category Not Found' });
    }
}));

export default categoryRouter;
