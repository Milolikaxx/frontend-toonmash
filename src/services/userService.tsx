import axios from "axios";
import { UserGetPostResponse } from "../model/response/user_getpost_response";

const HOST: string = "http://localhost:3000";

export class UserService {
  async login(username: string, name: string) {
    const url = HOST + "/user/login";
    const body = {
      username: username,
      password: name,
    };
    const response = await axios.post(url, body);
    const user: UserGetPostResponse = response.data;
    return user;
  }
}
