import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {StyleSheet} from 'react-native'
import {white} from '../utils/colors'
import {connect} from 'react-redux'
import MetricCard from './MetricCard'
import {addEntry} from '../actions'
import {removeEntry} from '../utils/api'
import {timeToString, getDailyReminderValue} from '../utils/helpers'
import TextButton from './TextButton'
import { add } from 'react-native-reanimated'

class EntryDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const {entryId} = navigation.state.params

        const year = entryId.slice(0,4)
        const month = entryId.slice(5,7)
        const day = entryId.slice(8)

        return {
            title: `${month}/${day}/${year}`
        }
    }

    reset = () => {
        const {remove, goBack, entryId} = this.props

        remove()
        goBack()
        removeEntry(entryId)
    }

    shouldComponentUpdate (nextProps) {
        return nextProps.metrics !== null && !nextProps.metrics.today
    }

    render() {

        const {metrics} = this.props

        return (
            <View style= {styles.container}>
                <MetricCard metrics={metrics} />
                <TextButton> onPress= {this.reset} style={{margin: 20}}
                    RESET
                </TextButton>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    }
})

function mapStateToProps (state, {navigation}) {

    return {
        entryId,
        metrics: state[entryId]
    }
   
}

function mapDispatchToProps (dispatch, {navigation}) {
    const {entryId} = navigation.state.params

    return {
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId
                ? getDailyReminderValue()
                : null
        })),
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)