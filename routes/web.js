const express = require('express')
const CourseController = require('../controllers/CourseController')
const FrontController = require('../controllers/FrontendController')
const router =express.Router()
const checkuserauth  = require('../middleware/auth')
const islogin  = require('../middleware/islogin')
const AdminController = require('../controllers/AdminController')


// front controller
router.get("/",islogin,FrontController.login)
router.get("/register",FrontController.register)
router.post('/insert',FrontController.insert)
router.get("/dashbord",checkuserauth,FrontController.dashbord)
router.post("/verify_login",FrontController.verify_login)
router.get("/logout",FrontController.logout)
router.get('/profile',checkuserauth,FrontController.profile)
router.post('/change_password',checkuserauth,FrontController.change_password)
router.post('/profile_update',checkuserauth,FrontController.profile_update)


// course controller

router.post('/course_insert',checkuserauth,CourseController.course_insert)
router.get('/course_display',checkuserauth,CourseController.course_display)
router.get('/course_view/:id',checkuserauth,CourseController.course_view)
router.get('/course_edit/:id',checkuserauth,CourseController.course_edit)
router.post('/course_update/:id',checkuserauth,CourseController.course_update)
router.get('/course_delete/:id',checkuserauth,CourseController.course_delete)

// admin controller
router.get('/admin/dashbord',checkuserauth,AdminController.dashbord)
router.get('/admin_view/:id',checkuserauth,AdminController.admin_view)
router.get('/admin_edit/:id',checkuserauth,AdminController.admin_edit)
router.post('/admin_update/:id',checkuserauth,AdminController.admin_update)
router.get('/admin_delete',checkuserauth,AdminController.admin_delete)
router.post('/update_approve/:id',checkuserauth,AdminController.update_approve)

module.exports = router
