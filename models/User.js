const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// include this to avoid error: OverwriteModelError: Cannot overwrite `User` model once compiled.
delete mongoose.connection.models["User"];

const UserSchema = new Schema({
  email: { type: String, required: true },
  issuer: { type: String, required: true, unique: true }, // did:ethr:public_address
});

module.exports = mongoose.model("User", UserSchema);
