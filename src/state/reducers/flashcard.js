import {CREATE_CARD,DELETE_CARD} from "../constants/actionTypes.js"
import { v4 as uuidv4 } from 'uuid';

const INIT_STATE = [];

const cardReducer = (state = INIT_STATE, action) => {
  const uuid=uuidv4 ();
  switch (action.type) {

    case CREATE_CARD:
      let gid=action.payload.gid;
      return [...state,{...action.payload}];

        case DELETE_CARD:
    
  state=action.payload
          return  state;


    default:
      return state;
  }
};

export default cardReducer;