const Item = require('./../models/itemModel');
const APIFeatures = require('./../utils/apiFeatures');

// aliasing but not yet uset //TODO:
exports.aliasSales = (req, res, next) => {
  req.query.sort = 'discount';
  next();
};

exports.getAllItems = async (req, res) => {
  try {
    // Execute the query after creating it in the above lines
    const features = new APIFeatures(Item.find(), req.query)
      .filter()
      .sort()
      .paginate();

    const items = await features.query;

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

// aggregation pipeline
exports.getItemStats = async (req, res) => {
  try {
    const stats = await Item.aggregate([
      {
        $match: { price: { $gte: 100 } },
      },
      {
        $group: {
          _id: '$category', // for Men AND Women
          numItems: { $sum: 1 }, // calculate number of items
          avgPrice: { $avg: '$price' }, // calculate average items price
          minPrice: { $min: '$price' }, // calculate minimum items price
          maxPrice: { $max: '$price' }, // calculate maximum items price
        },
      },
      {
        $sort: { avgPrice: 1 }, // 1 for ascending order
      },
      // {
      //   $match: {_id: { $ne:}}
      // }
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
