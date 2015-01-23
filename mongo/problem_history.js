var cursor = db.stat.find({"data.event": "AnswerProblem"});
while (cursor.hasNext()) {
    var track = cursor.next();
    var properties = track.data.properties;
    if (properties.LessonId && properties.ChapterId && properties.LayerId && properties.ProblemId && properties.ActivityId && properties._id && track._id)
        db.problem_history.save({_id: track._id, isCorrect: properties.Correct,
            userAnswer: (properties.Answer instanceof Array) ? properties.Answer : [properties.Answer],
            user: ObjectId(properties._id), chapter: ObjectId(properties.ChapterId),
            topic: ObjectId(properties.LayerId), task: ObjectId(properties.LessonId),
            activity: ObjectId(properties.ActivityId), problem: ObjectId(properties.ProblemId),
            createdBy: track.localetime})
}

