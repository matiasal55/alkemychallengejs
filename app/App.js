import React, { Component } from 'react'
import Nav from "./components/Nav"
import Home from "./components/Home"

class App extends Component {
    render(){
        return (
            <div>
                <Nav />
                <Home />
            </div>
            
        )
    }
}

export default App