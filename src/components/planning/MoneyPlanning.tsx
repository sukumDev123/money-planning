import React, { useContext, useEffect, useState } from 'react'
import FromTypeMoney from '../formTypeOfMoney/FromTypeMoney'
import Tables from '../tables/Table'
import './MoneyPlanning.css'
import TransectionStorage, { InformationMoney } from '../../presenters/TransectionStorage'
import { checkAddEventContext } from '../../providers/CheckAddEventProvider'
const MoneyPlan: React.FC = () => {
    const [datas, setDatas] = useState<InformationMoney[]>()

    const transectionClass = new TransectionStorage()
    const { checked } = useContext(checkAddEventContext)
    useEffect(() => {
        let isSub = true
        const apidata = transectionClass.list
        const calculor = apidata.reduce((sum, val) =>
            val.valueIsPlus
                ? sum + val.values[0]
                : sum - val.values[0]
            , 0)
        apidata.push({ color: "white", "perid": 1, "title": "เหลือ", values: [calculor], valueIsPlus: true })
        isSub && setDatas(apidata)
        return () => {
            isSub = false
        }
    }, [checked])

    return <div className="money-div">
        {datas?.map((data, ind) => <div key={ind}>
            <h5>{data.title}</h5>
            <h6 className={data.color}>{data.values}</h6>
        </div>)}
    </div>
}
const MoneyPlanning: React.FC = () => <div className="home-div">
    <div className="form">
        <FromTypeMoney></FromTypeMoney>
        <MoneyPlan></MoneyPlan>
    </div>
    <Tables></Tables>
</div>

export default MoneyPlanning