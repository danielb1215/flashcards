import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';

class SingleDeck extends Component {
    render() {
        const { questions, title } = this.props;

        return <View style={styles.card}>
            <View style={styles.center}>
                <Text style={{fontSize: 22}}>{title}</Text>
                <Text style={{fontSize: 10, color: 'black'}}>
                    {questions && questions.length} Cards
                </Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        marginTop: 12,
        height: 80,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    center:{
        justifyContent: 'center', 
        alignItems: 'center'
    }
});
export default SingleDeck