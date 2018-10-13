import * as React from "react"

import { setToken } from "./service"
import { dashboardURL } from "../url"

export default class extends React.Component {
  componentDidMount() {
    const queries = new URLSearchParams(location.search)

    const responseType = queries.get("response_type")
    const token = queries.get("token")

    if (responseType === "token" && token != null)
      setToken(token)

    location.replace(dashboardURL + "/")
  }

  render() { return null }
}