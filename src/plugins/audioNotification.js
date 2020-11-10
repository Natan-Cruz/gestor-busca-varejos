import Vue from "vue";
import messagePopup from "../components/message-popup/message-popup";

export default {
    install(vue) {
        const root = new Vue({
            data: {
                audio: undefined,
                isRunning: false,
                error: false,
                pendingAudio: 0,
                isLoading: false
            },
            created() {
                this.createAudio()
            },
            methods: {
                createAudio() {
                    this.isLoading = true;
                    this.error = false;

                    this.audio = new Audio()

                    this.audio.addEventListener("loadeddata", () => {
                        console.log("[AUDIO] foi carregado");
                        this.isLoading = false;

                        if (this.pendingAudio)
                            this.playAudioNotification()
                    })

                    this.audio.addEventListener("error", () => {
                        this.error = true;
                        console.log("[AUDIO] erro no carregamento")

                        messagePopup("Erro no carregamento do som da notificação", 4000)
                    })

                    this.audio.setAttribute("src", "https://api.buscavarejos.com/statics/hand_bell_ringing_1.mp3")
                    this.audio.setAttribute("loop", true)
                },
                playAudioNotification() {
                    // Se requisitado a execução do audio
                    // e o mesmo não estiver carregado 
                    // ou estiver em estado de erro
                    // marca como pendente a execução do audio
                    if (this.error || this.isLoading)
                        return this.pendingAudio = true

                    const playPromise = this.audio.play();

                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                                console.log("[AUDIO] foi iniciado")
                                this.isRunning = true;
                                this.pendingAudio = false;
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                },
                pauseAudioNotification() {
                    if (this.error || this.isLoading)
                        return;

                    const playPromise = this.audio.play();

                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                                console.log("[AUDIO] foi pausado")
                                this.audio.pause()
                                this.audio.currentTime = 0
                                this.isRunning = false
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                }
            }
        })


        // Make the root instance available in all components
        vue.prototype.$audioNotification = root

    }
}