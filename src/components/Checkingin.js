import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import { StudentsContext } from "../contexts/StudentsContext";
import ShowStudents from "./ShowStudents";

const Checkingin = () => {
  const { createClass } = useContext(StudentsContext);
  const [StudentNameSearch, setName] = useState("");
  const [added, setAdded] = useState(false);
  const [answerSearch, setSearch] = useState("");
  const [finishedCheckin, setFinishedChekin] = useState(false)
  const [displayCheckin, setDisplayCheckin] = useState(false);
  const [checked, setChecked] = useState({
    Students: [],
  });
  const studenRef = useRef();

  return (
    <FullContainer>
      <CheckingContainer>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const dateType = new Date(checked.date);
            setChecked({ ...checked, date: dateType });
            setDisplayCheckin(true);
            setFinishedChekin(false)
          }}
        >
          <SubForm>
            <h3>First Create a Class</h3>
            <label>Date: </label>
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              name="date"
              required
              onChange={(e) => setChecked({ ...checked, Date: e.target.value })}
            />
            <label>First Class</label>
            <input
              type="radio"
              id="firstClass"
              name="class"
              value="1"
              required
              onChange={(e) =>
                setChecked({ ...checked, Class: e.target.value })
              }
            />
            <label>Second Class</label>
            <input
              type="radio"
              id="secondClass"
              name="class"
              value="2"
              onChange={(e) =>
                setChecked({ ...checked, Class: e.target.value })
              }
            />
          </SubForm>
          <ButtonSubmit type="submit">New Class</ButtonSubmit>
        </Form>

        {/* adding students */}

        {displayCheckin ? (
          <div>
            <ContainerCheckinForm>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  fetch(`http://localhost:9000/Search/${StudentNameSearch}`, {
                    method: "GET",
                  })
                    .then((response) => response.json())
                    .then((data) => setSearch(data))
                    .catch((err) => console.log(err));
                }}
              >
                <SubForm>
                  <h3>Check in</h3>
                  <label>Student Name:</label>
                  <input
                    ref={studenRef}
                    type="text"
                    name="studentName"
                    value={StudentNameSearch}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <button type="submit">Search</button>
                </SubForm>
              </Form>

              <div>
                <h3>Display results:</h3>
                {answerSearch !== ""
                  ? answerSearch.map((t, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "200px",
                            padding: "5px 0",
                          }}
                        >
                          {t.name} {t.lastName}
                          <button
                            onClick={() => {
                              setChecked({
                                ...checked,
                                Students: [
                                  ...checked.Students,
                                  [t._id, t.name, t.lastName],
                                ],
                              });
                              setAdded(true);
                              setName("");
                              studenRef.current.focus();
                              setTimeout(() => {
                                setAdded(false);
                              }, 2000);
                            }}
                          >
                            Check
                          </button>
                        </div>
                      );
                    })
                  : ""}
                <Footer>{added ? "Added!" : ""}</Footer>
              </div>
            </ContainerCheckinForm>
          </div>
        ) : (
          ""
        )}
      </CheckingContainer>

      {checked.Students.length > 0 ? (
        <FinishButton
          onClick={() => {
            createClass(checked);
            setDisplayCheckin(false);
            setChecked({
              Students: [],
            });
            setFinishedChekin(!finishedCheckin)
          }}
        >
          Finish Check-in
        </FinishButton>
      ) : (
        ""
      )}

      {checked.Students.length > 0 ? (
        <ProvisoryList>
          <h3>Checked</h3>
          <List>
            {checked.Students.map((p, q) => {
              return (
                <div key={q}>
                  {p[1]} {p[2]}
                </div>
              );
            })}
          </List>
        </ProvisoryList>
      ) : (
        ""
      )}
      <ShowStudents />
    </FullContainer>
  );
};

export default Checkingin;

export const List = styled.div`
  border-left: 1px black dotted;
  padding-left: 10px;
  width: 200px;
  height: 270px;
  overflow-y: scroll;
`;

export const ProvisoryList = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 150px;
  margin-left: 20px;
`;

export const FullContainer = styled.div`
  display: flex;
  width: 1200px;
  justify-content: space-between;
`;

export const Footer = styled.div`
  background-color: rgba(0, 0, 0, 0);
  padding: 5px 10px;
  color: crimson;
`;

export const ContainerCheckinForm = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
`;

export const CheckingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  // min-width: 50%;
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  border-left: 1px black dotted;
  padding: 10px;
  & > input {
    margin-bottom: 20px;
  }
`;

export const SubForm = styled.div`
  height: 250px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ButtonSubmit = styled.button`
  background-color: crimson;
  color: white;
  padding: 3px 10px;
  margin-top: 30px;
  font-size: 1rem;
  display: inline-block;
  width: 100px;
  font-weight: bolder;
  box-shadow: 1px 1px 5px black;
  &:hover {
    background: gray;
    color: white;
  }
`;

export const FinishButton = styled.button`
  background-color: crimson;
  color: white;
  box-shadow: 1px 1px 5px black;
  font-weight: bolder;
  &:hover {
    background-color: gray;
  }
`;
