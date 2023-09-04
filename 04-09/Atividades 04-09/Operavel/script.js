// Obtendo referência ao botão que ativa o menu dropdown
const dropdownButton = document.getElementById('dropdownButton');

// Obtendo referência à div que contém os links do menu dropdown
const dropdownContent = document.getElementById('dropdownContent');

// Criando uma lista/array de todos os links dentro do menu dropdown
const dropdownLinks = Array.from(dropdownContent.querySelectorAll('a'));

// Variável para rastrear o link atualmente focado dentro do menu dropdown
let currentFocusIndex = -1;

// Função para alternar a visibilidade do menu dropdown
function toggleDropdown() {
    // Verifica se o menu dropdown está sendo exibido ou não
    const isDisplayed = getComputedStyle(dropdownContent).display !== 'none';

    // Alterna a exibição do menu dropdown dependendo do estado atual
    dropdownContent.style.display = isDisplayed ? 'none' : 'block';

    if (isDisplayed) {
        // Se o menu estiver sendo aberto, torna os links acessíveis por tabulação e foca no primeiro link
        dropdownLinks.forEach(link => {
            link.setAttribute('tabindex', '0');
        });
        dropdownLinks[0].focus();  // Move o foco para o primeiro link
        currentFocusIndex = 0;  // Define o índice de foco para o primeiro link
    } else {
        dropdownLinks.forEach(link => {
            link.setAttribute('tabindex', '-1');
        });
        currentFocusIndex = -1;  // Reinicia o índice de foco
    }
}

// Função para lidar com eventos de tecla pressionada
function handleKeyDown(event) {
    switch (event.keyCode) {
        case 114: // F3
            event.preventDefault(); // Previne o comportamento padrão da tecla F3 (geralmente "buscar" em navegadores)
            toggleDropdown();      // Ativa a função para alternar o menu dropdown
            break;
        case 40: // Seta para baixo
            event.preventDefault(); // Previne a rolagem da página ao pressionar a seta para baixo
            // Move o foco para o próximo link, se não estiver no último link
            if (currentFocusIndex < dropdownLinks.length - 1) {
                currentFocusIndex++;
                dropdownLinks[currentFocusIndex].focus();
            }
            break;
        case 38: // Seta para cima
            event.preventDefault(); // Previne a rolagem da página ao pressionar a seta para cima
            // Move o foco para o link anterior, se não estiver no primeiro link
            if (currentFocusIndex > 0) {
                currentFocusIndex--;
                dropdownLinks[currentFocusIndex].focus();
            }
            break;
        case 27: // ESC
            toggleDropdown();      // Fecha o menu dropdown
            dropdownButton.focus(); // Retorna o foco ao botão do menu dropdown
            break;
    }
}

// Adiciona um ouvinte de evento para o click do botão, para alternar o menu dropdown
dropdownButton.addEventListener('click', toggleDropdown);

// Adiciona um ouvinte de evento global para a tecla pressionada, para lidar com a navegação do menu via teclado
document.addEventListener('keydown', handleKeyDown);