var start = ISODate("2015-01-18T00:00:00.000Z")
var end = ISODate("2015-01-18T23:59:59.000Z")
var cursor = db.a0118.find({"data.event":"AnswerProblem","localetime":{$gte:start,$lt:end}});
while ( cursor.hasNext() ) {
    var track = cursor.next();
    var properties = track.data.properties;
    var pass = (Math.random()<.8)
    var star = pass?1:0;
    
    if(properties.LessonId && properties.ChapterId && properties.LayerId && properties._id && track._id)
    db.task_status.save({_id:track._id, isPassed:pass, star:NumberInt(star),
        user: ObjectId(properties._id), chapter:ObjectId(properties.ChapterId), 
        topic: ObjectId(properties.LayerId), task:ObjectId(properties.LessonId),
    });
}

