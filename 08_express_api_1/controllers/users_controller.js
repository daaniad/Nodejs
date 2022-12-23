import { USERS_BBDD } from "../bbdd.js";

const controller = {};

controller.authAccDetails = async (req, res) => {
  const { guid } = req.params;
  const user = USERS_BBDD.find((user) => user.guid === guid);
  if (!user) return res.status(404).send();
  res.send({ "color de ojos": user.eyeColor, edad: user.age });
};

controller.authUpdateUser = async (req, res) => {
  const { guid } = req.params;
  const { age } = req.body;
  const user = USERS_BBDD.find((user) => user.guid === guid);

  if (!age) return res.status(400);

  if (!user) return res.status(404).send();

  user.age = age;
  res.send(user);
};

export default controller;
