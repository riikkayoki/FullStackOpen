import styled from 'styled-components'

const Title = styled.h2`
    padding: 10px 0;
`

export const ContentTemplate = ({ title, children }) => {
    return (
        <div>
            <Title>{title}</Title>
            {children}
        </div>
    )
}
