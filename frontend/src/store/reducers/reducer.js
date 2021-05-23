import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    type: actionTypes.HELLO_WORLD,
	helloWorld : "false",
};

const helloWorldReducer = (state, action) => {
	return updateObject(state, {
		helloWorld : action.helloWorld
	});
};

const reducer = (state=initialState, action) => {
	switch(action.type) {
		case actionTypes.HELLO_WORLD: return helloWorldReducer(state,action);
		default:
			return state;
	}
}

export default reducer