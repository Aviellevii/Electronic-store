const Pcategory = require('../models/pcategory.model');
const Product = require('../models/product.model');
const asyncHandler = require('express-async-handler');

const createCategory = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const categoryExist = await Pcategory.findOne({title});
    try {
        if (categoryExist) {
            res.status(400).send('category already exist');
            return;
        }

        const newCategory = new Pcategory({
            title
        });
        newCategory.save().then(result => res.status(200).send(result));
    } catch (error) {
        throw new Error(error);
    }
})

const getAllCategoty = asyncHandler(async (req, res) => {
    try {
        const categories = await Pcategory.find();
        res.send(categories);
    } catch (error) {
        throw new Error(error);
    }
})

const getPcategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const pcategory = await Pcategory.findByIdAndUpdate({ _id: id });
        res.send(pcategory);
    } catch (error) {
        throw new Error(error)
    }
})

const updateCategoty = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const newcategoty = await Pcategory.findByIdAndUpdate({ _id: id }, req.body, { new: true });
    res.send(newcategoty);
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Pcategory.findByIdAndRemove({ _id: id });
        res.send(category);
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createCategory, getAllCategoty, updateCategoty, deleteCategory, getPcategory }