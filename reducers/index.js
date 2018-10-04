import { GET_DECKS, ADD_NEWDECK, NEW_QUESTION } from '../actions'

 function entries( state = {}, action){
     //depending in the action that the action sent is a process for each one 
    switch(action.type){
        case GET_DECKS:
            return{
                ...state,
                ...action.entries
            }
        case ADD_NEWDECK:
            return{
                ...state,
                ...action.entry
            }
        case NEW_QUESTION:
            const { question, answer} = action.params
            const newQuestion = JSON.parse(JSON.stringify(action.params.questions)).concat([{question, answer}])
            return{ ...state,
                [action.params.title]: {...state[action.params.title], questions: newQuestion}
            }
        default:
            return state
    }
}
export default entries