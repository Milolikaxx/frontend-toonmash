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
    if (response.status == 200) {
      const user: UserGetPostResponse = response.data;
      return user;
    } else {
      console.log("login faild");
      return null;
    }
  }
  async getAllUser() {
    const url = HOST + "/user";
    const response = await axios.get(url);
    if (response.status == 200) {
      const user: UserGetPostResponse[] = response.data;
      return user;
    } else {
      console.log("faild data ");
      return null;
    }
  }
  async getByID(id: number) {
    const url = HOST + "/user?id=" + id;
    const response = await axios.get(url);
    if (response.status == 200) {
      const user: UserGetPostResponse = response.data;
      return user;
    } else {
      console.log("faild data ");
      return null;
    }
  }
  async getByPicUID(id: number) {
    const url = HOST + "/pic/" + id;
    const response = await axios.get(url);
    if (response.status == 200) {
      const user: UserGetPostResponse = response.data;
      return user;
    } else {
      console.log("faild data ");
      return null;
    }
  }
}
