const STORAGE_KEY = 'user-token';
const USER_KEY_ID = 'user-key';
const USER_KEY_ROLE = 'user-role';

//Token
export function storeToken(token){
    localStorage.setItem(STORAGE_KEY,token);
}
export function getToken(){
    return localStorage.getItem(STORAGE_KEY);
}
export function removeToken(){
    localStorage.removeItem(STORAGE_KEY);
}


//ID
export function storeID(userid){
    localStorage.setItem(USER_KEY_ID,userid);
}
export function removeId(){
    localStorage.removeItem(USER_KEY_ID);
}
export function getUserId(){
    return localStorage.getItem(USER_KEY_ID);
}

//ROLE
export function storeRole(userRole){
    localStorage.setItem(USER_KEY_ROLE,userRole);
}
export function removeRole(){
    localStorage.removeItem(USER_KEY_ROLE);
}
export function getUserRole(){
    return localStorage.getItem(USER_KEY_ROLE);
}

export function removeALL(){
    removeId();
    removeToken();
    removeRole();
}