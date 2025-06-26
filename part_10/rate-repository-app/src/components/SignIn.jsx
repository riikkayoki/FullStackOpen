import styled from 'styled-components/native';
import Text from './Text';
import theme from '../theme';

const Container = styled.View`
    padding: ${theme.spacing.lg}px;
    background-color: ${theme.colors.white};
    flex: 1;
`;

const SignIn = () => {
    return (
        <Container>
            <Text fontSize="subheading" fontWeight="bold">
                The sign-in view
            </Text>
        </Container>
    );
};

export default SignIn;
