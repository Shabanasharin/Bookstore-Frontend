import React, { createContext, useState } from 'react'
export const addBookContextApi = createContext()
export const editBookContextApi = createContext()
export const addOrderContextApi = createContext()

function ContextShare({children}) {
    const [addBookRes, setAddBookRes] = useState("")
    const [editBookRes, setEditBookRes] = useState("")
    const [addOrderRes, setAddOrderRes] = useState("")

  return (
    <div>
        <addBookContextApi.Provider value={{addBookRes,setAddBookRes}}>
          <editBookContextApi.Provider value={{editBookRes,setEditBookRes}}>
            <addOrderContextApi.Provider value={{addOrderRes,setAddOrderRes}}>
                {children}
            </addOrderContextApi.Provider>
          </editBookContextApi.Provider>
        </addBookContextApi.Provider>
    </div>
  )
}

export default ContextShare