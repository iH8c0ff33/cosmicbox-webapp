import * as React from "react"
import { Bin } from "../api/type/event"
import { getEventBins } from "../api/event"
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"
import { Slider } from "@blueprintjs/core"

interface Props {
    sample: string
    // start: Date
    stop: Date
}

interface State {
    bins: Bin[]
    error: Error
    sliderValue: number
}

export class RealTimeChart extends React.Component<Props, State> {
    getEvents() {
        getEventBins(
            `${this.state.sliderValue}s`,
            new Date(new Date().getTime() - 240000),
            this.props.stop
        )
            .then(bins => {
                this.setState({ ...this.state, bins: bins.slice(1) })
                setTimeout(() => this.getEvents(), 300)
            })
            .catch(error => this.setState({ ...this.state, error }))
    }

    componentWillMount() { this.setState({ bins: [], sliderValue: 10 }) }

    componentDidMount() {
        this.getEvents()
    }

    render() {
        return (
            <div style={{ marginTop: "1.5em" }}>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        style={{ marginLeft: "-1.3em" }}
                        // margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        data={this.state.bins.map(i => { return { start: i.start.toLocaleString(), count: i.count } })}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="start" />
                        <YAxis dataKey="count" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#F46524" />
                    </BarChart>
                </ResponsiveContainer>
                <Slider
                    min={5}
                    max={20}
                    stepSize={1}
                    labelStepSize={1}
                    onChange={sliderValue => this.setState({ ...this.state, sliderValue })}
                    value={this.state.sliderValue}
                // vertical={vertical}
                />
                <p>{this.state.sliderValue}</p>
                <p>{this.state.error != null ?
                    this.state.error.name :
                    JSON.stringify(this.state.bins.map(i => i.start.toLocaleString()))}</p>
            </div>
        )
    }
}