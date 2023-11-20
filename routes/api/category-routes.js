const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
router.get('/', async (req, res) => {

  try {
   const categorydata = await Category.findAll({
    include: [{model: Product},]
   });
   res.status(200).json(categorydata);
  } catch {
 res.status(500).json(err);
  }
});


  // find one category by its `id` value

router.get('/:id', async (req, res) => {

  try {
const categorybyId = await Category.findByPk(req.params.id, {
  include: [{model: Product}]
});
if (!categorybyId) {
  res.status(404).json({messsage: 'No category found with that id buddy!'})
  return;
};
res.status(200).json(categorybyId);
  } catch (err) {
  res.status(500).json(err);
  }
});


  // create a new category

router.post('/', async (req, res) => {
  try {
   const newcategory = await Category.create(req.body);
   res.status(200).json(newcategory);
  } catch (err) {
   res.status(400).json(err);
  }
});


  // update a category by its `id` value

router.put('/:id', async (req, res) => {
  try {
  const updatedCategory = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  });

  if (!updatedCategory) {
    res.status(404).json({messsage: 'No category found with that ID buddy!'})
    return;
  };
  res.status(200).json(updatedCategory);
  } catch (err) {
  res.status(500).json(err);
  }
});


  // delete a category by its `id` value
router.delete('/:id', async (req, res) => {

  try {
  const deletedCategory = await Category.destroy({
    where: {
    id: req.params.id,
    }
  });

  if (!deletedCategory) {
    res.status(404).json({message: 'No category found with the provided ID '})
    return;
  };
  res.status(200).json(deletedCategory);
  } catch (err) {
  res.status(500).json(err);
  }
});

module.exports = router;
