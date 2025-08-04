import { User } from "@/types/auth"

const USER_KEY = 'user_data'

export function setUserData(userData: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
}

export function getUserData() {
    let userDataString = localStorage.getItem(USER_KEY);
    if(userDataString != null){
        return JSON.parse(userDataString);
    }
}

export function clearUserData() {
  localStorage.removeItem(USER_KEY);
}