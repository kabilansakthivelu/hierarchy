import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Add from './Components/Add/Add';
import Edit from './Components/Edit/Edit';
import View from './Components/View/View';
import Search from './Components/Search/Search';
import Error from './Components/Error/Error';
import {data} from './data';

export const ValuesContext = React.createContext();

function App() {

  const [showEmployee, setShowEmployee] = useState({});

  return (
    <Router>
    <ValuesContext.Provider value={{showEmployee, setShowEmployee}}>
    <Header/>
      <Routes>
        <Route exact path="/" element={<Home data={data.employees}/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/view" element={<View/>}/>
        <Route path="/edit" element={<Edit/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </ValuesContext.Provider>
    </Router>
  );
}

export default App;
