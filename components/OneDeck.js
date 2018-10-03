import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { receiveEntries } from '../actions/index'
import { fetchDeckResults } from '../utils/api'

class OneDeck extends Component {
    render() {        
        const questions = this.props.decks[title] && this.props.decks[title].questions;
        const { title } = this.props.navigation.state.params

        return (
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 50}} > 
                    <Text style={{fontSize: 26}} >{title}</Text>
                    <Text style={{fontSize: 20}}>{questions} Cards
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('NewQuestion', {
                            title,
                            questions,
                        });
                    }}
                    style={styles.addCard} >
                    <Text style={styles.addTitle}>Add Question</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Quiz', {
                            title,
                            questions,
                        });
                    }}
                    style={styles.startQuiz}>
                    <Text style={styles.startTitle} >Start Quiz</Text>
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
    addCard: {
        backgroundColor: 'white',
        margin: 20,
        padding: 35,
        borderRadius: 2,
    },
    startQuiz: {
        backgroundColor: 'green',
        margin: 20,
        padding: 35,
        borderRadius: 2,
    },
    addTitle: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
    },
    startTitle: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
    }
})


function mapStateToProps(state) {
    return {
        decks: state,
    }
}

export default connect(mapStateToProps)(OneDeck);
