import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
//import {Ionicons} from '@expo/vector-icons'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { TabNavigator, createAppContainer } from 'react-navigation'
import { NavigationContainer } from '@react-navigation/native'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { StatusBar } from 'react-native'
import Constants from 'expo-constants'
import EntryDetail from './components/EntryDetail'
//import { createStackNavigator } from '@react-navigation/stack'
import Live from './components/Live'

//creating StatusBar function
function UdaciStatusBar({ backgroundColor, ...props }) {
    return ( 
        <View style = {{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor = { backgroundColor } {...props }/> 
        </View >
    )
}


const Tabs = createAppContainer(createBottomTabNavigator({
    History: {
        screen: History,
        navigationOptions: {
            tabBarLabel: 'History',
            tabBarIcon: ({ tintColor }) => <Ionicons name = 'ios-bookmarks' size = { 30 } color = { tintColor }/>  
        }
    },
    AddEntry: {
        screen: AddEntry,
        navigationOptions: {
            tabBarLabel: 'Add Entry',
            tabBarIcon: ({ tintColor }) => <FontAwesome name = 'plus-square' size = { 30 } color = { tintColor }/>     
        }
    },
    Live: {
        screen: Live,
        navigationOptions: {
            tabBarLabel: 'Live',
            tabBarIcon: ({ tintColor }) => <Ionicons name = 'ios-speedometer' size = {30} color = {tintColor}/>
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowColor: 'rgba(0,0,0,0.24)',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
}))

/*
//creating StackNavigator component
const Stack = createStackNavigator()
const MainNavigator = () => (
    <Stack.Navigator headerMode= 'screen'>
        <Stack.Screen name= 'home'
                      component= {Tabs}
                      options= {{headerShow: false}}
        />
        <Stack.Screen name= 'EntryDetail'
                      component= {EntryDetail}
                      options= {{headerTintColor: white, headerStyle: {
                          backgroundColor: purple
                      }}}
        />
    </Stack.Navigator>
)


/*
const MainNavigator = createAppContainer(createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            header: null
        }
    },
    EntryDetail: {
        screen: EntryDetail,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple
            }
        })
    }
}))
*/

export default class App extends Component {

    /*componentDidMount () {
      console.log('after')
      debugger
      console.log('before')
    }*/

    render() {
        return (
            <NavigationContainer>
                
                <Provider store = {createStore(reducer)}>
                <View style = {{ flex: 1 }} >
                    <UdaciStatusBar backgroundColor = { purple } barStyle = 'light-content' />
                    <Tabs />
                </View>
            </Provider>
            </NavigationContainer>
        )
    }
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
