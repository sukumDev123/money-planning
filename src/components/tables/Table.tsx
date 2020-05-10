
import React, { useState, useEffect, useContext } from 'react'
import "./Table.css"
import { fullMonths } from '../../libs/date-variable'
import FromTypeMoney from '../formTypeOfMoney/FromTypeMoney';
import TransectionStorage, { InformationMoney } from '../presenters/TransectionStorage';
import { checkAddEventContext } from "../../providers/CheckAddEventProvider"


type DataTableType = InformationMoney[];
const write_12_month = (apidata: DataTableType): DataTableType => {
    let newData = apidata
    newData[newData.length] = { title: "เหลือ", values: [0] }


    newData.forEach((d) => {
        for (let i = 1; i < fullMonths.length; i++) {
            d.values.push(d.values[0])
        }
    })

    for (let i = 0; i < newData.length - 1; i++) {
        const lastValue = newData[newData.length - 1]
        const nowValue = newData[i]
        fullMonths.forEach((val, ind) => {
            i === 0 ?
                lastValue.values[ind] = nowValue.values[ind]
                : lastValue.values[ind] -= nowValue.values[ind]
        })
    }

    newData = newData.map(data => ({ ...data, values: data.values })) // format number to price
    return newData
}
const Tables: React.FC = () => {
    const [datas, setDatas] = useState<DataTableType>()
    const transectionClass = new TransectionStorage()
    const { checked } = useContext(checkAddEventContext)
    useEffect(() => {
        let isSub = true
        console.log("asdsd")
        const apidata = transectionClass.list
        const new_data = write_12_month(apidata)
        isSub && setDatas(new_data)
        return () => {
            isSub = false
        }
    }, [checked])

    const changeValue = (ind: number, event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
        event.preventDefault()
        console.log({ event })
    }
    return <div className="table-body">
        <FromTypeMoney></FromTypeMoney>
        <h1>Tables</h1>
        <div className="table-div">
            <table>
                <thead>
                    <tr>
                        <th>รายการ</th>
                        {fullMonths.map(month => <th key={month}>{month}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {datas?.map((data, i) => <tr key={i}>
                        <td >{data.title}</td>
                        {data.values.map((value, ind) => <td key={ind} onClick={(event) => {
                            changeValue(ind, event)
                        }}>{value}</td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div>
}

export default Tables