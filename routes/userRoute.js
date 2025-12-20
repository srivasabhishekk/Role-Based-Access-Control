const express = require('express')
router = express.Router()
const verifyToken = require('../middlewares/authMiddleware')
const authorizedRole = require('../middlewares/userRole')

router.get('/admin', verifyToken, authorizedRole("admin"), (req, res)=>{
    res.json({message : "Welcome Admin"})
} )

router.get('/manager', verifyToken, authorizedRole("admin, manager"), (req, res)=>{
    res.json({message : "Welcome Manager"})
} )

router.get('/user', verifyToken, authorizedRole("admin", "manager", "user"), (req, res)=>{
    res.json({message : "Welcome User"})
} )

module.exports = router