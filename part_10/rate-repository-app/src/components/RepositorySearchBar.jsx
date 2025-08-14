import React from 'react';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';

const Container = styled.View`
    padding: 15px;
    background-color: white;
`;

const RepositorySearchBar = ({ searchKeyword, onSearchKeywordChange }) => {
    return (
        <Container>
            <Searchbar
                placeholder="Search repositories..."
                onChangeText={onSearchKeywordChange}
                value={searchKeyword}
                inputStyle={{ fontSize: 16 }}
                style={{
                    backgroundColor: '#f0f0f0',
                    elevation: 0,
                }}
            />
        </Container>
    );
};

export default RepositorySearchBar;
