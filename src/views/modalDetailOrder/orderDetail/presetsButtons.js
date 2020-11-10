const presets = new Map()

/**
 * São seis status possiveis para o pedido
 * E cada status requer um botao para uma ação diferente
 */

// Preset default 
presets.set(0, {
    dispachOrder: false,
    cancelOrder: false,
    agroupOrder: false,
    returnedOrder: false,
    undoOrder: false,
    concludeOrder: false,
    confirmOrder: false
});
// Pedido realizado
presets.set(1, {
    confirmOrder: true,
    cancelOrder_50: true
});
// Pedido realizado
presets.set(2, {
    dispachOrder: true,
    cancelOrder_100: true,
    agroupOrder: true
});

// Pedido despachado
presets.set(3, {
    returnedOrder: false,
    concludeOrder: true,
    cancelOrder_50: true,
})

// Pedido entregue
presets.set(4, {})

// Pedido retornado
presets.set(5, {
    dispachOrder: true,
    cancelOrder_50: true
})

// Pedido cancelado
presets.set(6, {
    undoOrder: true
})

export default presets