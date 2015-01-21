var start = ISODate("2015-01-18T00:00:00.000Z")
var end = ISODate("2015-01-18T23:59:59.000Z")
var cursor = db.tracks.find({"localetime":{$gte:start,$lt:end}});
while ( cursor.hasNext() ) {
    var track = cursor.next();
    db.a0118.save(track);
}