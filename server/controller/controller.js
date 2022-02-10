var UserDb = require('../model/model');

//Create and Save User
exports.create = (req, res) => {

    //validate the request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    //New User
    const user = new UserDb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in the database
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect("/add_user")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some Error Occured while creating a user"
            });
        });
}

//retrieve and return all users or a single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        UserDb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `User not found with id ${id}` })
                } else {
                    res.send(data)
                }
            }).catch(err => {
                res.status(500).send({ message: `Error while retrieving user with id ${id}` })
            })
    } else {

        UserDb.find()
            .then(user => {
                res.send(user)
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some Error Occured while retrieving  users"
                });
            });


    }
}

//Update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update is cannot be empty" })
    }

    const id = req.params.id;
    UserDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot Update user with ${id}. Maybe user not found`
                })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error Update User Information"
            })
        })

}

//Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    UserDb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res
                    .status(400)
                    .send({ message: `Cannot Delete with id ${id}` })
            } else {
                res
                    .send({ message: "User was deleted Successfully!" })
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: `Could not delete User with id ${id}` })
        });

}