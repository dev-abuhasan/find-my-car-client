const HOST = process.env.REACT_APP_HOST;

export const POST_SIGNIN = `${HOST}/users/login`;
export const POST_SIGNUP = `${HOST}/users/register`;
export const POST_ACTIVE = `${HOST}/users/activation`;


// search - history
export const GET_SEARCH_HISTORY = `${HOST}/search`; /**?pageNumber=1 */