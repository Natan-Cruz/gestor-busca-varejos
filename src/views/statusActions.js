import Axios from "axios"

const STATUS = {
    REALIZADO: 1,
    ACEITO: 2,
    DESPACHADO: 3,
    ENTREGUE: 4,
    RETORNADO: 5,
    CANCELADO: 6
}

async function alterStatus(uid, orderId, status, message) {

    const url = "https://api.buscavarejos.com/estabelecimentos/pedidos/status",
        body = {
            order_id: orderId,
            status: status,
            message: message
        }

    return await Axios.post(url, body, {
        headers: {
            "uid": uid
        }
    })
}

export {
    alterStatus,
    STATUS
}