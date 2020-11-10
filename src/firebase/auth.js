import Axios from "axios"

class Auth {
    constructor(dbName) {
        this.dbName = dbName
        this.events = new Map()
    }
    async singIn(email, password) {
        const url = "https://api.buscavarejos.com/estabelecimentos/auth/login"
        const body = {
            email,
            password
        }
        const { data } = await Axios.post(url, body)
        const user = {
            id: data.id,
            uid: data.uid,
            name: data.name,
            email: data.email,
            photoURL: data.logo
        }
        this.setUser(user)
        return user
    }

    singOut() {
        this.setUser("")
    }

    getCurrentUser() {
        const user = JSON.parse(window.localStorage.getItem(this.dbName))
        return user
    }

    setUser(user) {
        this.emit("onAuthStateChanged", user)
        window.localStorage.setItem(this.dbName, JSON.stringify(user))
    }


    on(event, callback) {
        this.events.set(event, callback)
        callback(this.getCurrentUser())
    }

    emit(event, payload) {
        this.events.get(event)(payload)
    }

}

const auth = new Auth("user")
export default auth