import { SET_USER, SET_FAMILY, ADD_MEMBER, CHANGE_MEMBER, SUBTRACT_MEMBER, ADD_EVENT, SUBTRACT_EVENT, CHANGE_EVENT, CHANGE_FAMILY } from '../actions/userActions';

const initialState = {
  user: '',
  family: {},
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_FAMILY:
      return { ...state, family: action.payload };
    case CHANGE_FAMILY:
      return { ...state, family: { ...state.family, name: action.payload.name } };
    case ADD_MEMBER:
      return { ...state, family: { ...state.family, members: { ...state.family.members, items: [...state.family.members.items, action.payload] } } };
    case CHANGE_MEMBER:
      return { ...state, 
        family: { ...state.family, members: 
          { ...state.family.members, 
            items: state.family.members.items.map(item => {
              if(action.payload.id === item.id) return action.payload;
              return item;
            }) 
          } 
        } 
      };
    case SUBTRACT_MEMBER:
      return { ...state, 
        family: { ...state.family, members: 
          { ...state.family.members, 
            items: state.family.members.items.filter(item => action.payload.id !== item.id) 
          } 
        } 
      };
    case ADD_EVENT:
      return { ...state, 
        family: { ...state.family, members: 
          { ...state.family.members, 
            items: state.family.members.items.map(item => {
              if(action.payload.memberID === item.id) {
                item.events.items = [...item.events.items, action.payload];
              }
              return item;
            })  
          } 
        } 
      };
    case CHANGE_EVENT:
      return { ...state, 
        family: { ...state.family, members: 
            { ...state.family.members, 
              items: state.family.members.items.map(item => {
                if(action.payload.memberID === item.id) {
                  if(!(item.events.items.find(event => action.payload.id === event.id))) {
                    state.family.members.items.map(item => {
                      if(action.payload.oldMember === item.id) {
                        item.events.items = item.events.items.filter(event => action.payload.id !== event.id);
                      }
                      return item;
                    }); 
                    item.events.items = [...item.events.items, action.payload];
                  }
                  else item.events.items = item.events.items.map(event => {
                    if(action.payload.id === event.id) return action.payload;
                    return event;
                  }); 
                }
                return item;
              })  
            } 
        } 
      };
    case SUBTRACT_EVENT:
      return { ...state, 
        family: { ...state.family, members: 
            { ...state.family.members, 
              items: state.family.members.items.map(item => {
                if(action.payload.memberID === item.id) {
                  item.events.items = item.events.items.filter(event => action.payload.id !== event.id);
                }
                return item;
              })  
            } 
        } 
      };
    default:
      return state;
  }
}
