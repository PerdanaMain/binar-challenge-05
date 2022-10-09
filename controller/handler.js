const { Cars } = require("../models");

const loadCars = async (req, res) => {
  const search = req.query.s;
  console.log(search);
  if (search) {
    console.log("program lewat sini");
    const data = await Cars.findAll({
      where: { name: search },
    });
    if (data.length == 0) {
      return res.render("404", {
        layout: "layouts/main-layout",
        title: "Not Found",
        data,
        info: "404 | Data Not Found",
      });
    } else {
      return res.render("list", {
        layout: "layouts/main-layout",
        title: "List Car",
        data,
      });
    }
  } else {
    const data = await Cars.findAll({});
    return res.render("list", {
      layout: "layouts/main-layout",
      title: "List Car",
      data,
    });
  }
};

const viewSearch = async (req, res) => {
  const data = await Cars.findAll({
    where: { size: req.params.size },
  });
  return res.render("list", {
    layout: "layouts/main-layout",
    title: "List Car",
    data,
  });
};

const viewCreate = (req, res) => {
  return res.render("create", {
    layout: "layouts/main-layout",
    title: "Create New Car",
    info: undefined,
  });
};

const viewEdit = async (req, res) => {
  const id = req.params.id;
  const data = await Cars.findOne({
    where: { id },
  });
  return res.render("update", {
    layout: "layouts/main-layout",
    title: "Update Car",
    data,
    info: undefined,
  });
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
  viewEdit,
  viewCreate,
  viewSearch,
  createCar,
  updateCar,
  deleteCar,
};
