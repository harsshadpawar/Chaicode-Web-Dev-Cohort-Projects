const registerUser = async (req, res) => {
  res.send("registered");
};

const login = async (req, res) => {
  res.send("loggedin"); //here we write business logic.
};

export { registerUser };
export { login };
