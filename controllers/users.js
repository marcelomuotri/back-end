const userService = require("../services/usersService");

const userPost = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const { user, token } = await userService.createUser(
      name,
      email,
      password,
      role
    );
    res.json({
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "El usuario no se pudo crear",
      error,
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await userService.authenticateUser(email, password);
    res.json({
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Inicio de sesión incorrecto",
    });
  }
};

module.exports = {
  userPost,
  userLogin,
};
