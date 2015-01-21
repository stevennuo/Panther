var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var timestamp = require('mongoose-timestamp');

var RoomSchema = require('./room');
var ActivityStatusSchema = require('./activity_status');
var TaskStatusSchema = require('./task_status');
var ProblemHistorySchema = require('./problem_history');

var TaskRecordByUserSchema = new Schema({
    user: { type: ObjectId, ref: 'User' },
    task: { type: ObjectId, ref: 'Task' },
    activityStatus: [ActivityStatusSchema],
    taskStatus: [TaskStatusSchema],
    problemHistory: [ProblemHistorySchema]
});

var TaskRecordByRoomSchema = new Schema({
    // 此为在最近一次合并时的room doc的备份，在每次合并时都需要检查room的构成(此处指人员组成)是否发生变化，比如有人退出班级或者新加入班级，
    // 如果发生构成变化，为保证数据的准确性，此时需要抛弃增量结果，完全从头，重新计算。TODO：check PRD
    // 同时鉴于上述描述，虽然此表的索引是room._id和taskId,但是并不能简单的从各表中直接使用roomId和taskId检索出数据，
    // 而是应该先取出当前room的所有userid，然后去表中用所有的userId搭配taskId找出数据并进行组装

    // 换句话说，基于目前的数据结构，由后端数据保证班级-用户纬度的可靠性，而由前端进行课程纬度(taskId activityId problemId)的过滤
    room: {
        _id: { type: ObjectId, ref: 'Room' },
        users: [
            { type: ObjectId, ref: 'User' }
        ]
    },
    task: { type: ObjectId, ref: 'Task' },
    activityStatus: [ActivityStatusSchema],
    taskStatus: [TaskStatusSchema],
    problemHistory: [ProblemHistorySchema]
});

var BooleanStat = {
    value: Boolean,
    count: Number
}

var BooleanUserStat = {
    value: Boolean,
    array: [
        { type: ObjectId, ref: 'User' }
    ]
}

var StringArrayStat = {
    value: String,
    count: Number
}

var TaskRecordStatByUserSchema = new Schema({
    user: { type: ObjectId, ref: 'User' },
    task: { type: ObjectId, ref: 'Task' },
    activityStatus: [
        {
            count: Number,
            activity: { type: ObjectId, ref: 'Activity' },
            isPassed: [BooleanStat],
            problems: [BooleanStat],
            videos: [BooleanStat]
        }
    ],
    taskStatus: [
        {
            count: Number,
            isPassed: [BooleanUserStat],
            star: Number
        }
    ],
    problemHistory: [
        {
            count: Number,
            isCorrect: [BooleanStat],
            userAnswer: [StringArrayStat],
            problem: { type: ObjectId, ref: 'Problem'}
        }
    ],
    timestamp: Date
});

var TaskRecordStatByRoomSchema = new Schema({
    // 请参看 TaskRecordByRoomSchema
    room: {
        _id: { type: ObjectId, ref: 'Room' },
        users: [
            { type: ObjectId, ref: 'User' }
        ]
    },
    task: { type: ObjectId, ref: 'Task' },
    activityStatus: [
        {
            count: Number,
            activity: { type: ObjectId, ref: 'Activity' },
            isPassed: [BooleanStat],
            problems: [BooleanStat],
            videos: [BooleanStat]
        }
    ],
    taskStatus: [
        {
            count: Number,
            isPassed: [BooleanStat],
            star: Number
        }
    ],
    problemHistory: [
        {
            count: Number,
            isCorrect: [BooleanStat],
            userAnswer: [StringArrayStat],
            problem: { type: ObjectId, ref: 'Problem'}
        }
    ]
});

mongoose.model('TaskRecordByUser', TaskRecordByUserSchema);
mongoose.model('TaskRecordByRoom', TaskRecordByRoomSchema);
mongoose.model('TaskRecordStatByUser', TaskRecordStatByUserSchema);
mongoose.model('TaskRecordStatByRoom', TaskRecordStatByRoomSchema);