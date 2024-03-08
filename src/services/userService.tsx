import axios from "axios";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
import { PictureGetResponse } from "../model/pic_get_res";
import { VotePostResponse } from "../model/vote_post_res";
import { UploadPostResponse } from "../model/upload_post_res";

export const HOST = "http://localhost:3001";

export class UserService {
  // user = useRef<UserGetPostResponse | undefined>(undefined);
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
  async addNewPic(uid:number,img:string) {
    const url = HOST + "/pic";
    const body = {
      user_id: uid,
      img: img
    };
    const response = await axios.post(url, body);
    const res: VotePostResponse = response.data;
    return res.affected_row;
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
    return aff;
  }
  async uploadPic(file:File){
    const url = HOST + "/upload";
    const formData = new FormData();
    formData.append("filename", file);
    const response = await axios.post(url, formData);
    const res: UploadPostResponse = response.data;
    return res.url;
  }
}
