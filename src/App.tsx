import * as React from "react"
import "./App.css"

import { RealTimeChart } from "./ui/RealTimeChart"
// import { BinsChart } from "./ui/BinsChart";
// import { Button } from "@blueprintjs/core"

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
          <h2>Something</h2>
          <RealTimeChart sample="30s" stop={new Date("2017/12/06")} />
          {/* <BinsChart /> */}
        </div>
      </div>
    )
  }
}

export default App
