const React = require("react");

class PlayForm extends React.Component {
    constructor() {
        super()

        this.state = {
            result: "",
            p1Throw: "",
            p2Throw: "",
            rounds: []
        }
    }

    componentDidMount() {
        this.props.rps.history(this);
    }

    playGame() {
        this.props.rps.playRound(this.state.p1Throw, this.state.p2Throw, this);
        this.props.rps.history(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    invalid() {
        this.setState({result: "INVALID"})
    }

    p1Wins() {
        this.setState({result: "P1 Wins!"})
    }

    p2Wins() {
        this.setState({result: "P2 Wins!"})
    }

    tie() {
        this.setState({result: "TIE!"})
    }

    rounds(rounds) {
        this.setState({rounds});
    }

    noRounds() {
        this.setState({rounds: []});
    }

    renderRounds() {
        const rounds = this.state.rounds;

        if (rounds.length === 0)
            return "NO ROUNDS"

        return rounds.map(this.renderRound);
    }

    renderRound(round, index) {
        return (
            <div key={`round-${index}`}>
                {round.p1Throw} -
                {round.p2Throw} -
                {round.result}
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.state.result}

                <input type="text"
                       name="p1Throw"
                       value={this.state.p1Throw}
                       onInput={this.handleInputChange.bind(this)}
                />

                <input type="text"
                       name="p2Throw"
                       value={this.state.p2Throw}
                       onInput={this.handleInputChange.bind(this)}
                />

                <button onClick={() => this.playGame()}>PLAY</button>

                <h2>Round History</h2>
                {this.renderRounds()}
            </div>
        );
    }
}

module.exports = PlayForm;