import axios from "axios"
import store from '../store/store.js';
import Pushy from "pushy-electron"

// [ADICIONA NOTIFICAÇÃO]
async function requestPermission() {
    // Caso tenha, prossegue para obtenção do token
    const deviceToken = await Pushy.register({ appId: "5f8dbc18df5d930f1c90b161" });
    //Na clausula está sendo avaliado duas condições
    // Se token ja foi salvo(no caso a negação)
    // e
    // Se usuario está logado, uma proteção para não quebrar o backend 
    if (!isTokenSentToServer() && isLoggedIn()) {
        // Caso entre nesse bloco
        // Primeiro irá salvar o token no servidor
        console.log(deviceToken)
        await sendTokenToServer(deviceToken)
            // Depois define que foi salvo no navagador
            // Isso evita requisições desnecessarias
        setTokenSentToServer(true);

        return true
    }
}
// Envia token para o servidor
async function sendTokenToServer(currentToken) {
    const url = 'https://api.buscavarejos.com/estabelecimentos/notifications',
        body = {
            token: currentToken
        },
        header = {
            headers: {
                "uid": store.state.user.data.uid
            }
        };

    await axios.post(url, body, header);
}

// [REMOVE NOTIFICAÇÃO]
async function deleteToken() {
    // Obtem o token atual
    const currentToken = await Pushy.register({ appId: "5f8dbc18df5d930f1c90b161" });
    // delete o token do servidor
    await deleteTokenToServer(currentToken);
    // seta variavel local com falsa
    setTokenSentToServer(false);
    // retorna true
    return true;
}

async function deleteTokenToServer(token) {
    const url = `https://api.buscavarejos.com/estabelecimentos/notifications/${token}`,
        header = {
            headers: {
                "uid": store.state.user.data.uid
            }
        };

    await axios.delete(url, header)
}


// Verifica se usuario(loja) está logado
function isLoggedIn() {
    return store.state.user.loggedIn || false
}
// Verfica se token já foi salvo no servidor
function isTokenSentToServer() {
    const sentToServer = window.localStorage.getItem('sentToServer')
    if (sentToServer === '1')
        return true;

    if (sentToServer === '0')
        return false;

    return undefined;
}
// Define que token já foi salvo no servidor
function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}


export {
    requestPermission,
    deleteToken,
    isTokenSentToServer
}