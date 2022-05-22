import React, { useState, useContext } from 'react'

const ScreenContext = React.createContext()

export function useScreen () {
  return useContext(ScreenContext)
}

export function ScreenProvider ({ children }) {
  const [mzLayout, toggleMZ] = useState(false)
  const [leftSidebar, toggleLS] = useState(false)

  const handleMode = () => {
    if (mzLayout === leftSidebar) {
      toggleMZ(!mzLayout)
      toggleLS(!leftSidebar)
    } else {
      if (mzLayout === true && leftSidebar === false) toggleMZ(false)
      else toggleMZ(true)
    }
  }
  const handleSl = () => toggleLS(!leftSidebar)

  return (
    <ScreenContext.Provider
      value={{
        mzLayout,
        leftSidebar,
        handleMode,
        handleSl
      }}
    >
      {children}
    </ScreenContext.Provider>
  )
}
