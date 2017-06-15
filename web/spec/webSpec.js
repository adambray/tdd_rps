const React = require("react");
const ReactDOM = require("react-dom");
const {Round} = require("rps");
const PlayForm = require("../src/PlayForm");

describe("play form", function () {
    let domFixture;

    beforeEach(function () {
        setupDOM();
    })

    afterEach(function () {
        domFixture.remove();
    })

    describe("rps tells us invalid", function () {
        beforeEach(function () {
            let rps = {
                playRound(p1Throw, p2Throw, ui) {
                    ui.invalid();
                }
            };
            mountApp(rps);
        })

        it("then the ui should display 'INVALID'", function () {
            expect(page()).not.toContain("INVALID");
            submitForm();
            expect(page()).toContain("INVALID");
        });
    });

    describe("rps tells us p1 wins", function () {
        beforeEach(function () {
            let rps = {
                playRound(p1Throw, p2Throw, ui) {
                    ui.p1Wins();
                }
            };
            mountApp(rps);
        })

        it("then the ui should display 'P1 Wins!'", function () {
            expect(page()).not.toContain("P1 Wins!");
            submitForm();
            expect(page()).toContain("P1 Wins!");
        });
    });

    describe("rps tells us p2 wins", function () {
        beforeEach(function () {
            let rps = {
                playRound(p1Throw, p2Throw, ui) {
                    ui.p2Wins();
                }
            };
            mountApp(rps);
        })

        it("then the ui should display 'P2 Wins!'", function () {
            expect(page()).not.toContain("P2 Wins!");
            submitForm();
            expect(page()).toContain("P2 Wins!");
        });
    });

    describe("rps tells us the players tied", function () {
        beforeEach(function () {
            let rps = {
                playRound(p1Throw, p2Throw, ui) {
                    ui.tie();
                }
            };
            mountApp(rps);
        })

        it("then the ui should display 'TIE'", function () {
            expect(page()).not.toContain("TIE");
            submitForm();
            expect(page()).toContain("TIE");
        });
    });

    it("sends the user's input to the rps module", function () {
        const playSpy = jasmine.createSpy("play");
        const p1Throw = "P1 Throw";
        const p2throw = "P2 Throw";

        mountApp({playRound: playSpy});

        updateInput("p1Throw", p1Throw);
        updateInput("p2Throw", p2throw);
        submitForm();

        expect(playSpy).toHaveBeenCalledWith(p1Throw, p2throw, jasmine.any(Object));
    });

    describe("when the RPS module says there are no rounds", function () {
        beforeEach(function () {
            mountApp({
                history(observer) {
                    observer.noRounds();
                }
            })
        })

        it("displays NO ROUNDS", function () {
            expect(page()).toContain("NO ROUNDS");
        });
    });

    describe("when the RPS module says there are rounds", function () {
        beforeEach(function () {
            mountApp({
                history(observer) {
                    observer.rounds([new Round("foo", "bar", "baz")]);
                }
            })
        })

        it("displays the rounds", function () {
            expect(page()).not.toContain("NO ROUNDS");
            expect(page()).toContain("foo", "bar", "baz");
        });
    });

    function setupDOM() {
        domFixture = document.createElement("div");
        domFixture.id = "testPlayForm";
        document.querySelector("body").appendChild(domFixture);
    }

    function mountApp(rps) {
        rps.history = rps.history || function () {}

        ReactDOM.render(
            <PlayForm rps={rps}/>,
            domFixture
        );
    }

    function updateInput(name, value) {
        let input = domFixture.querySelector(`input[name='${name}']`);
        input.value = value;
        input.dispatchEvent(new Event("input", {bubbles: true, cancelable: false}));
    }

    function submitForm() {
        document.querySelector("button").click();
    }

    function page() {
        return domFixture.innerText;
    }
});