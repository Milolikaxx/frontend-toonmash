import { useEffect, useMemo, useRef, useState } from "react";
import { UserService } from "../services/userService";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
import { useNavigate } from "react-router-dom";

function UploadImgPage() {
  const userService = useMemo(() => {
    return new UserService();
  }, []);
  const navigate = useNavigate();
  const user = useRef<UserGetPostResponse | undefined>(undefined);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const updateImagePreviews = () => {
      if (!image) {
        setImageUrl(undefined);
        return;
      }
      const newImagePreview = URL.createObjectURL(image);
      setImageUrl(newImagePreview);
    };
    updateImagePreviews();
  }, [image]);

  useEffect(() => {
    const loadData = async () => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          user.current = JSON.parse(userStr);
        }else{
            navigate("")
        }
    }
    loadData()
  },[navigate])

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = event.target.files?.[0];
    if (!newImage) {
      console.error("No image file selected");
      return;
    }
    setImage(newImage);
  };

  async function uploadFile(file: File) {
    const url = await userService.uploadPic(file)
    console.log(url);
    const aff = await userService.addNewPic(user.current!.uid,url)
    if (aff == 1) {
        navigate("/profile/" + user.current!.uid)
    }
  }
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-5">
      {imageUrl && <img className="h-64 w-64 object-cover" src={imageUrl} />}
      {/* <button type="button" className="text-white bg-violet-600 hover:bg-violet-500 active:bg-violet-700 hover:ring-2 ring-violet-600 transition duration-300 rounded-full px-3 py-2 prompt-regular">
        Choose Image
      </button> */}
      <input
        className="text-black rounded-lg"
        type="file"
        accept="image/*"
        onChange={onImageChange}
      />
      <button
        onClick={() => uploadFile(image!)}
        type="button"
        className="text-white bg-violet-600 hover:bg-violet-500 active:bg-violet-700 hover:ring-2 ring-violet-600 transition duration-300 rounded-full px-3 py-2 prompt-regular"
      >
        Upload Image
      </button>
    </div>
  );
}
export default UploadImgPage;
