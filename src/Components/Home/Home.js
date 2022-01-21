import React from "react";
import "./Home.css";

const Home = ({ data }) => {
  //Data is being passed to Home component via props
  //And if there are teams under a head, then Home component is called recursively

  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.id} className="hierarchy">
            <div className="card">
              <h1>{item.name}</h1>
              <p>{item.designation}</p>
            </div>
            {item.children && <Home data={item.children} />}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
