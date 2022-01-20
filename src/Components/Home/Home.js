import React from "react";
import "./Home.css";

const Home = ({ data }) => {
  //Data is being passed to Home component via props
  //And if there are teams under a head, then Home component is called recursively

  return (
    <div>
      {data.map((item) => {
        return (
          <div>
            <li className="card">
              {item.name}
              {item.children && <Home data={item.children} />}
            </li>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
