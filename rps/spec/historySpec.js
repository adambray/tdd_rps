const Rps = require("../src/Rps");
const Round = require("../src/Round");
const FakeRoundRepo = require("./FakeRoundRepo");

describe("history", function () {
    let roundRepo;
    let rps;

    beforeEach(function () {
        roundRepo = new FakeRoundRepo();
        rps = new Rps(roundRepo);
    })

    describe("when no rounds have been played", function () {
        it("tells the ui noRounds", function () {
            const observerSpy = jasmine.createSpyObj("observerSpy", ["noRounds"]);

            rps.history(observerSpy);

            expect(observerSpy.noRounds).toHaveBeenCalled()
        });
    });

    describe("when some rounds have been played", function () {
        it("sends the rounds to the UI", function () {
            const observerSpy = jasmine.createSpyObj("observerSpy", [
                "p1Wins",
                "p2Wins",
                "tie",
                "invalid",
                "rounds"]);

            rps.playRound("rock", "paper", observerSpy);
            rps.playRound("paper", "rock", observerSpy);
            rps.playRound("rock", "rock", observerSpy);
            rps.playRound("rock", "sailboat", observerSpy);

            rps.history(observerSpy);

            expect(observerSpy.rounds).toHaveBeenCalledWith([
                new Round("rock", "paper", "p2Wins"),
                new Round("paper", "rock", "p1Wins"),
                new Round("rock", "rock", "tie"),
                new Round("rock", "sailboat", "invalid")
            ]);
        });

    });
});


function roundRepoContract(roundRepoClass) {
    describe("repo", function () {
        let roundRepo;

        beforeEach(function () {
            roundRepo = new roundRepoClass();
        });

        describe("when no rounds have been saved", function () {
            it("is empty", function () {
                expect(roundRepo.isEmpty()).toBe(true);
            });
        });

        describe("when rounds have been saved", function () {
            it("is not empty", function () {
                roundRepo.save(new Round("rock", "paper", "p2"))
                expect(roundRepo.isEmpty()).toBe(false);
            });

            it("returns all saved rounds", function () {
                let round1 = new Round("rock", "paper", "p2");
                let round2 = new Round("scissors", "paper", "p1");

                roundRepo.save(round1)
                roundRepo.save(round2)

                expect(roundRepo.findAll()).toContain(round2, round1);
            })
        });
    });
}


roundRepoContract(FakeRoundRepo);