import React, {useContext} from "react";
import {useNavigate} from 'react-router-dom';
import {ValuesContext} from '../../App';
import "./Home.css";

const Home = ({ data }) => {
  //Data is being passed to Home component via props
  //And if there are teams under a head, then Home component is called recursively

  const {setShowEmployee} = useContext(ValuesContext);

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
            <div className="card" onClick={()=>{showEmployeeDetails(item)}}>
              <h1><b>{item.name}</b></h1>
              <p><i>{item.designation}</i></p>
            </div>
            {item.children && <Home data={item.children} />}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
