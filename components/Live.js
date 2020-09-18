import React, {Component} from 'react'
import {View, Text, AjustIndicator, StyleSheet} from 'react-native'
import { purple, white } from '../utils/colors'

export default class Live extends Component {
    state = {
        coords: null,
        status: null,
        direction: '',
    }

    render() {

        const {status, coords, direction} = this.state

        if (status === 'denied') {
            return (
                <View>
                    <Text>Denied</Text>
                </View>
            )
        }

        if (status === 'undetermined') {
            return (
                <View>
                    <Text>Undetermined</Text>
                </View>
            )
        }

        return (
            <View>
                <Text>Live</Text>
                <Text>{JSON.stringify(this.state)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    Button: {
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText: {
        color: white,
        fontSize: 20,
    }
})