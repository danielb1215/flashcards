export const GET_DECKS = 'GET_DECKS'
export const ADD_NEWDECK = 'ADD_NEWDECK'
export const NEW_QUESTION = 'NEW_QUESTION'
export function receiveEntries(entries){
    return{
        type: GET_DECKS,
        entries,

    }
} 
export function addNewDeck(entry){
    return{
        type: ADD_NEWDECK,
        entry,
    }
} 
export function newQaction (params){
    return{
        type: NEW_QUESTION,
        params,
    }
} 