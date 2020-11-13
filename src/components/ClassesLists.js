import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ClassesLists = () => {
  const [Loading, setLoading] = useState(true);
  const [classes, setClasses] = useState(() =>
    fetch("http://localhost:9000/allClasses")
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(err);
      })
  );

  useEffect(() => {
    fetch("http://localhost:9000/allClasses")
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const content = !Loading
    ? classes.map((t, index) => {
        console.log(t);
        const date = new Date(t.Date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return (
          <DayByDay key={index}>
            <DateDiv>
              <p
                style={{
                  display: "inline",
                  marginRight: "10px",
                  width: "100px",
                  textAlign: "right",
                }}
              >
                {day}/{month}/{year}{" "}
              </p>
              <p
                style={{
                  display: "inline",
                  backgroundColor: "crimson",
                  color: "white",
                  textAlign: "center",
                  width: "130px",
                }}
              >
                Class: {t.Class === "2" ? "Second" : "First"}
              </p>
            </DateDiv>
            {t.Students.length > 0 ? (
              <StudentsAsisted>
                {t.Students.map((a, i) => {
                  return (
                    <Listing key={i}>
                      <div>{a[2]}, {a[1]}</div>
                      <div>{a[0]}</div>
                    </Listing>
                  );
                })}
              </StudentsAsisted>
            ) : (
              ""
            )}
          </DayByDay>
        );
      })
    : "";

  return (
    <div>
      <div>
        <h2>List of the classes</h2>
      </div>
      {content}
    </div>
  );
};

export default ClassesLists;

export const Listing = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
  justify-content: space-between;
  margin-left: 40px;
`;

export const StudentsAsisted = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px crimson solid;
  padding: 10px;
`;

export const DayByDay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DateDiv = styled.div`
  display: flex;
  width: 250px;
`;
