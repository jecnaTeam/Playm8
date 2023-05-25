
// Hidden
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
            observer.unobserve(entry.target)
        } else {
            entry.target.classList.remove('show')
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el))


const w1 = document.getElementById('wave-1');
const w2 = document.getElementById('wave-2');
const w3 = document.getElementById('wave-3');
const w4 = document.getElementById('wave-4');

window.addEventListener('scroll', () => {
    let scroll = window.scrollY; 

    w1.style.left = -scroll * 0.08 + 'px';
    w2.style.left = -scroll * 0.17 + 'px';
    w3.style.left = -scroll * 0.09 + 'px';
    w4.style.left = -scroll * 0.13 + 'px';
})
