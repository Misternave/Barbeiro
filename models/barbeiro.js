const mongoose = require("mongoose");
const Schema = mongoose.Schema;


///Schema///

const barbeiroSchema = new Schema({
    name: { 
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    id_: {
        type: Number,
        required: true
    },
    hour:{
        type: String,
        required: true
    },
    idBarbeiro:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    email:{
        type: String,
        required: true
    }
    
}, { timestamps: true });


const Barbeiro = mongoose.model("Barbeiro", barbeiroSchema);

module.exports = Barbeiro;
