import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import Post from "./components/Post.jsx";
import Login from "./components/Login.jsx";
// import Logout from "./components/Logout.jsx";
import Write from "./components/Write.jsx";
import Register from "./components/Register.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App></App>}>
        <Route path="" element={<Home></Home>}></Route>
        <Route path="post/:id" element={<Post></Post>}></Route>
        <Route path="write" element={<Write/>}></Route>
      </Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
