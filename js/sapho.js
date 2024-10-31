document.addEventListener("DOMContentLoaded", function () { 
    // Get the navbar toggler button and the collapsible menu
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarMenu = document.getElementById('navbarNav');
    
    let menuOpen = false; // Track the menu state

    // Toggle the menu open/close when the button is clicked
    navbarToggler.addEventListener('click', function () {
        if (menuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
        menuOpen = !menuOpen; // Toggle the state
    });

    function openMenu() {
        navbarMenu.style.display = 'block'; // Ensure menu is visible
        setTimeout(() => {
            navbarMenu.style.height = navbarMenu.scrollHeight + 'px'; // Expand the menu smoothly
        }, 10); // Small delay for smooth animation
    }

    function closeMenu() {
        navbarMenu.style.height = '0'; // Collapse the menu smoothly
        navbarMenu.addEventListener('transitionend', function () {
            if (!menuOpen) {
                navbarMenu.style.display = 'none'; // Hide the menu completely after transition ends
            }
        }, { once: true });
    }
});

document.querySelectorAll('.collapsible-header').forEach(header => {
    header.addEventListener('click', function() {
        const body = this.nextElementSibling;
        const icon = this.querySelector('.material-icons');

        // Toggle max-height and rotate icon
        if (body.style.maxHeight) {
            body.style.maxHeight = null; // Close body
            this.classList.remove('active'); // Reset icon rotation
        } else {
            document.querySelectorAll('.collapsible-body').forEach(bodyItem => {
                bodyItem.style.maxHeight = null; // Close all other bodies
            });
            document.querySelectorAll('.collapsible-header').forEach(headerItem => {
                headerItem.classList.remove('active'); // Reset all other icons
            });
            body.style.maxHeight = body.scrollHeight + "px"; // Open clicked body
            this.classList.add('active'); // Rotate icon
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Try to get selectedLanguage and selectedFlag elements if they exist
    const selectedLanguage = document.querySelector('.selected-language');
    const selectedFlag = document.getElementById('selected-flag');

    // Load the saved language from localStorage
    const storedLanguage = JSON.parse(localStorage.getItem('selectedLanguage'));

    // Only update selectedLanguage and selectedFlag if they exist on the current page
    if (storedLanguage) {
        if (selectedLanguage) {
            selectedLanguage.textContent = storedLanguage.lang === 'en' ? '🇬🇧 English' :
                storedLanguage.lang === 'pt' ? '🇧🇷 Português' :
                storedLanguage.lang === 'no' ? '🇳🇴 Norge' : '🇫🇷 Français';
        }
        if (selectedFlag) {
            selectedFlag.src = storedLanguage.logo;
        }

        // Load translations for the stored language and apply to the page
        loadTranslations().then(translations => {
            translatePage(translations, storedLanguage.lang);
        });
    }
});

// Function to load translations from the JSON file
async function loadTranslations() {
    const response = await fetch('language.json');
    return await response.json();
}

// Function to apply translations based on the selected language
function translatePage(translations, lang) {
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    elementsToTranslate.forEach((element) => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
}