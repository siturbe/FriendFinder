var friendData = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friendData);
    });

    app.post("/api/friends", function(req,res){
        const newFriend = req.body;
        friendData.push(newFriend);
        res.json(newFriend);
        //Need to add compatibility logic to this route
    })
}