const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    // find all categories
    const allCategories = await Category.findAll({
      // be sure to include its associated Products
      include: [{model: Product}]
    });

    if(allCategories.length){
      res.status(200).json(allCategories);
    } else  {
      res.status(404).json({message: "Something went wrong or there are no categories."})
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    // find one category by its `id` value
    const oneCategory = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{model: Product}]
    });

    if(oneCategory){
      res.status(200).json(oneCategory);
    } else {
      res.status(404).json({message: "Sorry, but there was no category found with that ID."})
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => res.status(200).json(category))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where:  {
      id: req.params.id
    }
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((category) => res.status(200).json(category))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
