var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var timestamp = require('mongoose-timestamp');

var TaskStatusSchema = new Schema({
    isPassed: {
        type: Boolean,
        default: false
    },
    star: Number,
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
    task: { type: ObjectId, ref: 'Task' }
}, { collection: 'task_status' });
TaskStatusSchema.plugin(timestamp);

mongoose.model('TaskStatus', TaskStatusSchema);
module.exports = TaskStatusSchema;
