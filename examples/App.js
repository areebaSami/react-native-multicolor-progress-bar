/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TouchInput
} from 'react-native';
import { ProgressBar } from 'react-native-multicolor-progress-bar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.changeProgress = this.changeProgress.bind(this);
    let progressReadings = [
      {
        color: 'red',
        value: 0.4,
        opacity: 0.4,
        nameToDisplay: "40%",
      },
      {
        color: 'blue',
        value: 0.2,
        opacity: 0.5,
        nameToDisplay: "20%",
      },
      {
        color: 'green',
        value: 0.2,
        opacity: 0.5,
        nameToDisplay: "20%",
      },
    ]
    this.state = {
      progressReadings
    }
  }
  changeProgress() {
    let progressReadings = [...this.state.progressReadings];
    for(let i =0;i<3;i++){
      let number = Math.random().toFixed(2);
      if(number > 0.3 && number <= 0.6){
        number -= 0.3
      }else if(number > 0.6){
        number -= 0.6
      }
      number = Number(number).toFixed(2)
      progressReadings[i].value = number
      progressReadings[i].nameToDisplay = (number * 100).toFixed(2) + '%'
    }
    this.setState({
      progressReadings
    })
  }
  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.view}>
          {/* <Text style={styles.text}>This is an example. You can add/reduce colors as well</Text> */}
          <ProgressBar
            numberOfProgressBars={3}
            backgroundBarStyle={{ height: 15 }}
            textStyle={{ color: 'white', opacity: 1, fontSize: 10, padding: 2 }}
            arrayOfProgressObjects={this.state.progressReadings}
          />
        </View>
        <Text style={styles.text}>{"Red: " + this.state.progressReadings[0].value + " \n Blue: " + this.state.progressReadings[1].value + " \n Green: " + this.state.progressReadings[2].value}</Text>
        <TouchableOpacity onPress={this.changeProgress} style={styles.button}>
          <Text style={styles.buttonText}>Change Progress</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'black',
    alignItems: 'stretch',
    paddingVertical: 20
  },
  view: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  text: {
    paddingBottom: 10,
    color: 'white'
  },
  buttonText: {
    color: 'blue',
    textAlign: 'center'
  },
  button: {
    margin: 20,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;