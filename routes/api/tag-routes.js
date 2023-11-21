const router = require("express").Router();
const { json } = require("sequelize");
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// GET all tags
router.get("/", async (req, res) => {
  try {
    const Tagdata = await Tag.findAll({
      include: [{ model: Product }, { model: ProductTag }],
    });
    res.status(200).json(Tagdata);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }  
});

// find a single tag by its `id`
router.get("/:id", async (req, res) => {
  try {
    const tagdatabyid = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: ProductTag }],
    });

    if (!tagdatabyid) {
      res.status(404).json({ message: "No tag found with that id hommie" });
      return;
    }
    res.status(200).json(tagdatabyid);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
  
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }  
});

// update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedTag) {
      res.status(404).json({ message: "No tag found with that id hommie!!" });
      return;
    }
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deletedTagdata = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTagdata) {
      res.status(404).json({ message: "NO Tag found with that id Hommie" });
      return;
    }
    res.status(200).json(deletedTagdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
