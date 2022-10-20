const {Schema, model} = require('mongoose')

const CommentSchema = new Schema({
    text: {type: String, required: true},
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Comment', CommentSchema);