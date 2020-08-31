import React, {Component} from 'react';
import { View, Platform } from 'react-native';
//import {Ionicons} from '@expo/vector-icons'
import AddEntry from './components/AddEntry'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import {TabNavigator, createAppContainer} from 'react-navigation'
import {purple, white} from './utils/colors'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs'

//creating Tabs component
const Tabs = createBottomTabNavigator({
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
      }
    },
    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: 'Add Entry',
        tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
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
})

export default class App extends Component {

  /*componentDidMount () {
    console.log('after')
    debugger
    console.log('before')
  }*/

  render() {
    return (
      //<View style={styles.container}>
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <View style={{height: 20}}/>
          <Tabs />
      </View>
      </Provider>
      
    );
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