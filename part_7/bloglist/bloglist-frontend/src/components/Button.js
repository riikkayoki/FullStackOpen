import PropTypes from 'prop-types'

const Button = ({ handleEvent, todo }) => {
  return <button onClick={handleEvent}>{todo}</button>
}

Button.propTypes = {
  handleEvent: PropTypes.func.isRequired,
  todo: PropTypes.string.isRequired,
}

export default Button
