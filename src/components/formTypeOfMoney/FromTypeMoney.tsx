import React, { useState, useContext } from 'react'
import "./FromTypeStyle.css"
import TransectionStorage from '../presenters/TransectionStorage'
import { checkAddEventContext } from '../../providers/CheckAddEventProvider'
const FromTypeMoney: React.FC = () => {
    const perids = [1, 3, 6, 12]
    const transectionClass = new TransectionStorage()
    const [group, setG] = useState<string>()
    const [price, setPrice] = useState<number>()
    const [valueIsPlus, setValueIsPlus] = useState<boolean>(false)
    const [color, setColor] = useState<string>()
    const [preidInput, setPreidInput] = useState<number>()
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
                <label htmlFor="perid">สีของช่อง</label>
                <select onChange={(event) => {
                    event.preventDefault()
                    setColor(event.target.value)
                }} >
                    <option value="white">white</option>
                    <option value="red">red</option>
                    <option value="green">green</option>
                </select>
            </div>
            <div className='md-form'>
                <label htmlFor="perid">ค่าเป็นบวกหรือลบ</label>
                <select onChange={(event) => {
                    event.preventDefault()
                    const toBoolean = event.target.value === "true" ? true : false
                    setValueIsPlus(toBoolean)
                }}>
                    <option value="true">บวก</option>
                    <option value="false">ลบ</option>
                </select>
            </div>

            <div className='md-form'>
                <label htmlFor="perid">ต้องจ่ายทุกๆ</label>
                <select >
                    {perids.map((perid, index) => {
                        return <option key={index} value={perid}>{`${perid} เดือน`}</option>
                    })}
                </select>
            </div>
            <div className="md-form">
                <button className="btn" onClick={(event) => {
                    event.preventDefault()
                    if (group && price && color) {
                        transectionClass.setList({
                            title: group,
                            values: [price],
                            color: color,
                            valueIsPlus: valueIsPlus,
                            perid: 1
                        })
                        setCheckOutSide(!checked)
                    }
                }}>Add</button>
            </div>
        </form>
    </div>
}

export default FromTypeMoney