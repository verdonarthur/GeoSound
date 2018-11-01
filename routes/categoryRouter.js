const express = require('express')
const router = express.Router()
const Category = require('../app/models/Category')
const Sound = require('../app/models/Sound')

/**
 * @api {get} /category get all the categories
 * @apiName GetCategories
 * @apiGroup Category
 * @apiUse AuthHeader
 * 
 * @apiParam {String} name name of the category
 * @apiParam {String} description description of thecategory
 *  
 * @apiSuccess {Object[]} categories
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *[
 *{"_id": "5bd70ac772c3a20016a55a1c","name": "Airplanes","description": "Yeah flying machines","__v": 0},
 *{"_id": "5bd70afe72c3a20016a55a1d","name": "Cars","description": "Yeah rolling machines","__v": 0},
 *{"_id": "5bd70c6172c3a20016a55a2e","name": "City","description": "Town, only bigger!","__v": 0}
 *]
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
 * @api {get} /category/:id get a specific category
 * @apiName GetCategories
 * @apiGroup Category
 * @apiUse AuthHeader
 * 
 * @apiParam {ObjectId} id ObjectId of a category
 * 
* @apiSuccess {Object} category a specific category in API
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {"_id": "5bd70c6172c3a20016a55a2e","name": "City","description": "Town, only bigger!","__v": 0}
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
 * @apiUse AuthHeader
 * 
 * @apiSuccess {Object[]} get all the sounds of a category
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *
 *  [
 *  {"_id": "5bd70c5c72c3a20016a55a2c","categories": ["5bd70ac772c3a20016a55a1c","5bd70afe72c3a20016a55a1d"],"sound": "***","coordinate":[{"_id": "5bd70c5c72c3a20016a55a2d","city": "8","loc": {"y": "aaa"}}],"description": "---","quality": "Bad","user": "5bd70bf372c3a20016a55a26","__v": 0},
 *  {"_id": "5bd70d1772c3a20016a55a35","categories": ["5bd70ac772c3a20016a55a1c","5bd70ac772c3a20016a55a1c"],"sound": "efefwef","coordinate": [{"_id": "5bd70d1772c3a20016a55a36","city": "8","loc": {"y": "aaa"}}],"description": "---","quality": "Bad","user": "5bd70bf372c3a20016a55a26","__v": 0}
 * ]
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
 * @api {post} /category add a new category
 * @apiName PostCategory
 * @apiGroup Category
 *
 * @apiParam (Request body) {String} name name of the new category
 * @apiParam (Request body) {String} description description of the new category
 * 
 * @apiSuccess {Object} a new category
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {"_id": "5bd70c6172c3a20016a55a2e","name": "City","description": "Town, only bigger!","__v": 0}
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
 * @api {put} /category/:id modify a specific category
 * @apiName PutCategory
 * @apiGroup Category
 *
 * @apiParam {Number} id of the category you want to modify
 * 
 * @apiParam (Request body) {String} name new name of the category
 * @apiParam (Request body) {String} description new description of the category
 * 
 * @apiSuccess {Object} modifiy a specific category 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {"_id": "5bd70c6172c3a20016a55a2e","name": "City","description": "Town, only bigger!","__v": 0}
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
 * @api {delete} /category/:id delete a specific category
 * @apiName DeleteCategory
 * @apiGroup Category
 *
 * @apiParam {Number} id id of the category you want to delete. this category must not to be defined in a sound
 * 
 * @apiSuccess {String} Success 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * Success
 */
router.delete('/:id', function (req, res, next) {

    Sound.find({categories: req.params.id }).exec(function (err, sound) {
        if (err) {
            err.status = 400
            return next(err)
        }
        if(!sound){
            Category.findByIdAndRemove(req.params.id).exec(function (err, user) {
                if (err) {
                    res.status(404).send('Category not found')
                    return next(err)
                }
        
                res.status(200).send({message: "Category with ID : " + req.params.id + " successfully deleted"})
            })
        }
        else{
            res.status(200).send({message: "Category with ID : " + req.params.id + " is defined in some sounds. You can't delete it"})
        }


    })
})

module.exports = router