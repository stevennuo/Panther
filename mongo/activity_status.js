var start = ISODate("2015-01-18T00:00:00.000Z")
var end = ISODate("2015-01-18T23:59:59.000Z")
var cursor = db.a0118.find({"data.event":"QuitActivity","localetime":{$gte:start,$lt:end}});
while ( cursor.hasNext() ) {
    var track = cursor.next();
    var properties = track.data.properties;
    if(!properties) continue;
    var pass = (Math.random()<.8)
    var probpass = (Math.random()<.8)
    
    if(properties.LessonId && properties.ChapterId && properties.LayerId && properties._id && track._id && properties.ActivityId)
    db.activity_status.save({_id:track._id, isPassed:pass,video:true,problems:probpass,
        user: ObjectId(properties._id), chapter:ObjectId(properties.ChapterId), 
        topic: ObjectId(properties.LayerId), task:ObjectId(properties.LessonId),
        activity: ObjectId(properties.ActivityId)
    });
}