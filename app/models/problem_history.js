/**
 *
 * @authors HellMagic
 * @version 1.0
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ProblemHistorySchema = new Schema({
    isCorrect: Boolean,
    userAnswer: [String],
    user: { type: ObjectId, ref: 'User' },
    rooms: [
        { type: ObjectId, ref: 'Room' }
    ],
    chapter: { type: ObjectId, ref: 'Chapter' },
    topic: { type: ObjectId, ref: 'Topic' },
    task: { type: ObjectId, ref: 'Task' },
    activity: { type: ObjectId, ref: 'Activity' },
    problem: { type: ObjectId, ref: 'Problem'},
    schools: { type: ObjectId, ref: 'School' },
    header: {},
    createdBy: {
        type: Date,
        default: Date.now()
    },
    from: {
        type: String,
        enum: ['pc', 'mobile'],
        default: 'pc'
    }
}, { collection: 'problem_history' });

mongoose.model('ProblemHistory', ProblemHistorySchema);
module.exports = ProblemHistorySchema