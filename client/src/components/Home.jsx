import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import DOMPurify from 'dompurify'
import { REACT_APP_BACKEND_URL } from "../config";

const Home = () => {
  // const posts=[
  //     {
  //       id: 1,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, cupiditate?",
  //       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus hic expedita saepe, ipsa doloremque numquam vitae sed sapiente reiciendis consequatur!",
  //       image:"https://images.pexels.com/photos/760281/pexels-photo-760281.jpeg?auto=compress&cs=tinysrgb&w=600"
  //     } ,
  //     {
  //       id: 2,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, cupiditate?",
  //       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus hic expedita saepe, ipsa doloremque numquam vitae sed sapiente reiciendis consequatur!",
  //       image:"https://images.pexels.com/photos/1132040/pexels-photo-1132040.jpeg?auto=compress&cs=tinysrgb&w=600"
  //     }  ,
  //     {
  //       id: 3,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, cupiditate?",
  //       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus hic expedita saepe, ipsa doloremque numquam vitae sed sapiente reiciendis consequatur!",
  //       image:"https://images.pexels.com/photos/1414126/pexels-photo-1414126.jpeg?auto=compress&cs=tinysrgb&w=600"
  //     }  ,
  //     {
  //       id: 4,
  //       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, cupiditate?",
  //       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus hic expedita saepe, ipsa doloremque numquam vitae sed sapiente reiciendis consequatur!",
  //       image:"https://images.pexels.com/photos/952476/pexels-photo-952476.jpeg?auto=compress&cs=tinysrgb&w=600"
  //     }

  //   ]

  const location = useLocation();
  const [posts, setPosts] = useState([]);

  const cat = location.search;

  useEffect(() => {
    const getAllPost = async () => {
      try {
        const res = await axios.get(`${REACT_APP_BACKEND_URL}/api/post/${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllPost();
  }, [cat]);

  
  const miniDescription=(str)=>{
    const splitted=str.split(/\s+/);  

    const first25words=splitted.slice(0,100);
    const updated=first25words.join(" ");
    return updated;

  }

  return (
    <div className="home">
      {posts?.map((post) => (
        <div key={post.id} className="box">
          <div className="image">
            <img src={`../uploads/${post?.image}`} alt="image" />
          </div>

          <div className="content">
            <Link to={`post/${post.id}`} state={{cat: post?.cat}} className="title">
              <h1> {post?.title} </h1>
            </Link>

            <div dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(miniDescription(post?.description)),
          }}  ></div>

            <div className="button">
              <Link to={`post/${post.id}`} state={{cat: post?.cat}}>
                <button type="submit">Read More</button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <Footer></Footer>
    </div>
  );
};

export default Home;
