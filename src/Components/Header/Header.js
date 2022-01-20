import React, {useState, useEffect} from 'react';
import {AiFillHome, AiFillFileAdd, AiOutlineSearch} from 'react-icons/ai';
import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {

  const [isMobileView, setIsMobileView] = useState(false);

  //screenSize function to determine the displayed window size

  const screenSize = () =>{
    if(window.innerWidth < 768){
      setIsMobileView(true);
    }
    else{
      setIsMobileView(false);
    }
  }

  //useEffect hook to call screenSize function on window resize

  useEffect(()=>{
    screenSize();
    window.addEventListener("resize", screenSize);
    return(()=>{
    window.removeEventListener("resize", screenSize);  
    })
  }, [])

  return (
  <div className="header">

  {/* App title  */}

  <Link className="title" to="/">Organisation Hierarchy</Link>

  {/* Navbar menu */}

  <div className="navbarIcons">
  <Link to="/">{isMobileView ? <AiFillHome/> : <p>Home</p>}</Link>
  <Link to="/add">{isMobileView ? <AiFillFileAdd/> : <p>Add</p>}</Link>
  <Link to="/search">{isMobileView ? <AiOutlineSearch/> : <p>Search</p>}</Link>
  </div>
  </div>
  );

};

export default Header;
