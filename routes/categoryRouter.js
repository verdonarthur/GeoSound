const express = require('express')
const router = express.Router()
const Category = require('../app/models/Category')

/**
 * @api {get} /category get all the categories
 * @apiName GetCategories
 * @apiGroup Category
 *
 * @apiSuccess {Object} all the categories
 */
router.get('/', function (req, res, next) {
    Category.find().sort('name').exec(function (err, categories) {
        if (err) {
            err.status = 400
            return next(err)
        }
        res.send(categories)
    })
})

/**
 * @api {get} /category get a specific category
 * @apiName GetCategories
 * @apiGroup Category
 *
 * @apiSuccess {Object} all the categories
 */
router.get('/:id', function (req, res, next) {
    Category.find({_id:req.params.id}).sort('name').exec(function (err, category) {
        if (err) {
            err.status = 400
            return next(err)
        }
        res.send(category)
    })
})


router.post('/', function (req, res, next) {

    let newCategory = req.body
    const newCategoryDocument = new Category(newCategory)

    newCategoryDocument.save(function (err, savedCategory) {
    if (err) {
        return next(err)
    }

    res.send(savedCategory)
    })
})


router.put('/:id', function (req, res, next) {
    Category.findOneAndUpdate({_id:req.params.id}, req.body,{new:true}, function(err, category){
        if (err) {

            res.status(404).send('Category not found')
            return next(err)
        }
        res.send(category)
    })
})


router.delete('/:id', function (req, res, next) {

    Category.findByIdAndRemove(req.params.id).exec(function (err, user) {
        if (err) {
            res.status(404).send('Category not found')
            return next(err)
        }

        res.status(200).send("Category with ID : " + req.params.id + " successfully deleted")
    })

})

module.exports = router