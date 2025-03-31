import { asyncHandler } from "../utils/async-handler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  /*
  //validation
  if (!email || !password || !username) {
  }
  if (password.length < 8) {
  }

  //method
  const isValidates = validateMe(password)
  */
  registrationValidations(req.body);
});

export { registerUser };
