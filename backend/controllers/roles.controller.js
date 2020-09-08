const Roles = require('../models/roles')

const rolesController = {};

rolesController.getRoles = async (req, res) => {
    const roles = await Roles.find();
    res.json(roles);
}
module.exports = rolesController;
