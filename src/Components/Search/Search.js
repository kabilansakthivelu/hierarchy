import React, {useContext, useState} from 'react';
import {ValuesContext} from '../../App';
import './Search.css';

const Search = () => {

  const {allEmployees} = useContext(ValuesContext);

  const [searchKey, setSearchKey] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  //Pushing all the employees details in one array

  const allEmployeesArray = [];

  const fetchingAllEmployees = (data) =>{
    data.forEach((item)=>{
      allEmployeesArray.push(item);
      if(item.children){
        fetchingAllEmployees(item.children);
        }
    })
  }
  fetchingAllEmployees(allEmployees);

  const search = (key) =>{
    setSearchKey(key);
    let array = allEmployeesArray.filter((item)=>{
      if(item.designation){
      if(item.name.toLowerCase().includes(key.toLowerCase())){
        return item;
      }else if(item.email.toLowerCase().includes(key.toLowerCase())){
        return item;
      }
      else if(item.phone.toString().includes(key)){
        return item;
      }
    }
  })
    setSearchResults(array);
  } 

  let arr = []; 

  if((searchResults.length > 0) && (searchKey.length > 0)){
    arr = searchResults;
  }
  else if((searchResults.length === 0) && (searchKey.length === 0)){
    arr = allEmployeesArray;
  }
  else if((searchResults.length > 0) && (searchKey.length === 0)){
    arr = searchResults;
  }
  else if((searchResults.length === 0) && (searchKey.length > 0)){
    arr = [];
  }

  // Apply filter function will be triggered on selecting a radio button on filter section

  const applyFilter = (e) =>{

    let key = e.target.value;

    if(key){
    const array = [];

    const filters = (data) =>{
    data.forEach((item)=>{
      array.push(item);
      if(item.children){
        filters(item.children);
        }
    })
  }
  allEmployees[0].children.forEach((item)=>{
          if(item.designation.includes(key)){
            filters(item.children)
          }
          else{
            item.children.forEach((subItem)=>{
            if(subItem.name.includes(key)){
              filters(subItem.children)
            }
          })
      }
  })
      setSearchResults(array);
    }
  }

  // Clear Filter function

  const clearFilter = () =>{
    let radioButtons = document.getElementsByName("search");
    for(let i=0;i<radioButtons.length;i++){
      radioButtons[i].checked = false;
    }
    setSearchResults(allEmployeesArray);
    setSearchKey("");
  }

  return (
  <div>
  <div className="filterSection" onClick={applyFilter}>

  {/* Filter by Department */}

  <div className="filterByDepartment">
  <h1 className="filterByDepartmentHeading">Filter by Department</h1>
  <input type="radio" name="search" value="HR" id="HR" />
  <label className="radioButtonLabel" htmlFor="HR">HR</label><br />
  <input type="radio" name="search" value="Engineering" id="Engineering" />
  <label className="radioButtonLabel" htmlFor="Engineering">Engineering</label><br />
   <input type="radio" name="search" value="Design" id="Design" />
  <label className="radioButtonLabel" htmlFor="Design">Design</label>
  </div>

  {/* Filter by Team */}

  <div className="filterByTeam">
  <h1 className="filterByTeamHeading">Filter by Team</h1>
  {allEmployees[0].children.map((item)=>{
    return item.children.map((team)=>{
      return (
      <div key={item.id}>
      <input type="radio" id={team.id} name="search" value={team.name}/>
      <label className="radioButtonLabel" htmlFor={team.id}>{team.name}</label>
      </div>
      )
    })
  })}
  </div>
  <button className="homePageCTABtn" onClick={clearFilter}>Clear Filter</button>
  </div>

{/* Search section */}

  <div>
  <div className="searchField">
  <input type="text" placeholder="Search employee..." className="searchInputField" value={searchKey} onChange={(e)=>{search(e.target.value)}}/>
  </div>
  <div className="searchResultsAll">
  {(arr.length > 0) ? (arr.map((item)=>{
    if(!item.isTeam){
    return (
      <div className="cardInSearchPage" key={item.id}>
      <h1><b>{item.name}</b></h1>
      <p><i>{item.designation}</i></p>
      <p>{item.email}</p>
      <p>{item.phone}</p>
      </div>
    )
    }
  })):
  <h1>No matching results</h1>
  }
  </div>
  </div>

  </div>);
};

export default Search;
