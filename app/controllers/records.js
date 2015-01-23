var _ = require('underscore');
var async = require('async')
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var ActivityStatus = mongoose.model('ActivityStatus');
var ProblemHistory = mongoose.model('ProblemHistory');
var TaskStatus = mongoose.model('TaskStatus');

// **** 后端尽可能轻，避免冗余数据，尽可能承担统计，尽可能不做拼接和组合    ****
// **** 原则1：后端做aggregate，前端做underscore                      ****
// **** 原则2：对于不同层级但实际相同数据的请求，后端提供细粒度，前端组装   ****

exports.fetchTask = function (req, res) {
    var users = _.map(req.body.users, ObjectId);
    var tasks = _.map(req.body.tasks, ObjectId);

    TaskStatus.aggregate()
        .match({user: {$in: users}, task: {$in: tasks}})
        .project({
            _id: 0,
            star: 1,
            task: 1,
            pass: { $cond: [ "$isPassed", 1, 0 ] },
            user: { $cond: [ "$isPassed", "$user", null ] }
        })
        .group({_id: '$task',
            pass: {$sum: '$pass'}, star: {$sum: '$star'}, passUsers: {$addToSet: '$user'}
        })
        .exec(function (err, results) {
            if (err || !results) {
                res.status(500).json(err);
            } else {
                res.status(200).json(results);
            }
        });
};

exports.fetchActivityStat = function (req, res) {
    var users = _.map(req.body.users, ObjectId);
    var activities = _.map(req.body.activities, ObjectId);

    async.parallel(
        {
            finish: function (callback) {
                ActivityStatus.aggregate()
                    .match({user: {$in: users}, activity: {$in: activities}})
                    .project({
                        _id: 0,
                        activity: 1,
                        video: { $cond: [ "$videos", 1, 0 ] },
                        problem: { $cond: [ "$problems", 1, 0 ] }
                    })
                    .group({_id: '$activity',
                        video: {$sum: '$video'},
                        problem: {$sum: '$problem'}
                    })
                    .exec(callback);
            },
            correct: function (callback) {
                ProblemHistory.aggregate()
                    .match({user: {$in: users}, activity: {$in: activities}})
                    .project({_id: 0, activity: 1, correct: { $cond: [ "$isCorrect", 1, 0 ] } })
                    .group({_id: '$activity',
                        count: {$sum: 1}, correct: {$sum: '$correct'}})
                    .exec(callback);
            }
        },
        function (err, results) {
            if (err || !results) {
                res.status(500).json(err);
            } else {
                //合并
//                console.log(Date.now())
//                var a= _.chain(results).toArray().flatten()
//                    .reduce(function(memo,v){
//                        memo[v._id] = _.extend(v,memo[v._id]);
//                        return memo;
//                    },new Object()).toArray().value()
//                console.log(Date.now())
                res.status(200).json(results);
            }
        }
    );
};

exports.fetchActivityDetail = function (req, res) {
    var users = _.map(req.body.users, ObjectId);
    var activities = _.map(req.body.activities, ObjectId);

    async.parallel(
        {
            finish: function (callback) {
                ActivityStatus.aggregate()
                    .match({user: {$in: users}, activity: {$in: activities}})
                    .project({
                        _id: 0,
                        activity: 1,
                        video: { $cond: [ "$videos", "$user", null ] },
                        problem: { $cond: [ "$problems", "$user", null ] }
                    })
                    .group({_id: '$activity',
                        video: {$addToSet: '$video'},
                        problem: {$addToSet: '$problem'}
                    })
                    .exec(callback);
            },
            correct: function (callback) {
                ProblemHistory.aggregate()
                    .match({user: {$in: users}, activity: {$in: activities}})
                    .project({_id: 0, problem: 1, correct: { $cond: [ "$isCorrect", 1, 0 ] } })
                    .group({_id: '$problem',
                        count: {$sum: 1}, correct: {$sum: '$correct'}})
                    .exec(callback);
            },
            choice: function (callback) {
                ProblemHistory.aggregate()
                    .match({user: {$in: users}, activity: {$in: activities}})
                    .project({_id: 0, problem: 1, answer: '$userAnswer'})
                    .unwind('answer')
                    .group({_id: {answer: '$answer', problem: '$problem'}, count: {$sum: 1}})
                    .group({_id: '$_id.problem',
                        choice: {$push: {answer: '$_id.answer', count: '$count'}}})
                    .exec(callback);
            }
        },
        function (err, results) {
            if (err || !results) {
                res.status(500).json(err);
            } else {
//                var a= _.chain(results.correct.concat(results.choice)).flatten()
//                    .reduce(function(memo,v){
//                        memo[v._id] = _.extend(v,memo[v._id]);
//                        return memo;
//                    },new Object()).toArray().value();
//                res.status(200).json(
//                    {activities: results.act, problems: a}
//                );
                res.status(200).json(results);
            }
        }
    );
};


