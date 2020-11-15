import React from 'react';
import styled from 'styled-components'
import Todo from './Todo'

const Home = () => {
    return ( <HomeContainer>
        <h1>Welcome to Tango Libre Administration Area</h1>
        <Todo/>
    </HomeContainer> );
}
 
export default Home;

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
