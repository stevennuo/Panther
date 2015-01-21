var start = ISODate("2015-01-18T00:00:00.000Z")
var end = ISODate("2015-01-18T23:59:59.000Z")
var cursor = db.a0118.find({"data.event":"AnswerProblem","localetime":{$gte:start,$lt:end}});
while ( cursor.hasNext() ) {
    var track = cursor.next();
    var properties = track.data.properties;
    if(properties.LessonId && properties.ChapterId && properties.LayerId && properties.ProblemId && properties.ActivityId && properties._id && track._id)
    db.problem_history.save({_id:track._id,isCorrect:properties.Correct, 
        userAnswer:[properties.Answer],
        user:ObjectId(properties._id),chapter:ObjectId(properties.ChapterId),
        topic:ObjectId(properties.LayerId),task:ObjectId(properties.LessonId),
        activity:ObjectId(properties.ActivityId),problem:ObjectId(properties.ProblemId),
        createdBy:track.localetime})
    }

