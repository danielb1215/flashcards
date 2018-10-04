import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { NewQapi } from '../utils/api'
import { newQaction } from '../actions/index'
// I follow some code from the udafitnessapp https://github.com/udacity/reactnd-UdaciFitness-complete/commit/a3e78fe08ac785e6ce372ed37bfb5bcfa19851e3
class NewQuestion extends Component{
    state = {
        question: '',
        answer: '',
        }
    submit = () => {
        //Here I'm storing the values that comes from OneDeck component
        const { title, questions } = this.props.navigation.state.params
        const { answer, question } = this.state
        if (question === '') {
            Alert.alert('You have to add question')
            return
        }
        if (answer === '') {
            Alert.alert('You have to add a answer')
            return
        }
        const params = {title, questions, question, answer}
        //Here I'm sending the information to the reducer to add a new question
        this.props.dispatch(newQaction(params))
        //here I'm sending the information to the API to add a new question
        NewQapi({ deckName: title, card: {question, answer} })
        //After add the question this return you to the DeckList component      
        this.props.navigation.navigate('Home') 
       
      }
 render(){
    const {question, answer} = this.state
    return(
        <View style={styles.container}>
            <View>
                <TextInput
                style={styles.textInput}
                value={question}
                placeholder="Type here the Question"
                onChangeText={question => this.setState({question})}
                />
                <TextInput
                style={styles.textInput}
                value={answer}
                placeholder="Type here the Answer"
                onChangeText={answer => this.setState({answer})}
                />
                <TouchableOpacity style={styles.button} onPress={this.submit}><Text style={styles.title}>Submit</Text></TouchableOpacity>
            </View>
        </View>
    )
 }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',  
      backgroundColor: '#fff',    
    },
    title:{   
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',   
    },
    textInput:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 24,
        borderRadius: 7,
        height: 45,
    },
    button:{
      backgroundColor: 'green',
      margin: 24,
      padding: 10,
      borderRadius: 7,
      height: 45,
    }
  })
  

function mapStateToProps(state) {
    return {
        decks: state,
    };
  }

export default connect(mapStateToProps)(NewQuestion)