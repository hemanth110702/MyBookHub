import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Signup method
userSchema.statics.signup = async function (email, password) {
  validateInputs(email, password);

  const passwordRequirements = getPasswordRequirements(password);
  if (Object.keys(passwordRequirements).length > 0) {
    throw new Error(getPasswordRequirementsErrorMessage(passwordRequirements));
  }

  if (await this.findOne({ email })) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

// Function to validate email and password inputs
function validateInputs(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
}

// Function to check password requirements
function getPasswordRequirements(password) {
  const requirements = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  };

  const missingRequirements = {};

  if (!validator.isLength(password, { min: requirements.minLength })) {
    missingRequirements.minLength = `Password must be at least ${requirements.minLength} characters long.`;
  }
  if (!/[a-z]/.test(password)) {
    missingRequirements.minLowercase = `Password must contain at least ${requirements.minLowercase} lowercase letter(s).`;
  }
  if (!/[A-Z]/.test(password)) {
    missingRequirements.minUppercase = `Password must contain at least ${requirements.minUppercase} uppercase letter(s).`;
  }
  if (!/\d/.test(password)) {
    missingRequirements.minNumbers = `Password must contain at least ${requirements.minNumbers} number(s).`;
  }
  if (
    !validator.isStrongPassword(password, {
      minSymbols: requirements.minSymbols,
    })
  ) {
    missingRequirements.minSymbols = `Password must contain at least ${requirements.minSymbols} symbol(s).`;
  }

  return missingRequirements;
}

// Function to construct error message for missing password requirements
function getPasswordRequirementsErrorMessage(passwordRequirements) {
  const missingMessages = Object.values(passwordRequirements);
  return `Password does not meet the following requirements: ${missingMessages.join(
    ", "
  )}`;
}

export const User = mongoose.model("user", userSchema);
