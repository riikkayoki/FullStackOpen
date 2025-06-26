import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const Container = styled.View`
    padding-top: ${Constants.statusBarHeight}px;
    background-color: ${theme.colors.secondary};
`;

const StyledScrollView = styled(ScrollView)`
    flex-direction: row;
`;

const AppBar = () => {
    const navigation = useNavigation();

    return (
        <Container>
            <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
                <AppBarTab
                    title="Repositories"
                    onPress={() => navigation.navigate('Repositories')}
                />
                <AppBarTab title="Sign in" onPress={() => navigation.navigate('SignIn')} />
            </StyledScrollView>
        </Container>
    );
};

export default AppBar;
