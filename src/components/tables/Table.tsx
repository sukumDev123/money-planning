
import React, { useState, useEffect, useContext } from 'react'
import "./Table.css"
import { fullMonths } from '../../libs/date-variable'
import TransectionStorage, { InformationMoney } from '../../presenters/TransectionStorage';
import { checkAddEventContext } from "../../providers/CheckAddEventProvider"
import { money_format } from '../../presenters/MoneyFormat';
interface SummaryInfomration {
    surplus: string
    payment: string
    savemoney: string
    paymenyPerMonth: string
}
type DataTableType = InformationMoney[];
const createDataTables = (newData: DataTableType) => {
    newData[newData.length] = { title: "เหลือ", values: [0], color: "white", perid: 1, valueIsPlus: true }
    newData = newData.map(d => ({
        ...d,
        values: fullMonths.map(() => d.values[0])
    }))

    const lastValue = newData[newData.length - 1]

    for (let i = 0; i < newData.length - 1; i++) {
        const nowValue = newData[i]
        lastValue.values = fullMonths.map((val, ind) =>
            nowValue.valueIsPlus
                ? lastValue.values[ind] + nowValue.values[ind]
                : lastValue.values[ind] - nowValue.values[ind])
    }


    return newData

}
const write_12_month = (apidata: DataTableType, setSummary: (summany: SummaryInfomration) => void, yearsCal: number): DataTableType => {
    let newData = apidata
    newData = createDataTables(newData)
    const lastValue = newData[newData.length - 1]
    const yearsCalVariable = (yearsCal * 12)
    const payments = newData
        .filter(d => !d.valueIsPlus && d.title !== "ออม")
        .reduce((sum, val) => sum + (val.values[0] * yearsCalVariable), 0)
    const saveMoney = newData
        .filter(d => d.title === "ออม")
        .reduce((sum, val) => sum + (val.values[0] * yearsCalVariable), 0)
    const permentPerMonth = newData
        .filter(d => !d.valueIsPlus && d.title !== "ออม")
        .reduce((sum, val) => sum + val.values[0], 0) * 12
    const surplus = lastValue.values[0] * yearsCalVariable
    setSummary({
        payment: money_format(payments) + ` ต่อ ${yearsCal} ปี`,
        savemoney: money_format(saveMoney) + ` ต่อ ${yearsCal} ปี`,
        surplus: money_format(surplus) + ` ต่อ ${yearsCal} ปี`,
        paymenyPerMonth: money_format(permentPerMonth) + ` ต่อ 12 เดือน`
    })

    return newData
}

const Tables: React.FC = () => {
    const [summany, setSummary] = useState<SummaryInfomration>()
    const [datas, setDatas] = useState<DataTableType>()
    const transectionClass = new TransectionStorage()
    const { checked, setCheckOutSide } = useContext(checkAddEventContext)
    const [yearsCal, setYearCal] = useState<number>(0)
    useEffect(() => {
        let isSub = true
        const apidata = transectionClass.list
        const new_data = write_12_month(apidata, setSummary, yearsCal)
        isSub && setDatas(new_data)
        return () => {
            isSub = false
        }
    }, [checked, yearsCal])

    const changeValue = (ind: number, event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
        event.preventDefault()
        console.log({ event })
    }
    return <div className="table-body">
        <h1 className="text-center">แสดงรายการ</h1>
        <div className="div-calculor-years">
            <div>
                <input type="text" value={yearsCal} onChange={(event) => {
                    const yearsString = event.target.value
                    if (yearsString) {
                        const yearsStringToInt = parseInt(yearsString)
                        setYearCal(yearsStringToInt)
                    }
                }} />
                <h5>ค่าใช้จ่ายทั้งหมดภายในปีนี้: {summany?.payment} </h5>
                <h5>เงินที่เหลือ: {summany?.surplus}</h5>
                <h5>เงินเก็บ: {summany?.savemoney}</h5>

            </div>
            <div>
                <h5>ค่าใช้จ่าย: {summany?.paymenyPerMonth}</h5>

            </div>
        </div>

        <div className="table-div">
            <table>
                <thead>
                    <tr>
                        <th>รายการ</th>
                        {fullMonths.map(month => <th key={month}>{month}</th>)}
                        <th>ลบ</th>
                    </tr>
                </thead>
                <tbody>
                    {datas?.map((data, i) =>
                        <tr className={data.color} key={i}>
                            <td >{data.title}</td>

                            {data.values.map((value, ind) =>
                                <td key={ind}
                                    onClick={(event) => {
                                        changeValue(ind, event)
                                    }}>
                                    {money_format(value)}
                                </td>)
                            }

                            <td onClick={(event) => {
                                event.preventDefault()
                                transectionClass.deleteList(i)
                                setCheckOutSide(!checked)
                            }}>{"x"}</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    </div>
}

export default Tables