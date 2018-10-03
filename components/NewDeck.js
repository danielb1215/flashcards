import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addNewDeck } from '../actions'
import { submitNewDeck } from '../utils/api'
class NewDeck extends Component{  
  //this is the state to follow to the change of the input
      state = {
      title: '',
    }
    submit = () => {
      const entry = this.state
      //send the info to the reducer 
      this.props.dispatch(addNewDeck({
        [entry.title]: {title: entry.title, question:[]}
      }))        
      const info = {[entry.title]: {title: entry.title, question: []}}
      //send the info to the api to store it in the api 
      submitNewDeck( info )      
      //Reset the state
      this.setState(() => ({ title: '' }))
       this.props.navigation.goBack()       
    }

  render(){  
    return (
      <View style={styles.container}>
        <View>  
          <Text>{JSON.stringify(this.state, this.props.decks)}</Text>     
          <Text style={styles.title} >What is the name of your new deck?</Text>   
        <TextInput
          style={styles.textInput}
          placeholder="Type here the title of your new Deck!"
          onChangeText={(title) => this.setState({title})}
        />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.submit}><Text style={styles.title}>Submit</Text></TouchableOpacity>
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
  }
}



export default connect(mapStateToProps)(NewDeck)