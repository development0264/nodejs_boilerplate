const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsersSchema = new Schema({
    name: String,
    email: String,
    password: String,
});
var User = mongoose.model('users', UsersSchema);

module.exports = User
