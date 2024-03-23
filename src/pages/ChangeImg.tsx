import { useEffect, useMemo, useRef, useState } from "react";
import { Service } from "../services/Service";
import { UserGetPostResponse } from "../model/response/user_getpost_response";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import secureLocalStorage from "react-secure-storage";
import { PictureGetResponse } from "../model/pic_get_res";
import { CircularProgress } from "@mui/material";
function ChangeImgPage() {
  const service = useMemo(() => {
    return new Service();
  }, []);
    const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const user = useRef<UserGetPostResponse | undefined>(undefined);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const pic = useRef<PictureGetResponse>();
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = event.target.files?.[0];
    if (!newImage) {
      console.error("No image file selected");
      return;
    }
    setImage(newImage);
  };
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
      try {
        const userStr = secureLocalStorage.getItem("user");
        if (userStr) {
          user.current = JSON.parse(userStr.toString());
          const resPic = await service.getPicByID(+id!);
          pic.current = resPic;
          setImageUrl(pic.current.img);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
      
    };
    loadData();
  }, [id, navigate, service]);

  
  async function uploadFile() {
    let url = "";
    if (image) {
      url = await service.uploadPic(image);
    } else {
      url = imageUrl!;
    }
    const aff = await service.addNewPic(user.current!.uid, url);
    if (aff == 1) {
      navigate("/profile/" + user.current!.uid);
    }
  }
  return (
     loading ? (
          <CircularProgress />
        ) : (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-5">
      <div className="w-full flex justify-center ">
        <ArrowBackIcon
          className="cursor-pointer text-black"
          onClick={() => {
            navigate(-1);
          }}
          sx={{ fontSize: 40 }}
        />
        <h1 className="ps-6 mb-3 font-sans text-4xl font-bold text-gray-900">
          Change your cartoon picture
        </h1>
      </div>

      {imageUrl != null ? (
        <>
          <img className="h-64 w-64 object-cover" src={imageUrl} />
          <div>
            <button
              type="button"
              className="text-white bg-violet-600 hover:bg-violet-500 active:bg-violet-700 hover:ring-2 ring-violet-600 transition duration-300 rounded-full px-3 py-2 prompt-regular"
            >
              <label htmlFor="file">change image</label>
            </button>

            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              style={{ display: "none" }}
            />
          </div>
        </>
      ) : (
        <>
        </>
      )}
      <div className="flex flex-row">
        <span className="text-black text-xl font-normal prompt-regular mr-4">
          Upload
        </span>
        <span className="text-black text-xl font-normal prompt-regular mr-4">
          or
        </span>
        <span
          className="text-black text-xl font-normal underline prompt-regular cursor-pointer"
          onClick={() => {
            const url = prompt("Image URL:");
            console.log(url);
            setImage(undefined);
            setImageUrl(url!);
            // insertPic(url!);
          }}
        >
          URL
        </span>
      </div>
      <button
        onClick={() => uploadFile()}
        type="button"
        className="text-white bg-violet-600 hover:bg-violet-500 active:bg-violet-700 hover:ring-2 ring-violet-600 transition duration-300 rounded-full px-3 py-2 prompt-regular"
      >
        Upload Image
      </button>
    </div>)
  );
}
export default ChangeImgPage;
