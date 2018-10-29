const express = require('express')
const router = express.Router()
const Category = require('../app/models/Category')
const Sound = require('../app/models/Sound')

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
 * @api {get} /category/id get a specific category
 * @apiName GetCategories
 * @apiGroup Category
 *
 * @apiSuccess {Object} all the categories
 */
router.get('/:id', function (req, res, next) {
    Category.find({ _id: req.params.id }).sort('name').exec(function (err, category) {
        if (err) {
            err.status = 400
            return next(err)
        }
        res.send(category)
    })
})

/**
 * @api {get} /category/:id/sounds get all the sounds of a category
 * @apiName GetSoundsofCategory
 * @apiGroup Category
 *
 * @apiSuccess {Object} get all the sounds of a category
 */
router.get('/:id/sounds', function (req, res, next) {
    
    Category.findOne({ _id: req.params.id }).exec(function (err, category) {
        if (err) {
            err.status = 400
            return next(err)
        }
        
        Sound.aggregate([
            {
                $match: {
                    "categories" : category._id
                }
            }
        ], function (err, results) {
            if (err) {
                err.status = 400
                return next(err)
            }
            res.send(results)
        });
    })
})

/**
 * @api {post} /category add a category
 * @apiName PostCategory
 * @apiGroup Category
 *
 * @apiSuccess {Object} add a category
 */
router.post('/', function (req, res, next) {

    let newCategory = req.body

    if (!newCategory.name || !newCategory.description) {
        throw new Error("Missing fields in : category")
    }

    const newCategoryDocument = new Category(newCategory)

    newCategoryDocument.save(function (err, savedCategory) {
        if (err) {
            return next(err)
        }

        res.send(savedCategory)
    })
})

/**
 * @api {put} /category/id modifiy a specific category
 * @apiName PutCategory
 * @apiGroup Category
 *
 * @apiSuccess {Object} modifiy a specific category
 */
router.put('/:id', function (req, res, next) {
    Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, category) {
        if (err) {

            res.status(404).send('Category not found')
            return next(err)
        }
        res.send(category)
    })
})

/**
 * @api {delete} /category/id delete a specific category
 * @apiName DeleteCategory
 * @apiGroup Category
 *
 * @apiSuccess {Object}  delete a specific category
 */
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