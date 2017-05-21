var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/add',function (req,res) {
    res.render('courses/add')
})

router.get('/list',function (req,res) {
    res.render('courses/list')
})
router.get('/category',function (req,res) {
    res.render('courses/category')
})
router.get('/category/add',function (req,res) {
    res.render('courses/category_add')
})
