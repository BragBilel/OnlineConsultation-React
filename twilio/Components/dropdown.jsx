import React, { useEffect, useState } from 'react'
import { select } from 'lib/selectors'
import Icon from '../../searchOverlay/components/Icon'
import { useDropdown } from '../hooks/useDropdown'

const Dropdown = (props) => {
  const { dropdownTitle, disabled, onSelect, dropdownIcon } = props
  const [dropdownValue, setDropdownValue] = useDropdown(props.dropdownOptions ? props.dropdownOptions[0] : '')
  const [dropdownOptions, setDropdownOptions] = useState(props.dropdownOptions)

  useEffect(() => {

    setDropdownOptions(props.dropdownOptions)
  }, [props.dropdownOptions])

  useEffect(() => {
    onSelect(dropdownValue)
  }, [dropdownValue])

  return (
    <div className={`selectbox is-simple is-ready has-content ${disabled ? "dropdown-disabled" : ""}`}>
      <select className="selectbox__input" disabled={disabled} name={dropdownTitle} value={dropdownValue} onChange={setDropdownValue} required lang={window.config.currentLanguage}>
        {dropdownOptions &&
          dropdownOptions.map(
            (element, index) => (
              <option key={index} value={JSON.stringify(element)}>
                {element.label}
              </option>
            ) // using groupId just for debug purpose since "label" did not always had values
          )}
      </select>
      <span className="selectbox__wrapper" aria-hidden="true">
        {dropdownIcon && <span className="selectbox__icons"><Icon name={dropdownIcon} size={"large"} /></span>}
        <span className="selectbox__label">{dropdownValue ? dropdownValue.label : dropdownTitle + " " + (props.dropdownOptions ? props.dropdownOptions.length : "")} </span>
      </span>
      <Icon name={"down"} size={"small"} />
    </div>
  );
}


export default Dropdown
