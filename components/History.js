import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import {receiveEntries, addEntry} from '../actions'
import {timeToString, getDailyReminderDate} from '../utils/helpers'
import {fetchCalendarResults} from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar-fix'

class History extends Component {

    componentDidMount() {
        const {dispatch} = this.props

        fetchCalendarResults()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(({entries}) => {
                if (!entries[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString()] : getDailyReminderDate()
                    }))
                }
            })
    }

    // handle the renderItems and renderEmptyDate methods
    renderItems = ({today, ...metrics}, formattedDate, key) => (
        <View>
            {today
                ? <Text>{JSON.stringify(today)}</Text>
                : <Text>{JSON.stringify(metrics)}</Text>}
        </View>
    )

    renderEmptyDate(formattedDate) {
        return (
            <View>
                <Text>No data for this day</Text>
            </View>
        )
    }

    render() {

        const { entries } = this.props

        return (
            <UdaciFitnessCalendar items={entries}
                                  renderItem={this.renderItems}
                                  renderEmptyDate={this.renderEmptyDate}/>
        )
    }
}

function MapStateToProps (entries) {
    return {
        entries
    }
}

export default connect(MapStateToProps)(History)