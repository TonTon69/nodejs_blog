const User = require('../models/User');

//middalware
class UserController {
    register(req, res) {
        res.render('user/register');
    }
    login(req, res) {
        res.render('user/login');
    }
    signin(req, res, next) {
        const { username, password } = req.body;
        User.findOne({ username: username }).then((savedUser) => {
            if (!savedUser) {
                res.render('user/login', {
                    errors: ['Người dùng không tồn tại!'],
                    values: req.body,
                });
                return;
            }
            if (savedUser.password !== password) {
                res.render('user/login', {
                    errors: ['Mật khẩu không đúng!'],
                    values: req.body,
                });
                return;
            }
            res.cookie('userId', savedUser.id);
            res.redirect('/');
        });
    }
    signup(req, res, next) {
        const { username, password } = req.body;
        const errors = [];
        if (!username) {
            errors.push('Vui lòng nhập tên!');
        }
        if (!password) {
            errors.push('Vui lòng nhập mật khẩu!');
        }
        if (errors.length) {
            res.render('user/register', {
                errors: errors,
                values: req.body,
            });
            return;
        }
        // User.findOne({ username: username })
        //   .then((savedUser) => {
        //     if (savedUser) {
        //       return res.status(200).json({ error: "Người dùng này đã tồn tại!" });
        //     }
        //     bcrypt.hash(password, 12).then((hashedpassword) => {
        //       const user = new User({
        //         username,
        //         password: hashedpassword,
        //       });
        //       user
        //         .save()
        //         .then((user) => {
        //           //   res.json({ message: "Đăng ký thành công" });
        //           res.redirect("/user/login");
        //         })
        //         .catch((err) => {
        //           console.log(err);
        //         });
        //     });
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
    }
}

module.exports = new UserController();
