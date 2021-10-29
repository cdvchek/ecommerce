const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    // find all tags
    const allTags = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{model: Product}]
    });

    if(allTags){
      res.status(200).json(allTags);
    } else {
      res.status(404).json({message: "Something went wrong or there are no tags."})
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    // find a single tag by its `id`
    const oneTag = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product
      include: [{model: Product}]
    });

    if(oneTag){
      res.status(200).json(oneTag);
    } else {
      res.status(404).json({message: "Sorry, but there was no tag found with that ID."})
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
    Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where:  {
      id: req.params.id
    }
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
