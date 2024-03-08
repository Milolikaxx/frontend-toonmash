import axios from "axios";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
import { PictureGetResponse } from "../model/pic_get_res";
import { VotePostResponse } from "../model/vote_post_res";

export const HOST = "http://localhost:3001";

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
  async getAllPic() {
    const url = HOST + "/pic";
    const response = await axios.get(url);
    const pics: PictureGetResponse[] = response.data;
    return pics;
  }
  async getPicByUID(uid: number) {
    const url = HOST + `/pic?uid=${uid}`;
    const response = await axios.get(url);
    const pic: PictureGetResponse[] = response.data;
    return pic;
  }
  async getPicByID(id: number) {
    const url = HOST + `/pic?id=${id}`;
    const response = await axios.get(url);
    const pic: PictureGetResponse = response.data;
    return pic;
  }
  async vote(
    winner: number,
    loser: number,
    scoreWin: number,
    scoreLose: number
  ) {
    const url = HOST + "/vote";
    const body = {
      winner: winner,
      loser: loser,
      scoreWin: scoreWin,
      scoreLose: scoreLose,
    };
    const response = await axios.post(url, body);
    const aff: VotePostResponse = response.data;
    console.log(aff.affected_row);
    return aff;
  }
}
