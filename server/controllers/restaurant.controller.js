import Restaurant from "../models/restaurant.model.js";

const restaurantController = {};
//Create and save a new restaurant
restaurantController.create = async (req, res) => {
  const { name, type, imageUrl } = req.body;
  //validate data
  if (!name || !type || !imageUrl) {
    res
      .status(400)
      .send({ message: "Name, Type or ImageUrl can not be empty!" });
    return;
  }

  await Restaurant.findOne({ where: { name: name } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({ message: "Restaurant is already exists!" });
      return;
    }
    const newRestaurant = {
      name: name,
      type: type,
      imageUrl: imageUrl,
    };

    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Something error while creating the restaurant",
        });
      });
  });
};
export default restaurantController;
