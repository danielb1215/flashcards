import { AsyncStorage } from 'react-native'

export const STORAGE_KEY = 'decks:mobile-flashcards'

let dataInitial = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces',
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event',
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer:
                    'The combination of a function and the lexical environment within which that function was declared.',
            }
        ]
    },
    JavaScript1: {
        title: 'JavaScript1',
        questions: [
            {
                question: 'What is a closure?',
                answer:
                    'The combination of a function and the lexical environment within which that function was declared.',
            }
        ]
    }
}

export function fetchDeckResults() {
    return AsyncStorage.getItem(STORAGE_KEY)
    .then(resultados => {
        return resultados === null 
        ? initialData()
        : JSON.parse(resultados) 
    })
}

export function submitNewDeck(deck) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck))
}

export function NewQapi({card, deckName}) {
    return AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
        let decks = JSON.parse(result);

        let newQuestions = JSON.parse(JSON.stringify(decks[deckName].questions))
        newQuestions[newQuestions.length] = card;

        const value = JSON.stringify({
            [deckName]: {title: deckName, questions: newQuestions},
        })
        AsyncStorage.mergeItem(STORAGE_KEY, value)
    })
}

export function initialData(){
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataInitial))
    return dataInitial;
}

