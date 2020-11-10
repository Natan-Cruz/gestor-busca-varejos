import './main.css';

export default (msg, time) => {
    const span = document.createElement('span');
    span.setAttribute('class','message-popup')
    span.innerHTML = msg;

    let duration = time ? time : 4000
    setTimeout(() => {
        requestAnimationFrame(function(){
            span.style.animationName = 'animation-close'    
        })
    }, duration  );

    setTimeout(() => {
        document.body.removeChild(span);
    }, duration + 300);

    document.body.appendChild(span);
}