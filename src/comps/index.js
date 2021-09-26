import React, { useState, useEffect } from "react";
import firebaseDb from "../firebase/config";
import { Link } from "react-router-dom";

const ListRecord = () => {
  const [data, setData] = useState({});

  // setting collection data
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
  }, []);

  // Delete collection
  const onDelete = (id) => {
    if (window.confirm("Are you sure, want to delete this collection?")) {
      firebaseDb.child(`collection/${id}`).remove((err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-lg-12">
          <div className="jumbotron">
            <h2 className="display-2">Gallery collection</h2>
          </div>
          <table className="table table-bordered table-striped">
            <thead
              style={{
                backgroundColor: "rgb(0,0,255)",
              }}
            >
              <tr className="tableRow">
                <th scope="col">No.</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((id, index) => {
                return (
                  <tr key={id}>
                    <th scope="row">{index + 1}</th>
                    <td>{data[id].title}</td>
                    <td>{data[id].description}</td>
                    <td>
                      <Link to={`/update/${id}`}>
                        <a className="btn text-primary">
                          <i className="fas fa-pencil-alt"></i>
                        </a>
                      </Link>
                      <a
                        className="btn text-danger"
                        onClick={() => onDelete(id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </a>
                      <Link to={`/view/${id}`}>
                        <a className="btn text-info">
                          <i className="fas fa-eye"></i>
                        </a>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListRecord;
