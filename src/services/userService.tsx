import axios from "axios";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
import { PictureGetResponse } from "../model/pic_get_res";
import { VotePostResponse } from "../model/vote_post_res";

export const HOST = "http://localhost:3000";

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
  async getPicByID(id:number){
    const url = HOST + `/pic?id=${id}`;
    const response = await axios.get(url);
    const pic: PictureGetResponse = response.data;
    return pic;
  }
  async vote(uid:number,pid:number,score:number,isWin:number){
    const url = HOST + "/vote";
    const body = {
      uid: uid,
      pid: pid,
      score:score,
      isWin:isWin
    };
    const response = await axios.post(url, body);
    const aff: VotePostResponse = response.data
    console.log(aff.affected_row)
    return aff;
  }
}
