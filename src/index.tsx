import "./index.css"
import "bulma/css/bulma.css"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"

import AuthCallback from "./api/auth/Callback"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import { dashboardURL } from "./api/url"

ReactDOM.render(
  <Router>
    <>
      <Route path="/" component={App} />
      <Route path={dashboardURL + "/callback"} component={AuthCallback} />
    </>
  </Router>,
  document.getElementById("root")!
)
registerServiceWorker()
