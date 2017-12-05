import * as React from "react"
import { BarChart, ResponsiveContainer, CartesianGrid, Bar, Tooltip, XAxis } from "recharts"
import { getEventBins } from "../api/event"
import { Slider } from "@blueprintjs/core"

function countMap(iter: number[]): Map<number, number> {
    const map = new Map<number, number>()

    for (let x of iter) {
        map.set(x, (map.get(x) || 0) + 1)
    }

    return new Map(Array.from(map).sort((a, b) => a[0] - b[0]))
}

interface State {
    data: Map<number, number>
    sliderValue: number
    error: Error
}

export class BinsChart extends React.Component<{}, State> {
    getEvents() {
        getEventBins(
            `${this.state.sliderValue}s`,
            new Date("2017/01/01"),
            new Date()
        )
            .then(bins => {
                this.setState({ ...this.state, data: countMap(bins.map(x => x.count)) })
            })
            .catch(error => this.setState({ ...this.state, error }))
    }

    componentWillMount() { this.setState({ sliderValue: 5, data: new Map() }) }

    componentDidMount() { this.getEvents() }

    render() {
        return (
            <div>
                <ResponsiveContainer width="100%" height={250} >
                    <BarChart data={Array.from(this.state.data)}>
                        <CartesianGrid />
                        <Tooltip />
                        <XAxis dataKey="0" />
                        <Bar dataKey="1" fill="#37474f" />
                    </BarChart>
                </ResponsiveContainer>
                <Slider
                    min={2}
                    max={25}
                    stepSize={1}
                    labelStepSize={4}
                    onChange={sliderValue => this.setState({ ...this.state, sliderValue })}
                    onRelease={_ => this.getEvents()}
                    value={this.state.sliderValue}
                // vertical={vertical}
                />
            </div>
        )
    }
}