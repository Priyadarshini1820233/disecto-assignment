// Displaying table data in home page

import React, { useEffect, useState } from "react";
import firebaseDb from "../firebase/config";
import useFirestore from "../hooks/useFirestore";
import { useParams, Link } from "react-router-dom";

const View = () => {
  const [data, setData] = useState({});
  const { docs } = useFirestore("images");
  let currentId = useParams();
  const { id } = currentId;

  //  update data
  useEffect(() => {
    firebaseDb.child("collection").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    });
  }, [id]);

  return (
    <div className="container mt-5">
      {Object.keys(data).map((userId) => {
        if (userId === id) {
          return (
            <div className="card">
              <div className="card-header lead">Collection</div>
              <div className="card-body">
                <p className="card-text">Title: {data[id].title}</p>
                <p className="card-text">Description: {data[id].description}</p>
                <p className="card-text">
                  Gallery:
                  {docs &&
                    docs.map((doc) => (
                      <div className="img-wrap" key={doc.id}>
                        <img src={doc.url} alt="uploaded pic" />
                      </div>
                    ))}
                </p>
                <Link to="/">
                  <a className="btn btn-info">Go Back</a>
                </Link>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
export default View;
