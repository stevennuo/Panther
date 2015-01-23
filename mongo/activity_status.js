var cursor = db.stat.find({"data.event":"QuitActivity"});
while ( cursor.hasNext() ) {
    var track = cursor.next();
    var properties = track.data.properties;
    if(!properties) continue;
    var pass = (Math.random()<.8)
    var probpass = (Math.random()<.8)
    
    if(properties.LessonId && properties.ChapterId && properties.LayerId && properties._id && track._id && properties.ActivityId)
        db.activity_status.update(
            {
                activity: ObjectId(properties.ActivityId),user: ObjectId(properties._id)
            },{
                isPassed:pass,videos:true,problems:probpass,
                user: ObjectId(properties._id), chapter:ObjectId(properties.ChapterId),
                topic: ObjectId(properties.LayerId), task:ObjectId(properties.LessonId),
                activity: ObjectId(properties.ActivityId)
            },{
                upsert: true
            });
}