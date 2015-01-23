var cursor = db.stat.find({"data.event":"FinishLesson"});
while ( cursor.hasNext() ) {
    var track = cursor.next();
    var properties = track.data.properties;
    var pass = (Math.random()<.8)
    var star = pass?1:0;
    
    if(properties.LessonId && properties.ChapterId && properties.LayerId && properties._id && track._id)
        db.task_status.update(
            {
                task:ObjectId(properties.LessonId),user: ObjectId(properties._id)
            },{
                isPassed:pass, star:NumberInt(star),
                user: ObjectId(properties._id), chapter:ObjectId(properties.ChapterId),
                topic: ObjectId(properties.LayerId), task:ObjectId(properties.LessonId)
            },{
                upsert: true
            });
}

