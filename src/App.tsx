import * as React from "react"
import "./App.css"

import { BinsChart } from "./ui/BinsChart"
// import { Button } from "@blueprintjs/core"

import "normalize.css/normalize.css"
import "@blueprintjs/core/dist/blueprint.css"

class App extends React.Component {
  render() {
    return (
      // <Button text="DAW" />
      <BinsChart sample="30s" stop={new Date("2017/12/05")} />
    )
  }
}

export default App
