import React, { useContext, useState } from "react";
import { StudentsContext } from "../contexts/StudentsContext";
import styled from "styled-components";
import AddStudent from "./AddStudent";
import Student from "./Student";
import ShowStudents from "./ShowStudents";

const Students = () => {
  const { Students, deleteStudent, editStudent } = useContext(StudentsContext);
  const [viewData, setViewData] = useState();
  const [editStudentData, seteditStudentData] = useState(false);
  const [oldStudentData, setOldStudentData] = useState({
    name: "",
    lastName: "",
    card: [],
    _id: "",
  });
  const [addNewStudentData, setNewStudentData] = useState({
    name: "",
    lastName: "",
    card: [],
  });

  return (
    <MainContainer>
      <h2>Students List</h2>
      <ContainerStudents>
        <ContainerList>
          {Students.length > 0
            ? Students.map((t, index) => {
                return (
                  <ListaStudents key={index}>
                    {t.name} {t.lastName}
                    <div>
                      <ButtonDel
                        onClick={() => {
                          seteditStudentData(true);
                          setOldStudentData(t);
                          setNewStudentData({ ...addNewStudentData, _id: t._id });
                        }}
                      >
                        Edit
                      </ButtonDel>
                      <ButtonDel onClick={() => deleteStudent(t._id)}>
                        Del
                      </ButtonDel>
                      <ButtonDel
                        onClick={() => {
                          fetch(`http://localhost:9000/Infostudent/${t._id}`)
                            .then((response) => response.json())
                            .then((data) => setViewData(data))
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        Info
                      </ButtonDel>
                    </div>
                  </ListaStudents>
                );
              })
            : ""}
        </ContainerList>
        
        <ViewStudent>
        {editStudentData ? (
          <EditStudent>
            <h3>Edit Student:</h3>
            <ButtonX onClick={() => seteditStudentData(false)}>X</ButtonX>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                editStudent(addNewStudentData);
                setNewStudentData({
                  name: "",
                  lastName: "",
                  card: [],
                  _id: "",
                });
                setOldStudentData({
                  name: "",
                  lastName: "",
                  card: [],
                  _id: "",
                });
                seteditStudentData(false);
              }}
            >
              <label>Name</label>
              <input
                type="text"
                placeholder={oldStudentData.name}
                value={addNewStudentData.name}
                onChange={(event) =>
                  setNewStudentData({
                    ...addNewStudentData,
                    name: event.target.value,
                  })
                }
              />
              <label>Last Name</label>
              <input
                type="text"
                placeholder={oldStudentData.lastName}
                value={addNewStudentData.lastName}
                onChange={(event) =>
                  setNewStudentData({
                    ...addNewStudentData,
                    lastName: event.target.value,
                  })
                }
              />
              <ButtonSubmit type="submit">Submit Changes</ButtonSubmit>
            </Form>
          </EditStudent>
        ) : null}
          {viewData !== undefined ? (
            <div style={{ position: "relative" }}>
              <ButtonX onClick={() => setViewData(undefined)}>X</ButtonX>
              <Student props={viewData} />
            </div>
          ) : (
            ""
          )}
          <AddStudent />
        </ViewStudent>
      </ContainerStudents>
    </MainContainer>
  );
};

export default Students;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  flex-wrap: wrap;
`;

export const ContainerStudents = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
`;

export const ContainerList = styled.div`
  height: 50vh;
  min-width: calc(100vw - 2em);
  overflow-y: scroll;
  background-color: white;
  padding: 10px 10px;
  border: 1px black solid;
  @media (min-width: 768px) {
    min-width: 350px;
  }
`;

export const ViewStudent = styled.div`
  padding: 20px;
`;

export const EditStudent = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-around;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-left: 1px black dotted;
  padding: 10px;
`;

export const ButtonSubmit = styled.button`
  background-color: white;
  color: crimson;
  padding: 3px 10px;
  margin-top: 30px;
  font-size: 1rem;
  display: inline-block;
  width: 100px;
  &:hover {
    background: crimson;
    color: white;
  }
`;

export const ListaStudents = styled.div`
  display: flex;
  color: black;
  justify-content: space-between;
  // text-transform: capitalize;
  font-size: 0.9rem;
  &:hover {
    color:white;
    background-color: crimson;
  }
`;

export const ButtonDel = styled.button`
  margin-right: 10px;
  &:hover {
    background-color: crimson;
    color: white;
  }
`;

export const ButtonX = styled.button`
  position: absolute;
  transform: translateY(35px);
  border: 1px crimson solid;
  margin: 10px;
`;
