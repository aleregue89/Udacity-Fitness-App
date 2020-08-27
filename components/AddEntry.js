import React, {Component} from 'react'
import {View, Text, Platform, StyleSheet} from 'react-native'
import {getMetricMetaInfo} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSleppers from './UdaciSleppers'
import DateHeader from './DateHeader'
import {timeToString} from '../utils/helpers'
import {TouchableOpacity} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton'
import {submitEntry, removeEntry} from '../utils/api'
import {connect} from 'react-redux'
import {addEntry} from '../actions'
import {getDailyReminderValue} from '../utils/helpers'
import { white, purple } from '../utils/colors'

// creating the UI for the submit button
function SubmitBtn ({onPress}) {
    return (
        <TouchableOpacity   style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn} 
                            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}


//export default class AddEntry extends Component {
// as we are using connect we dont need to export the class anymore
class AddEntry extends Component {

    // adding state to this component in order to modify the input
    state = {
        run : 0,
        bike : 0,
        swim : 0,
        sleep : 0,
        eat : 0
    }

    // adding methods
    increment = (metric) => {
        // we need to get the Max that the metric could be and the step
        const {max, step} = getMetricMetaInfo(metric)

        // we are gonna update our local component state
        this.setState((state) => {
            const count = state[metric] + step

            // we want to return a new object in order to be merged with the current state
            return {
                ...state,
                [metric] : count > max ? max : count 
            }
        })
    }

    decrement = (metric) => {

        // we are gonna update our local component state
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step

            // we want to return a new object in order to be merged with the current state
            return {
                ...state,
                [metric] : count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {

        // we are gonna update our local component state
        this.setState(() => ({
            [metric] : value,
        }))
    }

    // method to handle the submit
    submit = () => {
        const key = timeToString()
        const entry = this.state

        // update redux
        // dispatch is coming as a prop from connect
        this.props.dispatch(addEntry({
            [key] : entry
        }))
        // navigate to home
        // save to "db"
        submitEntry({key, entry})
        // clean notifications

        this.setState (() => ({
            run : 0,
            bike : 0,
            swim : 0,
            sleep : 0,
            eat : 0
        }))
    }

    // method to handle the reset
    reset = () => {
        const key = timeToString()

        // update redux
        this.props.dispatch(addEntry({
            [key] : getDailyReminderValue()
        }))
        // route to home
        // update "DB"
        removeEntry(key)
    }

    render() {

        // this will return to us the whole object 
        const metaInfo = getMetricMetaInfo()

        // adding a condition in order to reset the metrics
        if (this.props.alreadylogged) {
            return (
                <View style={styles.center}>
                    <Ionicons name= {Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
                              size= {100}
                    />
                    <Text>You already logged your information for today</Text>
                    <TextButton style ={{padding: 10}} onPress= {this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        // mapping over all the keys of the object "metaInfo" and we are getting
        // each of the properties from an specific key
        return (
            <View style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map((key) => {
                    const {getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            { type === 'slider'
                                ? <UdaciSlider value= {value}
                                               onChange= {(value) => this.slide(key, value)}
                                               {...rest}
                                  />
                                : <UdaciSleppers value= {value}
                                                 onIncrement= {() => this.increment(key)}
                                                 onDecrement= {() => this.decrement(key)}
                                                 {...rest}
                                  />

                            }
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

// styling for AddEntry
const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosSubmitBtn : {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn : {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText : {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30,
    }
})

function mapStateToProps(state) {
    const key = timeToString()

    return {
        alreadylogged : state[key] && typeof state[key].today === "undefined"
    }
}

export default connect(mapStateToProps)(AddEntry)