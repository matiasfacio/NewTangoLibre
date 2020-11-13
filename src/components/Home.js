import React from 'react';
import styled from 'styled-components'

const Home = () => {
    return ( <HomeContainer>
        <h1>Welcome to Tango Libre Administration Area</h1>
    </HomeContainer> );
}
 
export default Home;

export const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
