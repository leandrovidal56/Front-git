  export default function newRepository(state = [], action){
    console.log(state)
    switch(action.type){
      case 'ADD_TO_LIST':
        return [...state, action.newRepository];
      default:
        return state;
    }
  }
// }
