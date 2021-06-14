import React, { useEffect, useRef } from 'react'
import Icon from './Icon'

const CloseButton = (props) => {
  const {buttonClass, onClick, buttonText } = props
  const buttonRef = useRef()

  useEffect(() => {
    buttonRef.current.focus()
  }, ([]))

  return (
    <button type="button" ref={buttonRef}   className={`button ${buttonClass ? +" " +buttonClass : ""}`} onClick={onClick}>
      <Icon name={"close"} size={"medium"} />
      {buttonText && <span className="is-sr-only">{buttonText}</span>}
    </button>
  )
}
export default CloseButton


