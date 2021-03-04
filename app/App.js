import React, { Component } from 'react'
import Nav from "./components/Nav"
import Panel from "./components/Panel"

class App extends Component {
    render(){
        return (
            <div>
                <Nav />
                <Panel />
            </div>
        )
    }
}

export default App