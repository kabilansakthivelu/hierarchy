import React, {useContext, useState, useEffect} from 'react';
import {data} from '../../data';
import {useNavigate} from 'react-router-dom';
import {ValuesContext} from '../../App';
import './Edit.css';

const Edit = () => {

  const {showEmployee, nameRef, emailRef, phoneRef} = useContext(ValuesContext);

  const [updatedDetails, setUpdatedDetails] = useState({});

  const navigate = useNavigate();

  const cancelCTABtn = () =>{
      navigate("/");
  }

  useEffect(()=>{
    nameRef.current.value = showEmployee.name;
    if(!showEmployee.isTeam){
      emailRef.current.value = showEmployee.email;
      phoneRef.current.value = showEmployee.phone;
    }
  }, [])

  const updateInfo = () =>{
    let updateMember;
    let array = [];
    const name = nameRef.current.value;
    if(!showEmployee.isTeam){
    const phone  = phoneRef.current.value;
    const email = emailRef.current.value;
    if((email !== "") && (phone !== "") && (name !== "")){
    updateMember = {
      ...showEmployee,
      "name": name,
      "phone": phone,
      "email": email,
    }
    }
    }
    else{
      if(name !== ""){
          updateMember = {
          ...showEmployee,
          "name": name,
    }
    }
    }
    const update = (arr) =>{
        array = arr.map((item)=>{
        if(item.id === updateMember.id){
        return item = updateMember;
        }
        else if(item.children){
          return update(item.children)
        }
        else {
        return item;
        }
    })
    return array;
    }
    update(data.employees);
    navigate("/");  
  }

  return (
  <div className="singleEmployeeView">
  <div className="employeeDetails">
  <label className="fieldName" htmlFor="name">Name</label>
  <input ref={nameRef} className="inputField" required type="text" name="name" id="name" maxLength="12" ref={nameRef}/><br />
  {!showEmployee.isTeam &&
  <div>
  <label className="fieldName" htmlFor="email">Email</label>
  <input required ref={emailRef} className="inputField" type="email" name="email" id="email"  ref={emailRef}/><br />
  <label className="fieldName" htmlFor="phone">Phone</label>
  <input ref={phoneRef} className="inputField" required type="number" name="phone" id="phone" ref={phoneRef}/><br />
  <div className="profileDetails">
  <label className="fieldName" htmlFor="designation">Designation</label>
  <p>{showEmployee.designation}</p>
  </div>
  </div>
  }
  <br />
  <button className="homePageCTABtn" onClick={updateInfo}>Save</button><br />
  <button className="homePageCTABtn" onClick={cancelCTABtn}>Cancel</button>
  </div>
  </div>
  );
};

export default Edit;
