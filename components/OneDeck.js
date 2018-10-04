import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { receiveEntries } from '../actions/index'
import { fetchDeckResults } from '../utils/api'

class OneDeck extends Component {
    render() {        
        const { title, questions } = this.props.navigation.state.params

        return (
            <View style={styles.container}>
                <View style={styles.tittle} > 
                    <Text style={{fontSize: 26}} >{title}</Text>
                    <Text style={{fontSize: 20}}>{questions && questions.length} Cards </Text>
                </View>
                <TouchableOpacity
                        //When you click on add new question you'll be redirect to NewQuestion component sending the info (title, questions)
                    onPress={() => {this.props.navigation.navigate('NewQuestion', { title, questions })}}
                    style={[styles.buttons, { backgroundColor: 'white'}]} >
                    <Text style={styles.titles}>Add new question</Text>
                </TouchableOpacity>

                <TouchableOpacity
                 //When you click on start quiz you'll be redirect to Quiz component sending the info (title, questions)
                    onPress={() => { this.props.navigation.navigate('Quiz', { title, questions })}}
                    style={[styles.buttons, { backgroundColor: 'green'}]}>
                    <Text style={styles.titles}>Start quiz</Text>
                </TouchableOpacity>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    buttons: {
        margin: 20,
        padding: 35,
        borderRadius: 2,
    },
    titles: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
    },
    tittle: { 
        justifyContent: 'center',
         alignItems: 'center', 
         flexDirection: 'column',
          padding: 50
        }
})


function mapStateToProps(state) {
    return {
        decks: state,
    }
}

export default connect(mapStateToProps)(OneDeck)
