import { Control, Field, FieldBody, FieldLabel, Input, Label } from "bloomer"
import * as React from "react"

type Part = "date" | "time"

type ChangeHandler = (date?: Date) => void

interface Props {
  label: string
  onChange: ChangeHandler
}

interface State {
  date?: string
  time?: string
  dateValid?: boolean
  timeValid?: boolean
}

export default class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <>
        <Field isHorizontal>
          <FieldLabel isNormal>
            <Label>{this.props.label}</Label>
          </FieldLabel>
          <FieldBody>
            <Field>
              <Control>
                <Input
                  isColor={
                    this.state.dateValid != null ? this.state.dateValid === true ? "success" : "danger" : undefined
                  }
                  type="date"
                  placeholder="Date"
                  onChange={
                    (e: React.FormEvent<HTMLInputElement>) => this.write("date", e.currentTarget.value)
                  }
                />
              </Control>
            </Field>
            <Field>
              <Control>
                <Input
                  isColor={
                    this.state.timeValid != null ? this.state.timeValid === true ? "success" : "danger" : undefined
                  }
                  type="time"
                  placeholder="Time"
                  onChange={
                    (e: React.FormEvent<HTMLInputElement>) => this.write("time", e.currentTarget.value)
                  }
                />
              </Control>
            </Field>
          </FieldBody>
        </Field>
      </>
    )
  }

  private write(part: Part, value: string) {
    const valid = value.length > 0 &&
      (part === "date" ? !isNaN(Date.parse(value)) : !isNaN(Date.parse(`01/01/1970 ${value}`)))

    this.setState({
      ...this.state,
      [part]: value,
      [part === "date" ? "dateValid" : "timeValid"]: valid
    })

    const date = new Date(
      `${(part === "date" ? value : this.state.date) || "no"} ${(part === "time" ? value : this.state.time) || "no"}`
    )
    this.props.onChange(isNaN(date.getTime()) ? undefined : date)
  }
}