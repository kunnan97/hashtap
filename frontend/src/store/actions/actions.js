import * as actionTypes from './actionTypes';

/**
 *
 * Sends an action to reducer to change hello world to true.
 * @memberof ReduxAction
 */
export const helloWorld = (text) => {
	return {
        type: actionTypes.HELLO_WORLD,
		helloWorld: text,
	}
}

