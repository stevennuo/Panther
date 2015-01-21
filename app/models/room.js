/**
 *
 * @authors HellMagic
 * @version 1.0
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    flag: {
        type: String,
        required: true
    },
    grade: String,
    users: [
        { type: ObjectId, ref: 'User' }
    ],
    schools: [
        { type: ObjectId, ref: 'School' }
    ],
    disabled: {
        type: Boolean,
        default: false
    }
});

mongoose.model('Room', RoomSchema);
module.exports = RoomSchema;