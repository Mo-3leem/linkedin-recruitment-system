const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.register = async (req, res) => {
  try {
    console.log("Incoming Register Request:", req.body);

    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Unauthenticated" });

    const token = createToken(user);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
