//For adding and updating the gallery collection

import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import firebaseDb from "../firebase/config";
import { isEmpty } from "lodash";
import UploadImage from "./UploadImage";

const AddEdit = () => {
  // Initial value of title and description
  const values = {
    title: "",
    description: "",
  };

  const [data, setData] = useState({});
  const [initialState, setInitialState] = useState(values);

  //For validating the form inputs
  const [enteredTitleIsValid, setEnteredTitleIsValid] = useState(false);
  const [enteredDescIsValid, setEnteredDescIsValid] = useState(false);
  const [enteredValueTouched, setEnteredValueTouched] = useState(false);

  //Destructuring initialState(Object)
  const { title, description } = initialState;

  //For form validation
  useEffect(() => {
    if (enteredTitleIsValid) {
      setEnteredTitleIsValid(true);
    }
    if (enteredDescIsValid) {
      setEnteredDescIsValid(true);
    }
  }, [setEnteredTitleIsValid, setEnteredDescIsValid]);

  const history = useHistory();

  let currentId = useParams();
  const { id } = currentId;

  //Creating "collection" Folder in and sending data in Realtime database
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

  useEffect(() => {
    if (isEmpty(id)) {
      setInitialState({
        ...values,
      });
    } else {
      setInitialState({ ...data[id] });
    }
  }, [id, data]);

  // updating initial state of form after every input data change
  const inputChangeHandler = (e) => {
    let { name, value } = e.target;
    setInitialState({
      ...initialState,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setEnteredValueTouched(true);

    if (initialState.title.trim() === "") {
      setEnteredTitleIsValid(false);
      return;
    }

    setEnteredTitleIsValid(true);
    if (initialState.description.trim() === "") {
      setEnteredDescIsValid(false);
      return;
    }

    setEnteredDescIsValid(true);

    console.log(initialState.title);

    if (isEmpty(id)) {
      firebaseDb.child("collection").push(initialState, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      firebaseDb.child(`/collection/${id}`).set(initialState, (err) => {
        console.log(err);
      });
    }

    history.push("/");
  };

  // For form validation
  const InputTitleIsInvalid = !enteredTitleIsValid && enteredValueTouched;
  const InputDescIsInvalid = !enteredDescIsValid && enteredValueTouched;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label className="bmd-label-floating">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                name="title"
                onChange={inputChangeHandler}
              />
              {InputTitleIsInvalid ? (
                <div style={{ color: "red" }}>Title is required!</div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label className="bmd-label-floating">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                name="description"
                onChange={inputChangeHandler}
              />
            </div>
            {InputDescIsInvalid ? (
              <div style={{ color: "red" }}>Description is required!</div>
            ) : (
              ""
            )}

            <UploadImage />

            <div></div>
            <button className="btn btn-default">Cancel</button>
            <button type="submit" className="btn btn-success btn-raised">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEdit;
