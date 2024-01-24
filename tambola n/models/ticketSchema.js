const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
    uniqueId: {
        type: String
    }, 
    tickets: {
        type: Object
    }
})

TicketSchema.index({uniqueId: 1})

module.exports = mongoose.model('Ticket', TicketSchema)