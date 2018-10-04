import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const STORAGE_KEY = 'decks:mobile-flashcards'
const NOTIFICATION_KEY = 'UdaciFitness:notifications'

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
//making the api I used some info from the course: https://classroom.udacity.com/nanodegrees/nd019/parts/580105de-1f39-4975-866d-4f430f1aef1d/modules/be422d8e-8927-496d-b203-1868289e90c5/lessons/4df595e8-bd65-435e-ad88-0db5d27c44a2/concepts/860caf55-6839-4775-b0cb-f3bc201e4a2f
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

//Notifications  //All of this information taken by the Fitnnessapp 'https://classroom.udacity.com/nanodegrees/nd019/parts/580105de-1f39-4975-866d-4f430f1aef1d/modules/be422d8e-8927-496d-b203-1868289e90c5/lessons/8b4d3cba-8e1b-4a7b-9065-dacce0b095e5/concepts/b7e96b91-0309-46fc-af2a-83109d86b27a' 


export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  function createNotification () {
    return {
      title: 'Daily Quiz!',
      body: "Do not forget to take your daily quiz!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
  
  export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }