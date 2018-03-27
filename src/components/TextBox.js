import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'

const TextBox = ({ onChange, onKeyDown, value = '' }) => (
  <input
    placeholder="Введите название книги или автора"
    type="text"
    value={value}
    onKeyDown={e => onKeyDown(e)}
    onChange={e => onChange(e.target.value)}
  />
)

TextBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default pure(TextBox)
