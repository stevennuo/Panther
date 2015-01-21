var _ = require('underscore');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var ActivityStatus = mongoose.model('ActivityStatus');
var ProblemHistory = mongoose.model('ProblemHistory');
var TaskStatus = mongoose.model('TaskStatus');


exports.fetchStarsByUserTasks = function (req, res) {
    var user = ObjectId(req.body.user);
    var tasks = _.map(req.body.tasks, function (i) {
        return ObjectId(i)
    });
    TaskStatus.find({user: user, task: {$in: tasks}}, function (err, taskStatus) {
        if (err || !taskStatus)
            return res.status(500).json({ error: 'records fetchStarsByUserTasks error' });
        res.status(200).json(taskStatus);
    });
};


exports.fetchTaskStatByUserTasks = function (req, res) {
    var user = ObjectId(req.body.user)
    var tasks = req.body.tasks.map(ObjectId);
    ActivityStatus.find({user: user, task: {$in: tasks}}, {isPassed: 1, videos: 1},
        function (err, ActivityStatus) {
            if (err || !ActivityStatus)
                return res.status(500).json({ error: 'records fetchActivityStatByUserTasksx error' });

            // ActivityStatus
            ProblemHistory.aggregate()
                .match({user: user})
                .match({tasks: {$in: tasks}})
                .group({_id: {activity: '$activity', task: '$task'}, count: {$sum: 1},
                    count: {$sum: {
                        $cond: {if: {isPassed: true}, then: 1, else: 0}
                    }}})
                .exec(function (err, res) {
                    console.log(res);
                });
        });
};


