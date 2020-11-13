import "./App.css";
import StudentsContextProvider from "./contexts/StudentsContext";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import styled from "styled-components";
// import Home from "./components/NavSwitcher";
import NavSwitcher from "./components/NavSwitcher";

function App() {
  return (
    <BrowserRouter>
      <StudentsContextProvider>
        <NavBar />
        <AppContainer>
          <NavSwitcher />
        </AppContainer>
      </StudentsContextProvider>
    </BrowserRouter>
  );
}

export default App;

export const AppContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
