var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var timestamp = require('mongoose-timestamp');

var ActivityStatusSchema = new Schema({
    isPassed: {
        type: Boolean,
        default: false
    },
    problems: {
        type: Boolean,
        default: false
    },
    videos: {
        type: Boolean,
        default: false
    },
    from: {
        type: String,
        enum: ['pc', 'mobile'],
        default: 'pc'
    },
    user: { type: ObjectId, ref: 'User'},
    rooms: [
        { type: ObjectId, ref: 'Room'}
    ],
    schools: { type: ObjectId, ref: 'School' },
    chapter: { type: ObjectId, ref: 'Chapter' },
    topic: { type: ObjectId, ref: 'Topic' },
    task: { type: ObjectId, ref: 'Task' },
    activity: { type: ObjectId, ref: 'Activity' }
}, { collection: 'activity_status' });
ActivityStatusSchema.plugin(timestamp);

mongoose.model('ActivityStatus', ActivityStatusSchema);
module.exports = ActivityStatusSchema;