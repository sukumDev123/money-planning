import React from 'react'
import "./FromTypeStyle.css"
const FromTypeMoney: React.FC = () => {

    const perids = [1, 3, 6, 12]
    return <div className="form">
        <form >
            <div className="md-form">
                <label htmlFor="type">คำอธิบายค่าใช้จ่าย: </label>
                <input type="text" placeholder="type of groups" />
            </div>
            <div className="md-form">
                <label htmlFor="type">ค่าใช้จ่าย: </label>
                <input type="text" placeholder="ค่าใช้จ่าย" />
            </div>
            <div className='md-form'>
                <label htmlFor="perid">ต้องจ่ายทุกๆ</label>
                <select >
                    {perids.map((perid, index) => <option key={index} value={perid}>{`${perid} เดือน`}</option>)}
                </select>
            </div>
        </form>
    </div>
}

export default FromTypeMoney