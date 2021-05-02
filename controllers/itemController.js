const Item = require('./../models/itemModel');

exports.getAllItems = async (req, res) => {
  try {
    // Building the query
    // 1A)Filtering
    const queryObj = { ...req.query }; // using destructring to get the queries data

    const excludedFields = ['page', 'sort', 'limit', 'fields']; // Filtering queries
    excludedFields.forEach((el) => delete queryObj[el]); // Excluding FIltering queries fields

    // 1B) Advanced Filtering // TODO:  Not working
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    ); // Reqular expression to put the mongoDB $ sign

    let query = Item.find(queryObj); // Getting the query without the filtering queries deleted in line 9

    // 2) Sorting : a filtering query app
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' '); // To allow multiple sort conditions with (,)
      query = query.sort(sortBy);
    }

    // Execute the query after creating it in the above lines
    const items = await query;
    // Send responce
    res.status(200).json({
      status: 'success',
      results: items.length,
      data: {
        items,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
    });
  }
};

exports.getItem = async (req, res) => {
  try {
    console.log(req.params.id);
    const item = await Item.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        item,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
    });
  }
};

exports.createItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        item: newItem,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateItem = async (req, res) => {
  // TODO: FIX
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // the new updated document is the one to be returend
      runValidators: true,
    });
    // console.log(item);
    res.status(200).json({
      status: 'success',
      data: {
        item,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
