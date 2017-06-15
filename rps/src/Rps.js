const Round = require("./Round");

function Rps(roundRepo) {
    repo = roundRepo
    this.history = function (observer) {
        if (repo.isEmpty()) {
            observer.noRounds();
        } else {
            observer.rounds(repo.findAll())
        }
    };

    this.playRound = function (p1, p2, observer) {
        new PlayRoundRequest(p1, p2, observer, repo).execute();
    };
}

function PlayRoundRequest(p1Throw, p2Throw, observer, roundRepo) {
    const ROCK = "rock";
    const PAPER = "paper";
    const SCISSORS = "scissors";
    const validThrows = [ROCK, PAPER, SCISSORS];

    this.execute = function () {
        let result = computeResult();
        observer[result]();

        if(roundRepo) {
            roundRepo.save(new Round(p1Throw, p2Throw, result));
        }
    };

    function computeResult() {
        if (invalid(p1Throw) || invalid(p2Throw))
            return "invalid";

        if (shapesAreTheSame())
            return "tie"

        if (p1BeatsP2())
            return "p1Wins"

        return "p2Wins"
    }

    function invalid(t) {
        return !validThrows.includes(t);
    }

    function shapesAreTheSame() {
        return p1Throw === p2Throw;
    }

    function p1BeatsP2() {
        return p1Throw === ROCK && p2Throw === SCISSORS ||
            p1Throw === PAPER && p2Throw === ROCK ||
            p1Throw === SCISSORS && p2Throw === PAPER;
    }
}

module.exports = Rps;