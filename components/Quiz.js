import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native'; 
import SwipeCards from 'react-native-swipe-cards';
import { connect } from 'react-redux';
import { receiveEntries } from '../actions/index'
import { fetchDeckResults } from '../utils/api'
 
//https://www.npmjs.com/package/react-native-swipe-cards
class Card extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
        <Text>{this.props.decks.title}</Text>
      </View>
    )
  }
}
 
class NoMoreCards extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        fetchDeckResults().then(decks => dispatch(receiveEntries(decks)))
            .then(() => this.setState(() => ({ready: true})));
    }
  constructor(props) {
    super(props); 
  }
 
  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}
 
class Quiz extends Component {
  constructor(props) {
    super(props);
    /*
    this.state = {
      cards: [
        {text: 'Tomato', backgroundColor: 'red'},
        {text: 'Aubergine', backgroundColor: 'purple'},
        {text: 'Courgette', backgroundColor: 'green'},
        {text: 'Blueberry', backgroundColor: 'blue'},
        {text: 'Umm...', backgroundColor: 'cyan'},
        {text: 'orange', backgroundColor: 'orange'},
      ]
    }; */
    this.state = {
        questionIndex: 0,
        correctAnswers: 0,
        shouldShowAnswer: false,
    };
  }
 
  handleYup (card) {
    console.log(`Yup for ${card.text}`)
    const {questionIndex, correctAnswers} = this.state;
    this.setState({questionIndex: questionIndex + 1, correctAnswers: correctAnswers + 1, shouldShowAnswer: false});
  }
  handleNope (card) {
    this.setState({questionIndex: this.state.questionIndex + 1});
    console.log(`Nope for ${card.text}`)
  }
  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
    this.setState({shouldShowAnswer: !this.state.shouldShowAnswer});
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
         <View>
      <SwipeCards
        cards={Object.values(this.props.decks)}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
 
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
     
          <Text>{this.state.correctAnswers}</Text>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
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