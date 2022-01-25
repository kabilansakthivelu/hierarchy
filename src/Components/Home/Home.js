import React, {useContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {ValuesContext} from '../../App';
import {BsThreeDots} from 'react-icons/bs';
import "./Home.css";

const Home = ({ data }) => {
  //Data is being passed to Home component via props
  //And if there are teams under a head, then Home component is called recursively

  const {setShowEmployee} = useContext(ValuesContext);

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

   const showEmployeeDetails = (item) =>{
    if(item.designation){
    setShowEmployee(item);
    navigate("/view");
    }
  }

  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.id} className="hierarchy">
            <div className="card" 
            onMouseEnter={()=>{document.getElementById(item.id).style.display = "block"}} 
            onMouseLeave={()=>{document.getElementById(item.id).style.display = "none"}}>
              <BsThreeDots className="moreOptionsIcon" id={item.id} onClick={()=>setShowMenu(!showMenu)}/>
              <h1><b>{item.name}</b></h1>
              <p><i>{item.designation}</i></p>
            </div>
            {showMenu && 
             (<div className="menuModal" id={item.id}>
            <p className="menus">View</p><hr />
            <p className="menus">Edit</p>
            {(item.designation === "Team Member") &&
            <div>
            <hr />
            <p className="menus">Delete</p>
            </div>
            }
            </div>
            )}
            {item.children && <Home data={item.children} />}
          </div>
        );
      })}
    </div>
  );
};

export default Home;

//onClick={()=>{showEmployeeDetails(item)}}