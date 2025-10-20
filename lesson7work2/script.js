document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.toggle-button');
    const answer = document.querySelector('.answer-content');
    button.addEventListener('click', () => {
        answer.classList.toggle('visible');
    });
});
