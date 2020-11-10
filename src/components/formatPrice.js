function formatPrice(value) {
    if (!value) return "R$0,00"
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

export { formatPrice }