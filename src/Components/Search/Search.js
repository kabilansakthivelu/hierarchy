import React, {useContext} from 'react';
import {ValuesContext} from '../../App';
import './Search.css';

const Search = () => {

  const {allEmployees} = useContext(ValuesContext);

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

  return (
  <div>
  <div className="filterSection">

  {/* Filter by Department */}

  <div className="filterByDepartment">
  <h1 className="filterByDepartmentHeading">Filter by Department</h1>
  <input type="radio" name="department" value="HR" id="HR" />
  <label className="radioButtonLabel" htmlFor="HR">HR</label><br />
  <input type="radio" name="department" value="Engineering" id="Engineering" />
  <label className="radioButtonLabel" htmlFor="Engineering">Engineering</label><br />
   <input type="radio" name="department" value="Design" id="Design" />
  <label className="radioButtonLabel" htmlFor="Design">Design</label>
  </div>

  {/* Filter by Team */}

  <div className="filterByTeam">
  <h1 className="filterByTeamHeading">Filter by Team</h1>
  {allEmployees[0].children.map((item)=>{
    return item.children.map((team)=>{
      return (
      <div key={item.id}>
      <input type="radio" id={team.id} name="team" value={team.name}/>
      <label className="radioButtonLabel" htmlFor={team.id}>{team.name}</label>
      </div>
      )
    })
  })}
  </div>
  <button className="clearFiltersBtn">Clear Filters</button>
  </div>

{/* Search section */}

  <div>
  <div className="searchField">
  <input type="text" placeholder="Search employee..." className="searchInputField"/>
  </div>
  <div className="searchResults">
  {allEmployeesArray.map((item)=>{
    if(!item.isTeam){
    return (
      <div className="cardInSearchPage">
      <h1><b>{item.name}</b></h1>
      <p><i>{item.designation}</i></p>
      </div>
    )
    }
  })}
  </div>
  </div>

  </div>);
};

export default Search;
