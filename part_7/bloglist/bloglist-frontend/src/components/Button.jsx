import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 12px;
    border: 2px solid rgb(241, 224, 233);
    background-color: rgb(222, 70, 154);
    color: white;

    &:hover {
        background-color: rgb(143, 9, 96);
        color: white;
    }
    &:active {
        background-color: rgb(86, 7, 55);
        color: white;
    }

    &:focus {
        outline: none;
    }
`

export const Button = ({ onClick, text }) => {
    return <StyledButton onClick={onClick}>{text}</StyledButton>
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
}
