import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from './Button'

export const Togglable = ({ visible, buttonLabel, children, onClick }) => {
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    return (
        <div>
            <span style={hideWhenVisible}>
                <Button onClick={onClick} text={buttonLabel} />
            </span>
            <div style={showWhenVisible}>{children}</div>
        </div>
    )
}

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'
