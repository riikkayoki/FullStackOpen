import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
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
    border: 1px solid ${props => props.error ? theme.colors.error : theme.colors.background};
    border-radius: 4px;
    padding: ${theme.spacing.md}px;
    font-size: ${theme.fontSizes.body}px;
    font-family: ${theme.fonts.main};
    margin-bottom: ${theme.spacing.xs}px;
`;

const ErrorText = styled(Text)`
    color: ${theme.colors.error};
    font-size: ${theme.fontSizes.body}px;
    margin-bottom: ${theme.spacing.md}px;
`;

const FieldContainer = styled.View`
    margin-bottom: ${theme.spacing.sm}px;
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

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
});

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
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <FieldContainer>
                                <TextInputField
                                    placeholder="Username"
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                    error={touched.username && errors.username}
                                />
                                {touched.username && errors.username && (
                                    <ErrorText>{errors.username}</ErrorText>
                                )}
                            </FieldContainer>
                            <FieldContainer>
                                <TextInputField
                                    placeholder="Password"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry
                                    error={touched.password && errors.password}
                                />
                                {touched.password && errors.password && (
                                    <ErrorText>{errors.password}</ErrorText>
                                )}
                            </FieldContainer>
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
