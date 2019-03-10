import axios from 'axios';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const RECEIVE_GITHUB_DATA = 'RECEIVE_GITHUB_DATA';

export function getData() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    return async dispatch => {
        const basicData = await axios.get(url);
        dispatch({ type: RECEIVE_DATA, payload: basicData.data });
    }
}

export function searchUserRepos(username) {
    console.log('username is: ', username);
    const url = `https://api.github.com/users/${username}/repos`
    return async dispatch => {
        try {
            const githubData = await axios.get(url);
            dispatch({ type: RECEIVE_GITHUB_DATA, payload: githubData.data });
        } catch(e) {
            console.log(e);
        }
    }
}