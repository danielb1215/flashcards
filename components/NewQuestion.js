import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { NewQapi } from '../utils/api'
import { newQaction } from '../actions/index'

class NewQuestion extends Component{
    state = {
        question: '',
        answer: '',
        }
    submit = () => {


        const { question, answer } = this.state
        //call title and question that are store in this.props.navigation.state.params   
        const {title, questions} = this.props.navigation.state.params        
        if (question === '') {
            Alert.alert('Mandatory', 'Question cannot be empty');
            return;
        }
        if (answer === '') {
            Alert.alert('Mandatory', 'Answer cannot be empty');
            return;
        }   
        const params = {title, questions, question, answer}     
        this.props.dispatch(newQaction(params))
        
        NewQapi({ 
            card: {question, answer},
            deckName: title     
        })
        //this.setState(() => ({ question: '', answer: '' }))    
   
      }
 render(){
    const {question, answer} = this.state
    const {title, questions} = this.props.navigation.state.params
    return(
        <View style={styles.container}>
            <View>
                <Text>{questions}</Text>
                <Text>{JSON.stringify(this.props.navigation.state.params)}</Text>
                <Text>{JSON.stringify(this.state.answer)}</Text>
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