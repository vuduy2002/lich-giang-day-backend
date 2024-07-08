const Role = require('../models/Role');

const createRole = async (req, res) => {
  const role = new Role(req.body);
  try {
    const savedRole = await role.save();
    res.status(201).json(savedRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await Role.findOne({ roleId: req.params.id });
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const updatedRole = await Role.findOneAndUpdate({ roleId: req.params.id }, req.body, { new: true });
    if (!updatedRole) return res.status(404).json({ message: 'Role not found' });
    res.json(updatedRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const deletedRole = await Role.findOneAndDelete({ roleId: req.params.id });
    if (!deletedRole) return res.status(404).json({ message: 'Role not found' });
    res.json({ message: 'Role deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
