
const express = require('express');
const router = express.Router();
const UsersController = require("../controller/UsersController");
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware');
const TodoController = require('../controller/TodoController')



// users api starts
router.post('/registration', UsersController.Registration)
router.get("/login", UsersController.Login)

router.post("/update-profile", AuthVerifyMiddleware,UsersController.UpdateProfile)
router.get('/profile-Detels', AuthVerifyMiddleware, UsersController.profileDetels )
router.get('/emailVerify/:email', UsersController.emailVerify)
router.get('/OtpVerify/:email/:otp' , UsersController.OtpVerify)
router.post('/resetPassword', UsersController.resetPassword)
// users api end


// users Todo api router start
router.post('/createTodo', AuthVerifyMiddleware, TodoController.createTodo)
router.get('/updateTodo/:id/:status', AuthVerifyMiddleware, TodoController.updateTodo )
router.get('/deleteTodo/:id', AuthVerifyMiddleware, TodoController.deleteTodo)
router.get('/TodoListStatus/:status', AuthVerifyMiddleware, TodoController.TodoListStatus)
router.get('/AllTodoListCheck', AuthVerifyMiddleware, TodoController.AllTodoListCheck)

// users Todo api router end








module.exports = router








