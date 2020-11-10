const formatPrice = (value) => {
    if (!value) return "R$ --,--";

    if (typeof value === "number")
        value = value.toFixed(2);

    const splited = value.split('.')

    if (splited.length === 1) {
        return `R$ ${value},00`
    }

    if (splited[1].length === 1) {
        return `R$ ${value.replace('.', ',')}0`
    }

    if (splited[1].length === 2) {
        return `R$ ${value.replace('.', ',')}`
    }
}
const functions = {
    formatPrice
}
const Format = (prop) => {
    let obj = {}

    obj[prop] = functions[prop]

    return obj
}
export default Format