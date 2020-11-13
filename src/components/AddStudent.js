import React, { useContext, useRef, useState } from "react";
import { StudentsContext } from "../contexts/StudentsContext";
import styled from "styled-components";

const AddStudent = () => {
  const { createStudent } = useContext(StudentsContext);
  const backToTop = useRef();
  const [newStudent, setNewStudent] = useState({
    name: "",
    lastName: "",
    card: [],
  });

  return (
    <div>
      <h3>Add a new Student:</h3>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          createStudent(newStudent);
          setNewStudent({
            name: "",
            lastName: "",
            card: [],
          });
          backToTop.current.focus();
          setTimeout(()=> {
            document.querySelector('footer').style.display = 'flex'
          }, 1000)
          
          setTimeout(
            ()=> {document.querySelector('footer').style.display = 'none'}, 3000
          )
        }}
      >
        <Label>Name</Label>
        <Input
          ref={backToTop}
          type="text"
          name="name"
          value={newStudent.name}
          required
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
        />
        <Label>Last Name</Label>
        <Input
          type="text"
          name="lastName"
          value={newStudent.lastName}
          required
          onChange={(e) =>
            setNewStudent({ ...newStudent, lastName: e.target.value })
          }
        />
        <ButtonSubmit type="submit">Add</ButtonSubmit>
      </Form>
      <Footer>Added</Footer>
    </div>
  );
};

export default AddStudent;


export const FooterText = styled.div`
`

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width 300px;
  height: 50px;
  text-align:center;
  background-color: rgba(0,0,0,0.7);
  font-size: 1.3rem;
  justify-content: center;
  align-items: center;
  display: none;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

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

export const Input = styled.input`
  font-size: 1rem;
  // text-transform: capitalize;
  max-width: 200px;
`;
export const Label = styled.label`
  font-size: 0.9rem;
`;
