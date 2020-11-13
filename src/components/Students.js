import React, { useContext, useState } from "react";
import { StudentsContext } from "../contexts/StudentsContext";
import styled from "styled-components";
import AddStudent from "./AddStudent";
import Student from "./Student";

const Students = () => {
  const { Students, deleteStudent } = useContext(StudentsContext);
  const [viewData, setViewData] = useState();

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
        {viewData !== undefined ? (
          <div style = {{position: 'relative'}}>
            <ButtonX onClick = {()=> setViewData(undefined)}>X</ButtonX>
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
    min-width: 70vw;
  }
`;

export const ViewStudent = styled.div`
  padding: 20px;
`

export const ListaStudents = styled.div`
  display: flex;
  color: black;
  justify-content: space-between;
  // text-transform: capitalize;
  font-size: 0.9rem;
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
`
