import React, { useState, useContext } from 'react'

const ScreenContext = React.createContext()

export function useScreen () {
  return useContext(ScreenContext)
}

export function ScreenProvider ({ children }) {
  const [docsActive, toggleDocs] = useState(false)
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
  const handleDocs = () => toggleDocs(!docsActive)

  return (
    <ScreenContext.Provider
      value={{
        mzLayout,
        leftSidebar,
        docsActive,
        handleMode,
        handleSl,
        handleDocs
      }}
    >
      {children}
    </ScreenContext.Provider>
  )
}
