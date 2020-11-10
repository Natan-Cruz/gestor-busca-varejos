function openModal(id_order) {
    const modal = document.querySelector('.notification-in-app'),
        content = document.querySelector('.content-notification-in-app');

    modal.classList.add('display-modal_flex');

    document.querySelector('.code-order').textContent = `#${id_order}`
    setTimeout(() => {
        requestAnimationFrame(() => {
            document.querySelector('html').style.overflow = 'hidden'
            content.classList.add('show-content-modal')
            modal.classList.add('show-modal')
        })
    }, 50)
    document.querySelector('.btn-acompanhar').addEventListener('click', closeModal, false)
    document.querySelector('.button-exit-modal').addEventListener('click', closeModal, false)
}

function closeModal() {
    document.querySelector('.btn-acompanhar').addEventListener('click', closeModal, false)
    document.querySelector('.button-exit-modal').remove('click', closeModal, false)

    const modal = document.querySelector('.notification-in-app'),
        content = document.querySelector('.content-notification-in-app');

    requestAnimationFrame(() => {
        document.querySelector('html').style.overflow = 'auto'
        content.classList.remove('show-content-modal');
        modal.classList.remove('show-modal')
    })
    setTimeout(() => {
        modal.classList.remove('display-modal_flex')
    }, 200)
}

function notificationInApp(id_order) {
    openModal(id_order)
}
export default notificationInApp