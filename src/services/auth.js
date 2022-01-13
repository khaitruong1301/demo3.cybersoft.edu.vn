import axiosClient from "./axiosClient";
import * as yup from "yup";
import { schemaContent } from "./schemaContent";
import axios from "axios";
import { TOKEN_CYBERSOFT } from "../utils/constants/config";

export const schema = yup.object().shape({
  email: schemaContent.email,
  password: schemaContent.password,
});

export const schemaSignup = yup.object().shape(schemaContent);

class AuthService {
  logIn(data) {
    return axios({
      url:'https://jiranew.cybersoft.edu.vn/api/Users/signin',
      method:'POST',
      data:data,
      headers:{
        'TokenCybersoft':TOKEN_CYBERSOFT
      }
    })
  }

  signUp(data) {
    return axiosClient.post("/api/Users/signup", data);
  }

  fetchMe(params) {
    return axiosClient.get("/api/Users/getUser", { params });
  }
}

export default AuthService;
