import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import styled from 'styled-components/native';
import Text from './Text';
import theme from '../theme';

const Container = styled.View`
    padding: ${theme.spacing.lg}px;
    background-color: ${theme.colors.white};
    flex: 1;
`;

const FormContainer = styled.View`
    margin-top: ${theme.spacing.md}px;
`;

const TextInputField = styled.TextInput`
    border: 1px solid ${theme.colors.background};
    border-radius: 4px;
    padding: ${theme.spacing.md}px;
    font-size: ${theme.fontSizes.body}px;
    font-family: ${theme.fonts.main};
    margin-bottom: ${theme.spacing.md}px;
`;

const SubmitButton = styled.Pressable`
    background-color: ${theme.colors.primary};
    padding: ${theme.spacing.md}px;
    border-radius: 4px;
    align-items: center;
    margin-top: ${theme.spacing.sm}px;
`;

const ButtonText = styled(Text)`
    color: ${theme.colors.white};
    font-weight: bold;
`;

const SignIn = () => {
    const onSubmit = (values) => {
        // eslint-disable-next-line no-console, no-undef
        console.log(values);
    };

    return (
        <Container>
            <Text fontSize="subheading" fontWeight="bold">
                Sign In
            </Text>
            <FormContainer>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    onSubmit={onSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <TextInputField
                                placeholder="Username"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                            <TextInputField
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry
                            />
                            <SubmitButton onPress={handleSubmit}>
                                <ButtonText>Sign In</ButtonText>
                            </SubmitButton>
                        </View>
                    )}
                </Formik>
            </FormContainer>
        </Container>
    );
};

export default SignIn;
