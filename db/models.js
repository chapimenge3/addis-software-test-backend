const mongoose =  require('./connections')
const mongoosePaginate = require('mongoose-paginate-v2');

// Define Mongo Schema for Employee
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

EmployeeSchema.plugin(mongoosePaginate);

// Define the Model from the schema
const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;