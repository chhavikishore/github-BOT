const dateFormat = require('dateformat');

export function setUser(state,action){
  return Object.assign({},state,{
    user : action.user,
    status:true
  });
}

export function setToken(state,action){
  return Object.assign({},state,{
    access_token : action.token,
    status:true
  });
}

export function addConversation(state,action){ 
  return Object.assign({},state,{
   conversation_history:[...state.conversation_history,action.text],
   status:true
  });
}

export function addIntent(state,action){ 
  const prevIntent = Object.assign({},{},state.intent);
  return Object.assign({},state,{
    intent_history:[...state.intent_history, prevIntent
    ],
    intent : {
              text:action.text,
              slugs:action.slugs,
              entities:action.entities
             },
    status:true
  });
}

export function botReply(state,action){
  
  switch(state.intent.slugs){
    
    case 'greetings':
      if(state.access_token) return Object.assign({},state,{
        conversation_history : [...state.conversation_history, {
          bot:"Hi, How may I help you ?",
          timestamp:dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        }],
        status:true
      });
      // will execute if accesss token is ** undefined , null and empty string
      return Object.assign({},state,{
          conversation_history : [...state.conversation_history, {
            bot:"Please provide access token",
            timestamp:dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
          }],
          status:true
        });
      
    case 'got token': return Object.assign({},state,{
        access_token : state.conversation_history[state.conversation_history.length - 1].user,
        conversation_history : [...state.conversation_history, {
          bot:"Thank you. How may I help you ?",
          timestamp:dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        }],
        status:true
      });
    case 'username': return Object.assign({},state,{
      user : state.conversation_history[state.conversation_history.length - 1].user,
      conversation_history : [...state.conversation_history, {
        bot:"Thank you. What you want me to do for you ?",
        timestamp:dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
      }],
      status:true
    });
    case 'repo': if(state.intent.entities) return Object.assign({},state,{
      conversation_history : [...state.conversation_history, {
        bot:"Successfully created repo " + state.intent.text + "on github",
        timestamp:dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
      }],
      status:true
    });
    return Object.assign({},state,{
      conversation_history : [...state.conversation_history, {
        bot:"Please provide Repo name ",
        timestamp:dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
      }],
      status:true
    });
      
    default: return Object.assign({},state,{
      conversation_history : [...state.conversation_history, {
        bot:"Sorry, I have not heard it before. Could you specify some related words.",
        timestamp:dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
      }],
      status:true
    });
  }
}