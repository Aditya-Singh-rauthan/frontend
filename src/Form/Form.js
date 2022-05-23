import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationDispatcher } from "../utilityFunctions";
import "./Form.css";
function Form({ data, onSave, title }) {
  let [formData, setData] = useState(data);
  //   console.log(">>>from", formData);
  const { user: { token } = {} } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onChangeField = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };
  const resetChanges = (e) => {
    e.preventDefault();
    if (!changeInData()) {
      notificationDispatcher(dispatch, {
        message: "No Changes Found",
        status: "Error",
      });
      return;
    }
    setData(data);
  };
  const saveChanges = (e) => {
    e.preventDefault();
    if (!changeInData()) {
      notificationDispatcher(dispatch, {
        message: "No Changes Found",
        status: "Error",
      });
      return;
    }
    onSave(formData);
  };
  useEffect(() => {
    setData(data);
  }, [data, title]);

  const changeInData = () => {
    let changes = false;
    for (let key of Object.keys(formData)) {
      if (formData[key] !== data[key]) {
        changes = true;
        break;
      }
    }
    return changes;
  };

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding:"0px 10px"
        }}
      >
        <h3>{title}</h3>
        {changeInData() ? <p style={{color:'dodgerblue'}}>unsaved changes</p> : null}
      </header>
      <form
        onSubmit={saveChanges}
        className="flexColumn"
        style={{
          flex: 1,
          // border: "1px solid gray",
          overflow: "auto",
          alignItems: "flex-start",
          padding: "0px 20px",
        }}
      >
        <div className="flexColumn" style={{ width: "100%" }}>
          {Object.keys(formData).map((key, index) => {
            return (
              <div
                key={index}
                className="flexRow"
                style={{ justifyContent: "space-between" }}
              >
                <b>
                  <p>{key} : </p>
                </b>
                {key === "about" || key === "address" ? (
                  <textarea
                    disabled={key === "_id" || key==='url'}
                    className="flexRow"
                    value={formData[key]}
                    name={key}
                    onChange={onChangeField}
                  />
                ) : (
                  <input
                    disabled={key === "_id" || key==='url'}
                    className="flexRow"
                    value={formData[key]}
                    name={key}
                    onChange={onChangeField}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div
          className="flexRow"
          style={{
            width: "100%",
            padding: "20px 0px",
            justifyContent: "space-between",
          }}
        >
          <button className="greenButton" onClick={saveChanges} type="submit">
            Save Changes
          </button>
          <button className="yellowButton" onClick={resetChanges} type="reset">
            Reset Changes
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
