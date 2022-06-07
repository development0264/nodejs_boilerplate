const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

// CREATE || REGISTER
const create = async (req, res) => {
    const { name, email, password } = req.body
    try {
        if (name && email && password) {
            // encrypt the password using bcrypt.hash function with salt Rounds = 10
            const hashedPwd = await bcrypt.hash(password, 10);

            User.create({ name: name, email: email, password: hashedPwd }, function (err) {
                if (err) return res.status(400).json({ message: err.message })
                else res.status(201).json({ message: `User ${name} Created Successfully` })
            })
        } else res.status(400).json({ message: "name, email and password required" })
    } catch (error) {
        console.log("---error----", error);
    }
}

// AUTH
const handleLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        if (email && password) {
            // find user with given email
            User.find({ 'email': email }, async function (err, foundUser) {
                const user = foundUser[0]
                if (err) return res.status(400).json({ message: err.message })
                else if (!user) return res.status(401).json({ message: `No user found with ${email}` })
                else {
                    // evaluate password, matching encrypted and entered password
                    const match = await bcrypt.compare(password, user.password); // If true password = user.password
                    if (match) {
                        // creating JWT here with user's name info and 10min expiration time.
                        const accessToken = jwt.sign(
                            { "name": user.name },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '10m' }
                        )
                        res.status(200).json({
                            'success': `${user.name} login success`,
                            'accessToken': accessToken
                        });
                    } else {
                        res.status(401).json({ message: `Invalid email or password` });
                    }
                }
            });
        } else res.status(400).json({ message: "email and password required" })
    } catch (error) {
        console.log("---error----", error);
    }
}

// READ ALL
const getAll = async (req, res) => {
    try {
        const users = await User.find({}).select('-__v');
        return res.status(200).json({ message: `Total available users ${users.length}`, users: users });
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
    updateUser,
    handleLogin
}