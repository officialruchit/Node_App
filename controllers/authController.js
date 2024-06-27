const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, password, mail } = req.body;
  try {
    let user = await user.findOne({ mail });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      password: hashedPassword,
      mail,
    });
    await user.save();
    res.json({ user });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { mail, password } = req.body;
  try {
    let user = await user.findOne({ mail });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "23h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
  console.log(user.name)
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Current password is incorrect' });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
  
      res.json({ msg: 'Password updated successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };