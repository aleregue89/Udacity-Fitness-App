import React, {Component} from 'react';
import { View } from 'react-native';
//import {Ionicons} from '@expo/vector-icons'
import AddEntry from './components/AddEntry'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import History from './components/History'


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
          <History />
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