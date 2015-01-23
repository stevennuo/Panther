var cursor = db.tracks.find({"data.event":{$in:["QuitActivity", "AnswerProblem", "FinishLesson"]}},
{"data.event":1,"data.properties.ChapterId":1,"data.properties.LayerId":1,
 "data.properties.LessonId":1, "data.properties.ActivityId":1,
 "data.properties.ProblemId":1, "data.properties._id":1,
 "data.properties.Answer":1, "data.properties.Correct":1});
while ( cursor.hasNext() ) {
    var track = cursor.next();
    db.stat.save(track);
}