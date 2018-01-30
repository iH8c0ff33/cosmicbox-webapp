import * as React from "react"
import "./App.css"

import { RealTimeChart } from "./ui/RealTimeChart"
import { BinsChart } from "./ui/BinsChart"

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="pt-navbar pt-dark">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Cosmic Box Charts</div>
          </div>
        </nav>
        <div className="container">
          <h2>Real Time Events</h2>
          <RealTimeChart sample="30s" stop={new Date(new Date().getTime() + 86400000)} />
          <h2>Frequency Histogram</h2>
          <BinsChart />
        </div>
      </div>
    )
  }
}

export default App
