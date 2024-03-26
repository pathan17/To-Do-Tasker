const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema(
    {
        tittle:{type:'string'},
        description:{type:'string'},
        email:{type:'string'},
        status:{type:'string'},
        createDate:{type:'string', default:Date.now()}
    },
    { versionKey:false }
)

const TodoModels = mongoose.model('todos', TodoSchema)

module.exports = TodoModels;