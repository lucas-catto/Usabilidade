const toggleContrastBtn = document.getElementById('toggleContrast');
const body              = document.body;

toggleContrastBtn.addEventListener('click', function () {
    body.classList.toggle('high-contrast');
    toggleContrastBtn.classList.toggle('high-contrast-button');
});
