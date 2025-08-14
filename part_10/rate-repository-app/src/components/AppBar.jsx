import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const Container = styled.View`
    padding-top: ${Constants.statusBarHeight}px;
    background-color: ${theme.colors.secondary};
`;

const StyledScrollView = styled(ScrollView)`
    flex-direction: row;
`;

const AppBar = () => {
    const navigation = useNavigation();
    const signOut = useSignOut();
    const { data } = useQuery(ME);

    const isSignedIn = data?.me?.id;

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <Container>
            <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
                <AppBarTab
                    title="Repositories"
                    onPress={() => navigation.navigate('Repositories')}
                />
                {isSignedIn ? (
                    <>
                        <AppBarTab
                            title="Create a review"
                            onPress={() => navigation.navigate('CreateReview')}
                        />
                        <AppBarTab
                            title="My reviews"
                            onPress={() => navigation.navigate('MyReviews')}
                        />
                        <AppBarTab title="Sign out" onPress={handleSignOut} />
                    </>
                ) : (
                    <>
                        <AppBarTab title="Sign in" onPress={() => navigation.navigate('SignIn')} />
                        <AppBarTab title="Sign up" onPress={() => navigation.navigate('SignUp')} />
                    </>
                )}
            </StyledScrollView>
        </Container>
    );
};

export default AppBar;
