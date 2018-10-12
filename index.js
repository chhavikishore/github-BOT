import { 
  addConversation, 
  addIntent, 
  setToken, 
  setUser,
  botReply,
 } from './reducer'

export default function(state={},action){
  switch(action.type){ 
    case 'USER_SENT_MESSAGE': //to add/save conversation to state
      return addConversation(state, action);
    case 'ADD_INTENT': //to add curent intent in state
      return addIntent(state,action);
    case 'SET_TOKEN': //to add user access key
      return setToken(state,action);
    case 'SET_USER': //to add username
      return setUser(state,action);
    case 'BOT_REPLY':
      return botReply(state,action);
    default:
      return state
  }
}