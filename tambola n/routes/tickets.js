const router = require('express').Router()
const { createTambolaTickets, getTambolaTicketsById } = require('../controllers/ticketsController')
const verifyJWT = require('../middlewares/verifyJWT')


router.post('/create-tickets', verifyJWT , createTambolaTickets)

router.get('/get-tickets/:id', verifyJWT , getTambolaTicketsById)


module.exports = router