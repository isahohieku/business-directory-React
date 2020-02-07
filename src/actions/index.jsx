import { CHANGE_AUTH } from './types';

export function changeAuth(isLoggedIn) {
    return {
        type: CHANGE_AUTH,
        payload: isLoggedIn 
    };
}