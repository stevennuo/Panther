/**
 * Expose routes
 */

var records = require('records');

module.exports = function (app, passport) {
//record route 学情分析API
    /**
     * 通过roomId和taskId获取某个班级(所有的人)在某个任务中的所有status,history(包括TaskStatus/ProblemHistory/ActivityStatus）
     */
//    app.get('/records/task/:taskId/room/:roomId', records.getByTaskAsRoom);
    /**
     * 通过userId和taskId获取某个用户在某个任务中的所有的status,history(包括TaskStatus/ProblemHistory/ActivityStatus）
     */
//    app.get('/records/task/:taskId/user/:userId', records.getByTaskAsUser);
    /**
     * 通过roomId和taskId获取某个班级在某个任务中的status,history的"统计数据", 统计数据包括具体不同值的<统计个数，和所占比例>
     */
//    app.get('/recordsStat/task/:taskId/room:/roomId', recordStats.getByTaskAsRoom);
    /**
     * 通过roomId和taskId获取某个班级在某个任务中的status,history的"统计数据", 统计数据包括具体不同值的<统计个数，和所占比例>
     */
//    app.get('/recordsStat/task/:taskId/user:/roomId', recordStats.getByTaskAsUser);

    app.post('/recordStars', records.fetchStarsByUserTasks);


    /**
     * Error handling
     */

    app.use(function (err, req, res, next) {
        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
            || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }
        console.error(err.stack);
        // error page
        res.status(500).send({ error: err.stack });
    });

    // assume 404 since no middleware responded
    app.use(function (req, res, next) {
        res.status(404).send({
            url: req.originalUrl,
            error: 'Not found'
        });
    });
}
