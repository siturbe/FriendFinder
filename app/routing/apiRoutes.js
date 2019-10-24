const friendData = require("../data/friends.js");
const fs = require('fs');

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friendData);
    });

    app.post("/api/friends", function(req,res){
        const userData = req.body;
       
        console.log(userData);
        //Compatibility logic below
        
        const matchScore = [];
        //Code returns user's scores as integers
        const userArray = userData.scores.map(function(element){
            return parseInt(element);
        });
    
        //Code loops through eacy friend and returns their respective scores as integers...
        for (let i=0; i<friendData.length; i++){
            let matchArray = friendData[i].scores.map(function(ele){
                return parseInt(ele);
            });
            //...code then calculates the difference between the user and the friend's scores...
            let diff = userArray.map(function(num, index){
                return Math.abs(num - matchArray[index]);
            })
            //...code then sums those differences and pushes them into an array. The higher the number the least compatible
            let sumDiff = diff.reduce(function(acum, element) {
                acum +=element;
                return acum;
            },0);
    
            matchScore.push(sumDiff);
        }
    
        const indexOfMin = matchScore.indexOf(Math.min(...matchScore));
    
        const matchData = friendData[indexOfMin];
        console.log(matchData);
        res.json(matchData);

        friendData.push(userData);

        // how to do this so it keeps formatting of friends.js
        // fs.writeFile('../data/friends.js', friendData, function(err){
        //     if(err){
        //         console.log(err);
        //     return;
        //     }
        //     console.log('Friend database updated');
        // })
    })
}