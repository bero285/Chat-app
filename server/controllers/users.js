import User from "../models/user.js";

/*READ*/
export const getUser = async (req, res) => {
  console.log("hello");
  try {
    const post = await User.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
