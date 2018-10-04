import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator , StackNavigator  } from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import OneDeck from './components/OneDeck'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'
import { red, orange, blue, lightPurp, pink, white, purple } from './utils/colors'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/api'
const Tabs = createMaterialTopTabNavigator ({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',      
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',     
    },
  },
})
const MainNavigator = StackNavigator ({
  Home: {
    screen: Tabs,
  },
  OneDeck: {
    screen: OneDeck,
  },
  NewQuestion:{
    screen: NewQuestion
  },
  Quiz:{
    screen: Quiz
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>          
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

