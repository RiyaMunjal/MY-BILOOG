import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import { REACT_APP_BACKEND_URL } from "../config";

const Post = () => {

  const Navigate=useNavigate()
  const { id } = useParams();
  const {state} = useLocation();

  // const posts = [

  //   {
  //     id: 1,
  //     title:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, cupiditate?",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus hic expedita saepe, ipsa doloremque numquam vitae sed sapiente reiciendis consequatur!",
  //     image:
  //       "https://images.pexels.com/photos/760281/pexels-photo-760281.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   },
  //   {
  //     id: 2,
  //     title:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, cupiditate?",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus hic expedita saepe, ipsa doloremque numquam vitae sed sapiente reiciendis consequatur!",
  //     image:
  //       "https://images.pexels.com/photos/1132040/pexels-photo-1132040.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   },
  //   {
  //     id: 3,
  //     title:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, cupiditate?",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus hic expedita saepe, ipsa doloremque numquam vitae sed sapiente reiciendis consequatur!",
  //     image:
  //       "https://images.pexels.com/photos/1414126/pexels-photo-1414126.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   },
  //   {
  //     id: 4,
  //     title:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, cupiditate?",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus hic expedita saepe, ipsa doloremque numquam vitae sed sapiente reiciendis consequatur!",
  //     image:
  //       "https://images.pexels.com/photos/952476/pexels-photo-952476.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   },
  // ];
  const [posts, setPosts]=useState([]);
  const [post, setPost] = useState({});
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${REACT_APP_BACKEND_URL}/api/post/${id}`);
      setPost(result.data[0]);
    };
    fetchData();
  }, [id]);

  useEffect(()=>{
    const getAllposts=async()=>{
      try{
        const res=await axios.get(`${REACT_APP_BACKEND_URL}/api/post/?cat=${state.cat}`)
        setPosts(res.data)
        console.log(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getAllposts()
    
  }, [])

  const deleteHandler=async()=>{

    const res=await axios.delete(`${REACT_APP_BACKEND_URL}/api/post/${id}`, {
      withCredentials:true
    })
    Navigate('/')
  }

  return (
    <div className="post">
      <div className="left">
        <div className="image">
          <img src={`../uploads/${post?.image}`} alt="image"></img>
        </div>
        <div className="user">
          <div className="image">
            {post.userimg && <img src={post.user_img} alt="img" />}
          </div>
          <div className="usercontent">
            <div className="username">{post?.name}</div>

            <div className="text">Posted {moment(post?.date).fromNow()}</div>
          </div>

          {user?.name == post.name && (
            <div className="buttons">
              <Link
                to="/write"
                state={post}
              >
                <div className="edit">
                  <img src="https://cdn-icons-png.flaticon.com/128/1828/1828911.png"></img>
                </div>
              </Link>

              <button onClick={deleteHandler}>
                <div className="delete">
                  <img src="https://cdn-icons-png.flaticon.com/128/9790/9790368.png"></img>
                </div>
              </button>
            </div>
          )}
        </div>

        <h1>{post?.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post?.description),
          }}
        ></div>
      </div>

      <div className="right">
        <h1>Other posts you may like</h1>
      
       <div className="rightsecond">
        {posts.map((p) => (
          <div className="eachpost" key={p?.id}>
            <img src={`../uploads/${p?.image}`} alt="image" className="image" />
            <div className="title">{p?.title}</div>
            <button onClick={()=>{Navigate(`/post/${p?.id}`)}}>Read more</button>
          </div>

        ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
