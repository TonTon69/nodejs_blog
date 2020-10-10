const Course = require('../models/Course');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}).sortable(req),
            Course.countDocumentsDeleted(),
        ])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    // [GET] /me/stored/news
    storedNews(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('me/stored-news', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .sortable(req)
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
    storedUsers(req, res, next){   
        User.find({}).sortable(req)     
            .then(users=>{
                res.render("me/stored-users",{
                    users: users,
                });
            })
    }
}
module.exports = new MeController();