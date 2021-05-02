const express = require('express');
const Item = require('../models/itemModel');
const router = express.Router();

const itemController = require('./../controllers/itemController');

// Configuring the url and calling the right http method from the itemController module
router
  .route('/')
  .get(itemController.getAllItems)
  .post(itemController.createItem);

router
  .route('/:id')
  .get(itemController.getItem)
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = router;
