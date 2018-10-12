import mocha from 'mocha';
import { createStore } from 'redux';
import chai from 'chai';
import deepFreeze from 'deep-freeze';
import BotReducer from '../index'

const should = chai.should();
const assert = chai.assert;
const dateFormat = require('dateformat');

describe('BOT APP should', function () {
  it('add user converstion to conversation history', function () {
    const initialState = deepFreeze({
      user: "",
      access_token: "",
      conversation_history: [],
      intent: {
        text: "",
        slugs: [],
        entities: []
      },
      intent_history: [],
      status:false
    });

    const store = createStore(BotReducer, initialState);
    store.dispatch({
      type: 'USER_SENT_MESSAGE',
      text: {
        user: "hi",
        timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
      }
    });

    console.log(store.getState());
    // chai.strictEqual(true, true, 'these booleans are strictly equal');

  }),

    it('add access token', function () {
      const initialState = deepFreeze({
        user: "",
        access_token: "",
        conversation_history: [],
        intent: {
          text: "",
          slugs: [],
          entities: []
        },
        intent_history: [],
        status:false
      });

      const store = createStore(BotReducer, initialState);
      const action = store.dispatch({
        type: 'SET_TOKEN',
        token: '123456'
      });

      console.log(store.getState());
      store.getState().should.have.property('access_token').to.be.sealed;
      store.getState().should.have.property('access_token').to.deep.equal(action.token);
      assert.strictEqual(store.getState().access_token, action.token, 'access tokens are strictly equal');
      store.getState().should.have.property('status').to.equal(true);
    }),

    it('set user', function () {
      const initialState = deepFreeze({
        user: "",
        access_token: "123456",
        conversation_history: [],
        intent: {
          text: "",
          slugs: [],
          entities: []
        },
        intent_history: [],
        status:false
      });

      const store = createStore(BotReducer, initialState);
      const action = store.dispatch({
        type: 'SET_USER',
        user: "Chhavi"
      });

      console.log(store.getState());
      store.getState().should.have.property('user').to.be.sealed;
      store.getState().should.have.property('access_token').to.be.sealed;
      assert.strictEqual(store.getState().user, action.user, 'access tokens are strictly equal');
      store.getState().should.have.property('status').to.equal(true);
    })

  it('add current intent', function () {
    const initialState = deepFreeze({
      user: "",
      access_token: "",
      conversation_history: [],
      intent: {
        text: "hello",
        slugs: ["greetings"],
        entities: ["notApplicable"]
      },
      intent_history: [],
      status:false
    });

    const store = createStore(BotReducer, initialState);

    const action = store.dispatch({
      type: 'ADD_INTENT',
      text: "access Token",
      slugs: ["token"],
      entities: ["Token name"]
    });

    console.log(store.getState());
    store.getState().should.have.property('status').to.equal(true);
  }),

  // MAIN FUNCTION STARTS

  it('bot reply to greeting hi', function () {
    const initialState = deepFreeze({
      user: "",
      access_token: "",
      conversation_history: [{
          user: "hi",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        }, 
      ],
      intent: {
        text: "hi",
        slugs: "greetings",
        entities: [""]
      },
      intent_history: [],
      status:false
    });

    const store = createStore(BotReducer, initialState);

    store.dispatch({
      type: 'BOT_REPLY'
    });

    console.log(store.getState()); 
  }),

  it('bot reply to wrong access token', function () {
    const initialState = deepFreeze({
      user: "",
      access_token: "",
      conversation_history: [{
          user: "hi",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        },
        {
          bot1: "please provide access tokens",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT"),
        },
        {
          user: "blah blah",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        }
      ],
      intent: {
        text: "blah blah",
        slugs: "",
        entities: [""]
      },
      intent_history: [],
      status:false
    });

    const store = createStore(BotReducer, initialState);

    store.dispatch({
      type: 'BOT_REPLY'
    });

    console.log(store.getState());
  }),

  it('bot reply to right access token', function () {
    const initialState = deepFreeze({
      user: "",
      access_token: "",
      conversation_history: [{
          user: "hi",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        },
        {
          bot1: "please provide access tokens",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT"),
        },
        {
          user: "123456",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        }
      ],
      intent: {
        text: "123456",
        slugs: "got token",
        entities: [""]
      },
      intent_history: [],
      status:false
    });

    const store = createStore(BotReducer, initialState);

    store.dispatch({
      type: 'BOT_REPLY'
    });

    console.log(store.getState());
  }),

  it('bot reply to create repo without repo name', function () {
    const initialState = deepFreeze({
      user: "",
      access_token: "",
      conversation_history: [{
          user: "hi",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        },
        {
          bot1: "please provide access tokens",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT"),
        },
        {
          user: "123456",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        },
        {
          bot: "Thank you. What you want me to do for you ?",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        },
        {
          user: "create a Repo on github",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        }
      ],
      intent: {
        text: "create a repo",
        slugs: "repo",
        entities: [""]
      },
      intent_history: [],
      status:false
    });

    const store = createStore(BotReducer, initialState);

    store.dispatch({
      type: 'BOT_REPLY'
    });

    console.log(store.getState());
  }),

  it('bot reply to created repo with repo name', function () {
    const initialState = deepFreeze({
      user: "",
      access_token: "",
      conversation_history: [{
          user: "hi",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        },
        {
          bot1: "please provide access tokens",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT"),
        },
        {
          user: "123456",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        },
        {
          bot: "Thank you. What you want me to do for you ?",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        },
        {
          user: "create a Repo on github ",
          timestamp: dateFormat(new Date, "dddd, dS mmmm, yyyy, h:MM:ss TT")
        }
      ],
      intent: {
        text: "Github Bot",
        slugs: "repo",
        entities: ["reponame"]
      },
      intent_history: [],
      status:false
    });

    const store = createStore(BotReducer, initialState);

    store.dispatch({
      type: 'BOT_REPLY'
    });

    console.log(store.getState());
  })

})