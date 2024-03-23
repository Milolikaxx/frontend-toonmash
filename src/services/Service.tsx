import axios from "axios";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
import { PictureGetResponse } from "../model/pic_get_res";
import { VotePostResponse } from "../model/vote_post_res";
import { UploadPostResponse } from "../model/upload_post_res";
import { PictureByDateGetResponse } from "../model/picbydate_get_res";

// export const HOST = "http://localhost:3001";
export const HOST = "https://backend-toonmash-1.onrender.com";

export class Service {
  //authen
  async login(username: string, pwd: string) {
    const url = HOST + "/user/login";
    const body = {
      username: username,
      password: pwd,
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
  //user
  async register(username: string, name: string, pwd: string, img: string) {
    const url = HOST + "/user";
    const body = {
      username: username,
      name: name,
      password: pwd,
      img: img,
      type: 0
    };
    const response = await axios.post(url, body);
    if (response.status == 201) {
      const user: UserGetPostResponse = response.data;
      return user;
    } else {
      console.log("login faild");
      return null;
    }
  }
  async saveEdit(id:number,username: string, name: string, pwd: string, img: string) {
    const url = HOST + "/user/"+id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body:any = {
      username: username,
      name: name,
    }
    if (pwd != "") {
      body.password = pwd
    }
    if (img != "") {
      body.img = img
    }
    console.log(body);
    const response = await axios.put(url, body);
    if (response.status == 201) {
      return 1;
    } else {
      console.log("edit failed");
      return 0;
    }
  }
  async getAllUser() {
    const url = HOST + "/user";
    const response = await axios.get(url);
    if (response.status == 200) {
      const user: UserGetPostResponse[] = response.data;
      return user;
    } else {
      console.log("failed data ");
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
      console.log("failed data ");
      return null;
    }
  }
  //pic
  async getAllPic() {
    const url = HOST + "/pic";
    const response = await axios.get(url);
    if (response.status == 200) {
      const pics: PictureGetResponse[] = response.data;
      return pics;
    }else{
      return [];
    }
  }
  async getPicRankDayAgo() {
    const url = HOST + "/pic/totalago";
    const response = await axios.get(url);
    if (response.status == 200) {
      const pics: PictureGetResponse[] = response.data;
      return pics;
    }else{
      return [];
    }
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
  async getPicScoreByDate(id: number) {
    const url = HOST + `/vote/date?id=${id}`;
    const response = await axios.get(url);
    if (response.status == 200) {
      const pics: PictureByDateGetResponse[] = response.data;
      return pics;
    }else{
      return [];
    }
  }
  async getPicScore7DateAgos(id: number) {
    const url = HOST + `/vote/totalagos?id=${id}`;
    const response = await axios.get(url);
    if (response.status == 200) {
      const pic: PictureByDateGetResponse = response.data;
      return pic;
    }else{
      return null;
    }
  }
  async addNewPic(uid: number, img: string) {
    const url = HOST + "/pic";
    const body = {
      user_id: uid,
      img: img,
    };
    const response = await axios.post(url, body);
    const res: VotePostResponse = response.data;
    return res.affected_row;
  }
  async changePic(id: number, img: string) {
    const url = HOST + `/pic/${id}`;
    const body = {
      img: img,
    };
    const response = await axios.put(url, body);
    const res: VotePostResponse = response.data;
    return res.affected_row;
  }
  async delByID(id: number) {
    const url = HOST + `/pic/${id}`;
    const response = await axios.delete(url);
    const pic: PictureGetResponse = response.data;
    return pic;
  }
  async uploadPic(file: File) {
    const url = HOST + "/upload";
    const formData = new FormData();
    formData.append("filename", file);
    const response = await axios.post(url, formData);
    const res: UploadPostResponse = response.data;
    return res.url;
  }

  //vote
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
}
