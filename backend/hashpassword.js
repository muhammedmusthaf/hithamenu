// hashPassword.js
import bcrypt from "bcrypt";

const plainPassword = "prakash@123"; // replace with your desired password

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
    return;
  }
  console.log("Hashed password:", hash);
});
