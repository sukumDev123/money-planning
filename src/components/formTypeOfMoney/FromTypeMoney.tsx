import React, { useState, useContext } from 'react'
import "./FromTypeStyle.css"
import TransectionStorage from '../presenters/TransectionStorage'
import { checkAddEventContext } from '../../providers/CheckAddEventProvider'
const FromTypeMoney: React.FC = () => {
    const perids = [1, 3, 6, 12]
    const transectionClass = new TransectionStorage()
    const [group, setG] = useState<string>()
    const [price, setPrice] = useState<number>()

    const { setCheckOutSide, checked } = useContext(checkAddEventContext)
    return <div className="form">
        <form >
            <div className="md-form">
                <label htmlFor="type">คำอธิบายค่าใช้จ่าย: </label>
                <input type="text" placeholder="type of groups" onChange={(event) => {
                    setG(event.target.value)
                }} />
            </div>
            <div className="md-form">
                <label htmlFor="type">ค่าใช้จ่าย: </label>
                <input type="text" onChange={(event) => {
                    setPrice(parseInt(event.target.value))
                }} placeholder="ค่าใช้จ่าย" />
            </div>
            <div className='md-form'>
                <label htmlFor="perid">ต้องจ่ายทุกๆ</label>
                <select >
                    {perids.map((perid, index) => <option key={index} value={perid}>{`${perid} เดือน`}</option>)}
                </select>
            </div>
            <div className="md-form">
                <button className="btn" onClick={(event) => {
                    event.preventDefault()
                    if (group && price) {
                        transectionClass.setList({ title: group, values: [price] })
                        setCheckOutSide(!checked)
                    }
                }}>Add</button>
            </div>
        </form>
    </div>
}

export default FromTypeMoney