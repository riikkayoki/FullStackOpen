import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Text from './Text';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

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

const MultilineTextInput = styled(TextInputField)`
    min-height: 100px;
    text-align-vertical: top;
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
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup
        .number()
        .required('Rating is required')
        .min(0, 'Rating must be between 0 and 100')
        .max(100, 'Rating must be between 0 and 100'),
    text: yup.string(),
});

export const CreateReviewContainer = ({ onSubmit }) => {
    return (
        <Container>
            <Text fontSize="subheading" fontWeight="bold">
                Create a review
            </Text>
            <FormContainer>
                <Formik
                    initialValues={{ ownerName: '', repositoryName: '', rating: '', text: '' }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <FieldContainer>
                                <TextInputField
                                    placeholder="Repository owner name"
                                    onChangeText={handleChange('ownerName')}
                                    onBlur={handleBlur('ownerName')}
                                    value={values.ownerName}
                                    error={touched.ownerName && errors.ownerName}
                                />
                                {touched.ownerName && errors.ownerName && (
                                    <ErrorText>{errors.ownerName}</ErrorText>
                                )}
                            </FieldContainer>
                            <FieldContainer>
                                <TextInputField
                                    placeholder="Repository name"
                                    onChangeText={handleChange('repositoryName')}
                                    onBlur={handleBlur('repositoryName')}
                                    value={values.repositoryName}
                                    error={touched.repositoryName && errors.repositoryName}
                                />
                                {touched.repositoryName && errors.repositoryName && (
                                    <ErrorText>{errors.repositoryName}</ErrorText>
                                )}
                            </FieldContainer>
                            <FieldContainer>
                                <TextInputField
                                    placeholder="Rating between 0 and 100"
                                    onChangeText={handleChange('rating')}
                                    onBlur={handleBlur('rating')}
                                    value={values.rating}
                                    keyboardType="numeric"
                                    error={touched.rating && errors.rating}
                                />
                                {touched.rating && errors.rating && (
                                    <ErrorText>{errors.rating}</ErrorText>
                                )}
                            </FieldContainer>
                            <FieldContainer>
                                <MultilineTextInput
                                    placeholder="Review"
                                    onChangeText={handleChange('text')}
                                    onBlur={handleBlur('text')}
                                    value={values.text}
                                    multiline
                                    error={touched.text && errors.text}
                                />
                                {touched.text && errors.text && (
                                    <ErrorText>{errors.text}</ErrorText>
                                )}
                            </FieldContainer>
                            <SubmitButton onPress={handleSubmit} testID="submitButton">
                                <ButtonText>Create a review</ButtonText>
                            </SubmitButton>
                        </View>
                    )}
                </Formik>
            </FormContainer>
        </Container>
    );
};

const CreateReview = () => {
    const [createReview] = useCreateReview();
    const navigation = useNavigation();

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values;

        try {
            const { createReview: reviewData } = await createReview({
                ownerName,
                repositoryName,
                rating,
                text,
            });

            navigation.navigate('Repository', { id: reviewData.repositoryId });
        } catch (e) {
            console.log(e);
        }
    };

    return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview; 