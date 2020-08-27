import React from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'
import {TouchableOpacity} from 'react-native'
import {FontAwesome, Entypo} from '@expo/vector-icons'
import {white, gray, purple} from '../utils/colors'

export default function UdaciSleppers({max, unit, step, value, onIncrement, onDecrement}) {
    return (
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity  style={[styles.iosBtn, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]} 
                                   onPress={onDecrement}>
                    <FontAwesome name= 'minus'
                                 size= {30}
                                 color= {purple}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iosBtn, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]} 
                                  onPress={onIncrement}>
                    <FontAwesome name= 'plus'
                                 size= {30}
                                 color= {purple}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.metricCounter}>
                <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
                <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
            </View>
        </View>
    )
}

// adding styles
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosBtn: {
        backgroundColor: white,
        borderColor: purple,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25
    },
    metricCounter: {
        width: 85,
        justifyContent: 'center',
        alignItems: 'center'
    }
})