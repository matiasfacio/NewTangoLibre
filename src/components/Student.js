import React from "react";
import styled from "styled-components";

const Student = (props) => {
  console.log(props.props);

  const { name, lastName, _id, card } = props.props;

  return (
    <div>
      <h3>Information</h3>
      <StudentContainer>
        {props.props !== undefined ? (
          <div>
            <p>Name: {name}</p>
            <p>Last Name: {lastName}</p>
            <p>ID: {_id}</p>
            <p>
              Card:{" "}
              {card.length > 0
                ? card.map((t, index) => {
                    return <p>t</p>;
                  })
                : "empty"}
            </p>
          </div>
        ) : (
          ""
        )}
      </StudentContainer>
    </div>
  );
};

export default Student;

export const StudentContainer = styled.div`
  margin: 0 0px;
  border-left: 1px black dotted;
  padding: 10px;
  & > p {
    text-transform: capitalize;
  }
`;
