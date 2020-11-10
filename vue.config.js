module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                appId: 'com.buscavarejos',
                productName: "Gestor Busca Varejos",
                copyright: "Copyright © year Busca Varejos",
                win: {
                    icon: 'public/bvj_icon.ico',
                }
            }
        }
    }
}