const mongoose= require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    confirmpwd: {
        type: String,
        require: true
    }
})

// this is collections
const Register =new mongoose.model("Registers", userSchema);

module.exports = Register;