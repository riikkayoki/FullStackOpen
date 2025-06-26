import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const Container = styled.View`
  padding-top: ${Constants.statusBarHeight}px;
  background-color: ${theme.colors.secondary};
  flex-direction: row;
`;

const AppBar = () => {
  return (
    <Container>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <AppBarTab title="Repositories" onPress={() => {}} />
      </ScrollView>
    </Container>
  );
};

export default AppBar;
