const Employee = require('../models/employee')

const employeeController = {};

employeeController.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
}

employeeController.createEmployee = async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    })
    await employee.save();
    res.json({
        'status':'Employee saved'
    });
}

employeeController.getEmployee = async function(req, res) {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
}

employeeController.updateEmployee = async function(req, res) {
    //otro metodo
    const { id } = req.params;
    const employee = {
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary
    }
    await Employee.findByIdAndUpdate(id, {$set: employee}, {new : true});
    res.json({
        'status':'Employee updated'
    })
}

employeeController.deleteEmployee = async function(req, res) {
    await Employee.findByIdAndRemove(req.params.id);
    res.json({
        'status':'Employee deleted'
    });
}

module.exports = employeeController;