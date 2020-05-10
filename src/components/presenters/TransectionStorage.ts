




export interface InformationMoney {
    title: string
    values: number[]

}

export default class TransectionStorage {
    get list(): InformationMoney[] {
        const list_trans = localStorage.getItem("transection") || ""
        if (list_trans) {
            return JSON.parse(list_trans)
        }
        return []
    }

    setList(transection: InformationMoney) {
        const oldT = this.list
        let transections: InformationMoney[] = []
        if (oldT.length) {
            transections = oldT
        }
        transections.push(transection)
        localStorage.setItem("transection", JSON.stringify(transections))
    }
}