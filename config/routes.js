/**
 * Expose routes
 */

var records = require('records');

module.exports = function (app, passport) {

//record route 学情分析API
    /**
     * task维度 - 通过userIds和taskIds获取多个用户在多个任务中 - 每个任务的完成人数，星星获得总数以及完成人员名单
     */
    app.post('/records/task', records.fetchTask);
    /**
     * activity纬度 - 通过userIds和activityIds获取多个用户在多个活动环节中
     * - 每个活动环节中视频以及巩固题集分别的完成数和对应的题目正确率
     */
    app.post('/records/activity/stat', records.fetchActivityStat);
    /**
     * activity/problem/choice纬度 - 通过userIds和activityIds获取多个用户在多个环节中
     * - 每个活动环节中视频以及巩固题集分别的完成人员名单，每一道题目的正确率，以及每个选项的选择率
     */
    app.post('/records/activity/detail', records.fetchActivityDetail);

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
