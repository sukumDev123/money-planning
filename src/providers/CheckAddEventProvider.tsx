import React, { createContext, useState } from 'react'
interface CheckAddEventProviderParams {
    children: any
}


interface CheckAddEventProviderInterface {
    checked: boolean
    setCheckOutSide: (value: boolean) => void
}



export const checkAddEventContext = createContext<CheckAddEventProviderInterface>({
    checked: false,
    setCheckOutSide: () => { }
})

export const CheckAddEventProvider = ({ children }: CheckAddEventProviderParams) => {
    const [checked, setCheck] = useState<boolean>(false)
    return <checkAddEventContext.Provider value={{
        checked,
        setCheckOutSide: (value: boolean) => {
            setCheck(value)
        }
    }} >{children}</checkAddEventContext.Provider>
}