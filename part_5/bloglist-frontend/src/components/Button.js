

const Button = ({handleEvent, todo}) => {

    return (
        <button onClick={handleEvent}>{todo}</button>
    )
}

export default Button