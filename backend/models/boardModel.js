import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
    title: String,
}, {timestamps:true})

const Board =  mongoose.models.Board || mongoose.model('Board', boardSchema);


export default Board;