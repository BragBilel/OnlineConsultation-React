import { useState } from 'react'

export const useDropdown = (initialstate) => {
  const [selectedOption, setSelectedOption] = useState(initialstate)

  return [selectedOption, e => setSelectedOption(JSON.parse(e.target.value))]
}
