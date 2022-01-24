import React, {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {ValuesContext} from '../../App';
import './View.css';

const View = () => {

  const {showEmployee} = useContext(ValuesContext);

  const navigate = useNavigate();

  const homePageCTABtn = () =>{
      navigate("/");
  }

  return (
  <div className="singleEmployeeView">
  <div className="employeeDetails">
  <h1><b>Name:</b> {showEmployee.name}</h1>
  <h1><b>Designation:</b> {showEmployee.designation}</h1>
  <h1><b>Employee ID:</b> {showEmployee.id}</h1>
  <h1><b>Email ID:</b> {showEmployee.email}</h1>
  <h1><b>Phone:</b> {showEmployee.phone}</h1>
  <button className="homePageCTABtn" onClick={homePageCTABtn}>Home Page</button>
  </div>
  </div>
  );
};

export default View;
