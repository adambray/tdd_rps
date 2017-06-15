const React = require("react")
const ReactDOM = require("react-dom")
const PlayForm = require("./src/PlayForm")
const {Rps, FakeRoundRepo} = require("rps");

ReactDOM.render(
    <PlayForm rps={new Rps(new FakeRoundRepo())}/>,
    document.getElementById("reactApp")
)