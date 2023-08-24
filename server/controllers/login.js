import User from "../models/user.js";

/* REGISTER USER */
export const login = async (req, res) => {
  console.log("hello login");
  try {
    const { userName } = req.body;

    const user = await User.findOne({userName });

    if (!user) {
      const newUser = new User({
        userName,
      });
      const savedUser = await newUser.save();
      console.log("no user name");
      res.status(201).json(savedUser);
    } else {
      console.log("there is user name");
      res.status(201).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
console.log("its open");
