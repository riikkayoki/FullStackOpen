import React from 'react';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';

const Container = styled.View`
    flex-grow: 1;
    flex-shrink: 1;
    background-color: #e1e4e8;
`;

const Stack = createNativeStackNavigator();

const Main = () => {
    return (
        <NavigationContainer>
            <Container>
                <AppBar />
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Repositories" component={RepositoryList} />
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Repository" component={SingleRepository} />
                    <Stack.Screen name="CreateReview" component={CreateReview} />
                    <Stack.Screen name="MyReviews" component={MyReviews} />
                </Stack.Navigator>
            </Container>
        </NavigationContainer>
    );
};

export default Main;
