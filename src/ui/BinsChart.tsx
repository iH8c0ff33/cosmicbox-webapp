import * as React from "react"
import { Bin } from "../api/type/event"
import { getEventBins } from "../api/event"
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"

interface BinsChartProps {
    sample: string
    // start: Date
    stop: Date
}

interface BinsChartState {
    bins: Bin[]
    error: Error
}

export class BinsChart extends React.Component<BinsChartProps, BinsChartState> {
    getEvents() {
        getEventBins(
            this.props.sample,
            new Date(new Date().getTime() - 240000),
            this.props.stop
        )
            .then(bins => {
                this.setState({ ...this.state, bins: bins.slice(1) })
                setTimeout(() => this.getEvents(), 300)
            })
            .catch(error => this.setState({ ...this.state, error }))
    }

    componentWillMount() { this.setState({ bins: [] }) }

    componentDidMount() {
        this.getEvents()
    }

    render() {
        return (
            <div>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart
                        // margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                        data={this.state.bins.map(i => { return { start: i.start.toLocaleString(), count: i.count } })}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="start" />
                        <YAxis dataKey="count" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#123abc" />
                    </BarChart>
                </ResponsiveContainer>
                <p>{this.state.error != null ?
                    this.state.error.name :
                    JSON.stringify(this.state.bins.map(i => i.start.toLocaleString()))}</p>
            </div>
        )
    }
}