document.getElementById('darkModeToggle').onclick = () => toggleDarkMode();

const mobileNavMenu = document.getElementById('mobileNavMenu');

let isMenuOpen = false;
const menuToggle = () => {
    isMenuOpen ? mobileNavMenu.classList.add('hidden') : mobileNavMenu.classList.remove('hidden');
    isMenuOpen = !isMenuOpen;
};

document.getElementById('mobileNavButton').onclick = () => menuToggle();
