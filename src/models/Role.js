const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  roleId: { type: String, required: true, unique: true },
  roleName: { type: String, required: true }
});

module.exports = mongoose.model('Role', RoleSchema);
