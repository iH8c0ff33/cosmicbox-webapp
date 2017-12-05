import * as React from "react"
import { BarChart, ResponsiveContainer } from "recharts"
import { getEventBins } from "../api/event"

interface State {
    rate: number[]
    count: number[]
    sliderValue: number
}

export class BinsChart extends React.Component<{}, State> {
    getEvents() {
        getEventBins(
            `${this.state.sliderValue}s`,
            new Date("2017/01/01"),
            new Date()
        )
            .then(bins => {
                let prev
                const rate = new Array<number>()
                const count = new Array<number>()
                const counts = bins.map(i => i.count).sort()

                for (let i = 0; i < counts.length; i++) {
                    if (counts[i] !== prev) {
                        rate.push(counts[i])
                        
                    }
                }

                this.setState({ ...this.state, bins: bins.slice(1) })
                setTimeout(() => this.getEvents(), 300)
            })
            .catch(error => this.setState({ ...this.state, error }))
    }

    render() {
        return (
            <ResponsiveContainer width="100%" height={250} >
                <BarChart />
            </ResponsiveContainer>
        )
    }
}