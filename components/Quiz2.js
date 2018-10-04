import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native'; 
import SwipeCards from 'react-native-swipe-cards';
import { connect } from 'react-redux';
 
//https://www.npmjs.com/package/react-native-swipe-cards
class Card extends Component {
  constructor(props) {
    super(props);
  }
  render(){
return(
  <View style={styles.container}>
    <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
      <Text>{this.props.question}</Text>
      <Text>{this.props.answer}</Text>
      <Text>{console.log(this.props.question)}</Text>
      <Text>{console.log(this.props.answer)}</Text>
    </View>
   </View> 
)
}
}
class Quiz extends React.Component {
    state = {
        questionIndex: 0,
        correctAnswers: 0,
        shouldShowAnswer: false,
    }  

  noMore = () =>{
    return (
      <View style={styles.card} >
        <Text>No More Cards</Text>
      </View>
    )
  }
  handleYup  = (card) => {
    console.log(`Yup for ${card.text}`)
    const {questionIndex, correctAnswers} = this.state;
    this.setState({questionIndex: questionIndex + 1, correctAnswers: correctAnswers + 1, shouldShowAnswer: false});
  }
  handleNope = (card) => {
    this.setState({questionIndex: this.state.questionIndex + 1});
    console.log(`Nope for ${card.text}`)
  }
  handleMaybe = (card) => {
    console.log(`Maybe for ${card.text}`)
    this.setState({shouldShowAnswer: !this.state.shouldShowAnswer});
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    const { questions } = this.props.navigation.state.params
    return (
         <View>
           {console.log(questions)}
      <SwipeCards
        cards={questions}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={this.noMore}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />     
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
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
  }
})
function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(Quiz)