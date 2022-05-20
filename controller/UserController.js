const User = require("../models/User.js");

// CREATE
const create = async (req, res) => {
    const { name, email } = req.body
    try {
        if(name && email){
            User.create({ name: name, email: email }, function (err) {
                if (err) return res.status(400).json({ message: err.message })
                else res.status(201).json({ message: "User Created Successfully" })
            })
        } else res.status(400).json({ message: "Somethings wrong !!" })
    } catch (error) {
        console.log("---error----", error);
    }
}

// READ ALL
const getAll = async (req, res) => {
    try {
        const users = await User.find({}).select('-__v');
        res.status(200).json({ message: `Total available users ${users.length}`, users: users });
    } catch (error) {
        console.log("Errr ===> ", error);
    }
}

// DELETE BY ID
const deleteUser = async (req, res) => {
    console.log("req dele user", req.params.id)
    try {
        User.deleteOne({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json({ message: err.message })
            else res.status(200).json({ message: "User Deleted Successfully" })
        })
    } catch (error) {
        console.log("Errr ===> ", error);
    }
}

// UPDATE BY ID
const updateUser = async (req, res) => {
    // req.body = { name, email }
    const id = req.params.id
    try {
        User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update User with id=${id} !`
                    });
                } else res.status(200).json({ message: "User Updated Successfully" })
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating User with id=" + id
                });
            });

    } catch (error) {
        console.log("Errr ===> ", error);
    }
}

module.exports = {
    getAll,
    create,
    deleteUser,
    updateUser
}