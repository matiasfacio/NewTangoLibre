import React from "react";
import styled from "styled-components";

const About = () => {
  return (
    <div style={{lineHeight: 2}}>
      <Title><h2>Contact Information Dev</h2></Title>
      <Name>Matias Facio</Name>
      <div>01774946117</div>
      <div>matiaspersonal@gmail.com</div>
      <div>www.matiasfacio.com</div>
    </div>
  );
};

export default About;

export const Name = styled.div`
  color: crimson;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const Title = styled.div`
  padding: 10px 0;
  margin-top: 50px;
`
