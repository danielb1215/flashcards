import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert, ProgressBarAndroid } from 'react-native'; 
import { connect } from 'react-redux'; 
import { clearLocalNotification, setLocalNotification } from '../utils/api'

class Quiz extends Component {
    state = {
        i: 0,
        correct: 0,       
    }  
    toDeck = () => {
      this.props.navigation.goBack()
    }
    displayAnswer = (x) => {
      Alert.alert(x)
    }
    correct = () => {
      const {i, correct} = this.state;
      this.setState({i: i + 1, correct: correct + 1})
      clearLocalNotification()
      .then(setLocalNotification)
    }
    reset = () => {
        this.setState({i: 0, correct: 0})
    }
    incorrect = (x) => {
        this.setState({i: this.state.i + 1})
        Alert.alert(x);
    }
    render(){
      const { correct, i } = this.state
      const { questions } = this.props.navigation.state.params
      const questionExist = i < questions.length;
      const questionLeft = questions.length - i;
      return(
        <View style={{flex: 1 }}>
          {
            //Here if there are questions I made a loop to display the questions
          }
          {questionExist ? (
            <View style={styles.container} >
                <View style={{flex: 1}}>
                    <View>
                        <Text>{questionLeft} / {questions.length}</Text>
                    </View>
                </View>
              <View style={{flex: 3}} >
                  <View style={styles.center}>
                      <Text style={{fontSize: 36}}>{questions[i].question}</Text>
                      <TouchableOpacity onPress={() => this.displayAnswer(questions[i].answer)}>
                        <Text style={{fontSize: 20, color:'yellow'}}>Answer</Text>
                      </TouchableOpacity>
                </View>   
               </View>

                <View style={[styles.buttonsContainer, {flex: 2}]}>
                    <View style={styles.container}>
                      <View style={styles.center}>
                        <TouchableOpacity onPress={this.correct}>
                          <Text style={[styles.buttons, {backgroundColor: 'green'}]}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.incorrect(questions[i].answer)}>
                          <Text style={[styles.buttons, { backgroundColor: 'red'}]}>Incorrect</Text>
                        </TouchableOpacity>
                      </View>
                    </View> 
                </View>
             </View>   

          )
          : (
             <View style={styles.container}>
                        <Text>Score: {correct}</Text>

                        <View style={[styles.buttonsContainer, {flex: 2}]}>
                            <View style={styles.container}>
                                <TouchableOpacity onPress={this.reset}>
                                    <Text style={[styles.buttons, { backgroundColor: 'green'}]}>Start Quiz</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.toDeck}>
                                    <Text style={[styles.buttons, { backgroundColor: 'blue'}]}>Back to Deck</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
          )}
        </View>
      
      
      )
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  buttons:{
    justifyContent: 'center',
    height: 30,
    textAlign: 'center',
    width: 200
  },
  center:{
    alignItems: 'center'
  },
  buttonsContainer:{
    alignItems: 'center', justifyContent: 'space-around'
  }
});
function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(Quiz)