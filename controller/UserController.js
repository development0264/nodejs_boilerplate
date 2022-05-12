// // CRUD

// // GET User
// // INDEX

// // GET -  localhost:2000/user

const User = require("../models/User.js");

const index = async (req, res) => {
    try {
        console.log('Hiiiii List');
        const users = await User.find({});
        console.log("users => ", users)
        res.status(200).json({ message: "SHT", users: users });
    } catch (error) {
        console.log("Errr ===> ", error);
    }
}

// CREATE
const create = async (req, res) => {
    console.log("req body ===> ", req.body)
    const { name, email } = req.body
    try {
        User.create({ name: name, email: email }, function (err) {
            if (err) return handleError(err)
            else res.status(201).json({ message: "User Created Successfull" })
            // saved!
        })
    } catch (error) {
        console.log("---error----", error);
    }
}

// // GetById - localhost:2000/user/:id
// // Get user details
// export const GetById = async (req, res) => {
//     try {

//     } catch (error) {
//         res
//     }
// }

module.exports = {
    index,
    create
}