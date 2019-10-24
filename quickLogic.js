//This is a superflous file built so I could test the logic of the match maker with node in the terminal

var friendData = require("./app/data/friends.js");

const userData= {
    name: "Joe Test",
    photo: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq7AAAAJDAwYzI4NTQ4LWYwZWUtNGFkYS1hNTYwLTZjYzkwY2ViZDA3OA.jpg",
    scores: [
    "2",
    "1",
    "2",
    "4",
    "4",
    "5",
    "4",
    "3",
    "1",
    "1"
    ]
}



function makeMatch(){
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
}



makeMatch();


