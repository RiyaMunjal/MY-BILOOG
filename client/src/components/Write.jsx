import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Footer from "./Footer";
import { AuthContext } from "../context/authContext";
import momemt from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { REACT_APP_BACKEND_URL } from "../config";

const Write = () => {
  const { state } = useLocation();
  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const upload = async () => {
    try {
      console.log("upload function");
      const formdata = new FormData();
      formdata.append("file", file);
      const res = await axios.post(`${REACT_APP_BACKEND_URL}/upload`, formdata, {
        withCredentials:true
      });
      console.log(res.data);
      alert("File uplaoded");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async () => {
    try {
      console.log(1);
      const imgurl = file ? await upload() : null;
      console.log(imgurl);
      //title desc img cat user info-> uid (update, post id);
      console.log(2);
      console.log(state);
      const res = state
        ? await axios.put(`${REACT_APP_BACKEND_URL}/api/post/${state?.id}` , {
            title,
            description: value,
            img: imgurl,
            cat,
          }, {
            withCredentials:true
          }
        )
        : await axios.post(
            `${REACT_APP_BACKEND_URL}/api/post`,
            {
              title,
              description: value,
              img: imgurl,
              cat,
              // date: moment('YYYY-MM-DD hh:mm:ss')
            },
            {
              withCredentials: true,
            }
          );
      console.log(3);
      alert(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      <div className="left">
        <div className="left-up">
          <input
            type="text"
            className="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="left-down">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>

      <div className="right">
        <div className="right-up">
          <h1 className="publish">Publish</h1>
          <div className="box1">
            <span className="status">Status :</span>
            <span className="draft "> Draft</span>
          </div>
          <div className="box1">
            <span className="status">Visibility :</span>
            <span className="draft "> Public</span>
          </div>

          <div className="upload">
            <input
              style={{ display: "none" }}
              type="file"
              className="file"
              id="file"
              onChange={(e) => {
                setFile(e.target?.files[0]);
                alert("file uploaded");
              }}
            />
            <label htmlFor="file">Upload File</label>
          </div>

          <div className="buttons">
            <button className="btn1">Save as Draft</button>
            <button className="btn2" onClick={submitHandler}>
              Publish
            </button>
          </div>
        </div>
        <div className="right-down">
          <h1 className="category">Category</h1>
          <div className="themes">
            <div className="theme">
              <input
                type="radio"
                name="radio"
                value="art"
                checked={cat === "art"}
                onChange={() => setCat("art")}
              />
              <p className="art">Art</p>
            </div>
            <div className="theme">
              <input
                type="radio"
                name="radio"
                value="science"
                checked={cat === "science"}
                onChange={() => setCat("science")}
              />
              <p className="science">Science</p>
            </div>
            <div className="theme">
              <input
                type="radio"
                name="radio"
                value="technology"
                checked={cat === "technology"}
                onChange={() => setCat("technology")}
              />
              <p className="technology">Technology</p>
            </div>
            <div className="theme">
              <input
                type="radio"
                name="radio"
                value="cinema"
                checked={cat === "cinema"}
                onChange={() => setCat("cinema")}
              />
              <p className="cinema">Cinema</p>
            </div>
            
            <div className="theme">
              <input
                type="radio"
                name="radio"
                value="music"
                checked={cat === "music"}
                onChange={() => setCat("music")}
              />
              <p className="music">Music</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
