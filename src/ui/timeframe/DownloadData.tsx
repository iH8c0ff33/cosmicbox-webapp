import {
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
import DeleteModal from "./DeleteModal"

interface State {
  start?: Date
  end?: Date
  format?: string
  deleteActive: boolean
}

export default class extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = { deleteActive: false }
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
        <CardFooter isHidden={this.state.start == null || this.state.end == null}>
          <CardFooterItem href="#" onClick={() => this.onDownload()}>
            Download
          </CardFooterItem>
          <CardFooterItem hasTextColor="danger" href="#" onClick={() => this.onDelete(true)}>
            Delete
          </CardFooterItem>
        </CardFooter>
        <DeleteModal
          isActive={this.state.deleteActive}
          start={this.state.start}
          end={this.state.end}
          onEnd={this.onDelete.bind(this, false)}
        />
      </Card>
    )
  }

  private onDownload() {
    if (this.state.start == null || this.state.end == null) return
    const params = new URLSearchParams
    if (this.state.start != null && this.state.end != null) {
      params.set("start", this.state.start.toJSON())
      params.set("end", this.state.end.toJSON())
      params.set("access_token", getToken() || login() || "")
      params.set("format", this.state.format || "text/csv")
    }

    window.open(`${eventRangeURL}?${params}`)
  }

  private onDelete(state: boolean) {
    this.setState({ deleteActive: state })
  }
}
