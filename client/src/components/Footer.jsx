import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <>
   <div className="footer">
    <div className="container">
        <div className="logo">
            <Link to="/"> 
               <img src="https://images.pexels.com/photos/326235/pexels-photo-326235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </Link>
           
        </div>

        <div className="text">
            Publish your passion , your way !!
        </div>

    </div>
   </div>
   </>
  )
}

export default Footer