import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardFooterItem,
  CardHeader,
  CardHeaderTitle,
  Select,
  Field,
  FieldLabel,
  FieldBody,
  Label
} from "bloomer"
import * as React from "react"

import { eventRangeURL } from "../../api/url"
import { getToken, login } from "../../api/auth/service"

import Picker from "./DateTimePicker"

interface State {
  start?: Date
  end?: Date
  format?: string
}

export default class extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <CardHeaderTitle>Download data</CardHeaderTitle>
        </CardHeader>
        <CardContent>
          <Picker label="Start" onChange={date => this.setState({ start: date })} />
          <Picker label="End" onChange={date => this.setState({ end: date })} />
          <Field isHorizontal>
            <FieldLabel>
              <Label>Format</Label>
            </FieldLabel>
            <FieldBody>
              <Select
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  this.setState({ format: e.currentTarget.value })}
              >
                <option value="text/csv">CSV</option>
                <option value="application/json">JSON</option>
              </Select>
            </FieldBody>
          </Field>
        </CardContent>
        <CardFooter>
          <CardFooterItem>
            <Button
              disabled={this.state.start == null || this.state.end == null}
              isColor="primary"
              onClick={() => this.onDownload()}
            >
              Download
            </Button>
          </CardFooterItem>
        </CardFooter>
      </Card>
    )
  }

  private onDownload() {
    const params = new URLSearchParams
    if (this.state.start != null && this.state.end != null) {
      params.set("start", this.state.start.toJSON())
      params.set("end", this.state.end.toJSON())
      params.set("access_token", getToken() || login() || "")
      params.set("format", this.state.format || "text/csv")
    }

    window.open(`${eventRangeURL}?${params}`)
  }
}
