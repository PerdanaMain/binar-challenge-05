const { Cars } = require("../models");

const loadCars = async (req, res) => {
  const data = await Cars.findAll({});
  return res.render("list", {
    layout: "layouts/main-layout",
    title: "List Car",
    data,
  });
};

const loadView = async (req, res) => {
  const id = req.params.id;
  const size = req.params.size;
  if (size) {
    const data = await Cars.findAll({
      where: { size },
    });
    return res.render("list", {
      layout: "layouts/main-layout",
      title: "List Car",
      data,
    });
  } else if (id) {
    const data = await Cars.findOne({
      where: { id },
    });
    return res.render("update", {
      layout: "layouts/main-layout",
      title: "Update Car",
      data,
      info: undefined,
    });
  } else {
    return res.render("create", {
      layout: "layouts/main-layout",
      title: "Create New Car",
      info: undefined,
    });
  }
};

const createCar = async (req, res) => {
  const save = Cars.create({
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    type: req.body.type,
    image: req.file.filename,
  });
  return res.render("create", {
    layout: "layouts/main-layout",
    title: "Create New Car",
    info: "Create Car Successfully",
  });
};

const updateCar = async (req, res) => {
  const updated = await Cars.update(
    {
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      type: req.body.type,
    },
    {
      where: { id: req.params.id },
    }
  );
  return res.render("update", {
    layout: "layouts/main-layout",
    title: "Update Car",
    data: updated,
    info: "Update Car Succesfully",
  });
};

const deleteCar = async (req, res) => {
  const data = await Cars.destroy({ where: { id: req.params.id } });
  return res.render("delete", {
    layout: "layouts/main-layout",
    title: "Delete Car",
    info: "Delete Car Succesfully",
  });
};
module.exports = {
  loadCars,
  loadView,
  createCar,
  updateCar,
  deleteCar,
};
