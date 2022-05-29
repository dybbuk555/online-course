//import jwt from "jwt-decode";
import { AxiosRequestHeaders } from "axios";
// HeadersDefaults 
export interface AutherHeaderType extends AxiosRequestHeaders {
  Authorization:string
}

export function authHeader():AutherHeaderType {
  try {
    const userData = localStorage.getItem("user")
    if(typeof userData === 'string'){
      const user = JSON.parse(userData);
      //const jwtDecoded = jwt(user.jwtToken);
      if (user && user.jwtToken) {
        return { Authorization: "Bearer " + user.jwtToken,}
      } else {
        console.log("fail to get token");
      }

    }

  } catch (error) {
    console.log("fail to parse token or token expried");
  }
  return {Authorization:"",};
}
