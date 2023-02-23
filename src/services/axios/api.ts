const HOST = process.env.REACT_APP_HOST;

export const POST_SIGNIN = `${HOST}/users/login`;
export const POST_SIGNUP = `${HOST}/users/register`;
export const POST_ACTIVE = `${HOST}/users/activation`;
//Auth user
export const GET_USER_PROFILE = `${HOST}/users/profile`;
export const PUT_USER_PROFILE = `${HOST}/users/profile`;
//Admin User
export const GET_ALL_USER_PROFILE = `${HOST}/users/admin`;
export const GET_USER_PROFILE_BY_ID = `${HOST}/users/admin`;/** /:id */
export const PUT_USER_PROFILE_BY_ID = `${HOST}/users/admin`;/** /:id */
export const DEL_USER_PROFILE_BY_ID = `${HOST}/users/admin`;/** /:id */

//Auth User 
export const POST_UPLOAD_AVATAR = `${HOST}/upload/avatar`;/** file: avatar  */
export const POST_UPLOAD_CAR = `${HOST}/upload/car`;/** file: car */

/** CAR API */
export const GET_ALL_CARS = `${HOST}/cars`;
/**?pageNumber=${}&keyword=${}&sortPrice=${`highToLow`}&price=${}&seats=${}&startDate=${}&endDate=${}&priceStart=${}&priceEnd=${}&seatsStart=${}&seatsEnd=${}*/
export const GET_CARS_BY_ID = `${HOST}/cars`;/** /:id */
export const GET_CARS_OFFERS = `${HOST}/cars/offers-cars`; /**?pageNumber=1 */
export const GET_CARS_RECOMMEND = `${HOST}/cars/recommend-cars`; 
export const GET_CARS_MOST_LIKE = `${HOST}/cars/user-most-like`;
//Auth User CARS
export const POST_CAR_CREATE_BY_USER = `${HOST}/cars/create`;
export const GET_CAR_BY_USER = `${HOST}cars/user-car`;
export const GET_CARS_TOP_BY_USER = `${HOST}/cars/top-cars`;
export const PUT_CARS_USER_BY_ID = `${HOST}/cars/user-car`; /** /:id */
export const DEL_CARS_USER_BY_ID = `${HOST}/cars/user-car`; /** /:id */

//User Book marks auth
export const GET_BOOKMARKS = `${HOST}/bookmarks`;/** /:id */
export const POST_BOOKMARKS_CREATE = `${HOST}/bookmarks/create`;/** /:id */
export const DEL_BOOKMARKS_BY_ID = `${HOST}/bookmarks/delete`;/** /:id */

// search - history 
export const GET_SEARCH_HISTORY = `${HOST}/search`; /**?pageNumber=1 */
//for delete by id -> /:id  & delete -> /delete