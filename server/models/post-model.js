const {Schema, model} = require('mongoose')

const PostSchema = new Shema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    like: {type: Number, default: 0},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Post', PostSchema);