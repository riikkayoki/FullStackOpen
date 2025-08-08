import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components/native';
import Text from './Text';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';

const Container = styled.View`
    padding: ${theme.spacing.lg}px;
    background-color: ${theme.colors.white};
    flex: 1;
`;

const FormContainer = styled.View`
    margin-top: ${theme.spacing.md}px;
`;

const TextInputField = styled.TextInput`
    border: 1px solid ${(props) => (props.error ? theme.colors.error : theme.colors.background)};
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
        .min(5, 'Username must be at least 5 characters')
        .max(30, 'Username must be at most 30 characters')
        .required('Username is required'),
    password: yup
        .string()
        .min(5, 'Password must be at least 5 characters')
        .max(50, 'Password must be at most 50 characters')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password confirmation must match the password')
        .required('Password confirmation is required'),
});

export const SignUpContainer = ({ onSubmit }) => {
    return (
        <Container>
            <Text fontSize="subheading" fontWeight="bold">
                Sign up
            </Text>
            <FormContainer>
                <Formik
                    initialValues={{ username: '', password: '', passwordConfirmation: '' }}
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
                            <FieldContainer>
                                <TextInputField
                                    placeholder="Password confirmation"
                                    onChangeText={handleChange('passwordConfirmation')}
                                    onBlur={handleBlur('passwordConfirmation')}
                                    value={values.passwordConfirmation}
                                    secureTextEntry
                                    error={
                                        touched.passwordConfirmation && errors.passwordConfirmation
                                    }
                                />
                                {touched.passwordConfirmation && errors.passwordConfirmation && (
                                    <ErrorText>{errors.passwordConfirmation}</ErrorText>
                                )}
                            </FieldContainer>
                            <SubmitButton onPress={handleSubmit} testID="submitButton">
                                <ButtonText>Sign up</ButtonText>
                            </SubmitButton>
                        </View>
                    )}
                </Formik>
            </FormContainer>
        </Container>
    );
};

const SignUp = () => {
    const [signUp] = useSignUp();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const { data } = await signUp({ username, password });
            // eslint-disable-next-line no-console, no-undef
            console.log(data);
        } catch (e) {
            // eslint-disable-next-line no-console, no-undef
            console.log(e);
        }
    };

    return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
