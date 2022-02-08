const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "password should be greater than or equal 6 character!"]
    },
    image: {
      type: String,
      default: "",
      select: false
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "merchant", "user"]
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  const hashPassword = await bcrypt.hash(user.password, 10);
  this.password = hashPassword;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = mongoose.model("User", UserSchema);
