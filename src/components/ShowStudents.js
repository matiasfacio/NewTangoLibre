import React, { useContext } from "react";
import { StudentsContext } from "../contexts/StudentsContext";
import styled from 'styled-components'

const ShowStudents = () => {

    const { Students } = useContext(StudentsContext);


    return ( <div>
        <ContainerList>
          {Students.length > 0
            ? Students.map((t, index) => {
                return (
                  <ListaStudents key={index}>
                    {t.name} {t.lastName}
                  </ListaStudents>
                );
              })
            : ""}
        </ContainerList>
    </div> );
}
 
export default ShowStudents;


export const ContainerList = styled.div`
  height: 50vh;
  min-width: calc(100vw - 2em);
  overflow-y: scroll;
  background-color: white;
  padding: 10px 10px;
  border: 1px black solid;
  @media (min-width: 768px) {
    min-width: 180px;
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