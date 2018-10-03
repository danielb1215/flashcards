import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries } from '../actions/index'
import { fetchDeckResults } from '../utils/api'
import Card from './Card'


class Decks  extends Component {
  componentDidMount() {
    //Here I made a search to bring all the information ofthe database
    const {dispatch} = this.props;
    fetchDeckResults().then(decks => dispatch(receiveEntries(decks)))
        .then(() => this.setState(() => ({ready: true})));
  }
  //https://facebook.github.io/react-native/docs/flatlist
  renderItem = ({item}) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={() =>
          //Here when the user press the 'button' is going to be redirect to the OneDeck component sending the info of the item
            this.props.navigation.navigate('OneDeck', item)}>
            <Card
                title={item.title}
                questions={item.questions}/>
        </TouchableOpacity>
    </View>
)
  render(){
      return (
        <View>
          { // Here I made a FlatList to render all the values that are inside of this.props.decks
           }
          <FlatList
            data={Object.values(this.props.decks)}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
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
  
export default connect(mapStateToProps)(Decks);