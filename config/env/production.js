// TODO: 
module.exports = {
    db: "mongodb://pri/yangcong-prod,sec1/yangcong-prod,sec2/yangcong-prod",
    replSet: {
        readPreference: 'ReadPreference.SECONDARY'
    }
}
