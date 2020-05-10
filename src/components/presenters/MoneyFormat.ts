export function money_format(money: number) {
    const moneyNumberToString = money.toFixed(2).toString()
    const filterMoneyOnlyIntAndOnlyDecimal = moneyNumberToString.split('.')
    const moneyStringToArray = filterMoneyOnlyIntAndOnlyDecimal[0].split('')
    const sizeData = moneyStringToArray.length
    const formatMoney = moneyStringToArray.map((data, ind) => {
        const checkIfIndLastNotNeedToUseFormatMoney = ind !== sizeData - 1
        if (checkIfIndLastNotNeedToUseFormatMoney) {
            // 1234567 when index mod 3 === 0 , I want to use , between integrate.

            if ((sizeData - 1 - ind) % 3 === 0) {
                return `${data},`
            }
        }
        return data
    })
    const formatMoneyReducOnlyFormatMoney = formatMoney.reduce(
        (preV, val) => preV + val,
        ''
    )

    return `${formatMoneyReducOnlyFormatMoney}`
}