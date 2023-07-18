// Create web server
var express = require('express');
var router = express.Router();
var db = require('../db');
var ObjectId = require('mongodb').ObjectId;

// Get all comments
router.get('/', function(req, res, next) {
    db.get().collection('comments').find().toArray(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
});

// Get one comment
router.get('/:id', function(req, res, next) {
    db.get().collection('comments').findOne({_id: ObjectId(req.params.id)}, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    });
});

// Create a new comment
router.post('/', function(req, res, next) {
    var comment = {
        text: req.body.text,