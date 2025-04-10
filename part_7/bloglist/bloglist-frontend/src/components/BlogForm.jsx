import { Togglable } from './Togglable'
import { Button } from './Button'
import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div`
    background-color: rgb(213, 38, 134);
    border: 1px solid rgb(34, 13, 25);
    border-radius: 8px;
    padding: 10px;
`
const FormTitle = styled.h3`
    padding: 10px 0;
    color: white;
    text-transform: uppercase;
`

const InputTitle = styled.h4`
    padding: 2px 0;
    margin: 0;
    color: white;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    padding: 5px;
    gap: 10px;
`

const FormContent = styled.form`
    display: flex;
    flex-direction: column;
`

const ButtonContainer = styled.div`
    display: flex;
    padding: 10px 0;
`

const StyledInput = styled.input`
    padding: 5px;
    border-radius: 8px;
    border: 1px solid rgb(190, 77, 139);
    width: 100%;
    box-sizing: border-box;
`
export const BlogForm = ({
    handleBlogAdd,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    blogFormRef,
    title,
    author,
    url,
}) => {
    const [visible, setVisible] = useState(false)

    const toggleVisilibility = () => {
        setVisible(!visible)
    }

    const buttonLabel = visible ? 'hide box' : 'new blog'

    return (
        <Togglable
            buttonLabel={buttonLabel}
            visible={visible}
            onClick={toggleVisilibility}
        >
            <Container>
                <Button onClick={toggleVisilibility} text={buttonLabel} />

                <FormTitle>Create a new blog</FormTitle>
                <FormContent onSubmit={handleBlogAdd}>
                    <Wrapper>
                        <InputTitle>title:</InputTitle>
                        <StyledInput
                            type="text"
                            value={title}
                            name="Title"
                            id="title-input"
                            data-cy="titleInput"
                            onChange={handleTitleChange}
                        />
                    </Wrapper>
                    <Wrapper>
                        <InputTitle>author:</InputTitle>
                        <StyledInput
                            type="text"
                            value={author}
                            name="Author"
                            id="author-input"
                            data-cy="authorInput"
                            onChange={handleAuthorChange}
                        />
                    </Wrapper>
                    <Wrapper>
                        <InputTitle>url:</InputTitle>
                        <StyledInput
                            type="text"
                            value={url}
                            name="Url"
                            id="url-input"
                            data-cy="urlInput"
                            onChange={handleUrlChange}
                        />
                    </Wrapper>
                    <ButtonContainer>
                        <Button
                            type="submit"
                            data-cy="create"
                            onClick={handleBlogAdd}
                            text="create"
                        />
                    </ButtonContainer>
                </FormContent>
            </Container>
        </Togglable>
    )
}
