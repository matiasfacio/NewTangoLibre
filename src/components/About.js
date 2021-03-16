import React from "react";
import styled from "styled-components";
import email from '../images_icons/email.svg'
import tel from '../images_icons/phone.svg'
import browser from '../images_icons/browser.svg'

const About = () => {
  return (
    <div className = "aboutMe">
      <Title><h2>Contact Information Dev</h2></Title>
      <Name>Matias Facio</Name>
      <div><img src = {tel} width = "25px" alt = "telephone"/>01774946117</div>
      <div><img src = {email} width = "25px" alt = "email"/>matiaspersonal@gmail.com</div>
      <div><img src = {browser} width = "25px" alt = "website"/><a href = "https://www.matiasfacio-dev.de">www.matiasfacio-dev.de</a></div>
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
