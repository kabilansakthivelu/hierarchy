import React, {useContext} from 'react';
import {ValuesContext} from '../../App';
import './Search.css';

const Search = () => {

  const {allEmployees} = useContext(ValuesContext);

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
      <div>
      <input type="radio" id={team.id} name="team" value={team.name}/>
      <label className="radioButtonLabel" htmlFor={team.id}>{team.name}</label>
      </div>
      )
    })
  })}
  </div>

  </div>
  </div>);
};

export default Search;
