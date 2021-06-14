import React, { useEffect, useRef } from "react"
import Icon from "./Icon"
const Button = (props) => {
  const { buttonClass, id, onClick, disabled, iconName, iconSize, spanClass, buttonText } = props
  const buttonRef = useRef()

  useEffect(() => {
    if (id==='check-media-access-button') {
      buttonRef.current.focus()
    }
    return () => { }
  })
  return (
    <button type="button" ref={buttonRef} className={`button ${buttonClass ? buttonClass : ""}`} {...(id ? { id: id } : {})} onClick={onClick} disabled={disabled}>
      {iconName && <Icon name={iconName} size={iconSize} />}
      {buttonText && <span className={spanClass}>{buttonText}</span>}
    </button>
  )
}

export default Button
