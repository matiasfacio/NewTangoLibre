import React, { createContext, useReducer, useEffect } from "react";

export const StudentsContext = createContext();

const studentsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_STUDENT":
      return [...state, action.Student];
    case "INIT":
      return action.data;
    case "DEL_STUDENT":
      return state.filter((t, index) => {
        return index !== action.index;
      });
    default:
      return state;
  }
};

const StudentContextProvider = (props) => {
  const [Students, dispatch] = useReducer(studentsReducer, []);

  useEffect(() => {
    updateData();
  }, []);

  const createStudent = (studentToAdd) => {
    const body = JSON.stringify(studentToAdd);

    fetch("/Addstudent", { 
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .catch((err) => {
        console.log(err);
      })
      .then(() => updateData());
  };

  const editStudent = (studentToEdit) => {
    const body = JSON.stringify(studentToEdit);

    fetch("/Editstudent", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .catch((err) => {
        console.log(err);
      })
      .then(() => updateData());
  };

  const deleteStudent = (indexToDelete) => {
    fetch(`/Delstudent/${indexToDelete}`, {
      method: "DELETE",
    })
      .catch((err) => {
        console.log(err);
      })
      .then(() => updateData());
  };

  const checkinStudent = (id, date) => {
    fetch(`/checkin/:${id}`, {
      method: 'POST',
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: date,
    })
  }

  const createClass = (info) => {
    const infoJson = JSON.stringify(info);
    // console.log('json: ',infoJson)
    fetch('/createClass', {
      method: 'POST',
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: infoJson,
    })
  }


  const updateData = () => {
    fetch("/allStudents")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "INIT", data: data }))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <StudentsContext.Provider
      value={{ Students, dispatch, createStudent, deleteStudent, checkinStudent, createClass, editStudent }}
    >
      {props.children}
    </StudentsContext.Provider>
  );
};

export default StudentContextProvider;
