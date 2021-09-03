const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class RegisterController {
    //@route POST /api/auth/login
    //@desc create new user
    //@access public
    async login(req, res, next) {
        try {
            // validate username and password
            if (!req.body.name || !req.body.password) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect name or password",
                });
            }
            // check user in database
            let { name, password } = req.body;
            let matchUser = await user.findOne({ name: req.body.name });

            if (matchUser) {
                // compare password
                let matchPassword = await bcrypt.compare(
                    password,
                    matchUser.password
                );
                if (matchPassword) {
                    // successful all
                    let token = jwt.sign(
                        { id: matchUser._id },
                        process.env.ACESS_TOKEN_SECRET
                    );
                    return res.json({
                        success: true,
                        message: "Connect successfully!",
                        token: token,
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Incorrect name or password",
                    });
                }
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect name or password",
                });
            }
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({
                sucess: false,
                message: "Connect falure!",
            });
        }
    }
    //@route POST /api/auth/register
    //@desc login
    //@access public
    async register(req, res, next) {
        try {
            // validate username and password
            if (!req.body.name || !req.body.password) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect name or password",
                });
            }
            // create a new user
            let hashPassword = await bcrypt.hash(req.body.password, saltRounds);
            let name = req.body.name;
            let newUser = new user({
                name: name,
                password: hashPassword,
                role: "user",
            });
            await newUser.save();
            //create access token
            let token = jwt.sign(
                { id: newUser._id },
                process.env.ACESS_TOKEN_SECRET
            );
            return res.json({
                success: true,
                message: "Created new user successfully!",
                token: token,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                sucess: false,
                message: "Connect falure!",
            });
        }
    }
}

module.exports = new RegisterController();
