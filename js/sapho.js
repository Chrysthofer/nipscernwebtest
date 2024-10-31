document.addEventListener("DOMContentLoaded", function () { 
    // Get the navbar toggler button and the collapsible menu
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarMenu = document.getElementById('navbarNav');
    
    // Initialize the menu to be closed
    navbarMenu.style.display = 'none'; // Hide the menu initially
    navbarMenu.style.height = '0'; // Set the height to 0

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


document.addEventListener("DOMContentLoaded", function() {
    const headers = document.querySelectorAll('.collapsible-header');

    headers.forEach(header => {
        header.addEventListener('click', function () {
            const body = this.nextElementSibling;
            const icon = this.querySelector('.material-icons');

            // Check if any other collapsible body is open and close it
            headers.forEach(otherHeader => {
                const otherBody = otherHeader.nextElementSibling;
                if (otherBody !== body) {
                    otherBody.classList.remove('active'); // Collapse other bodies
                    otherBody.style.maxHeight = null; // Reset max height for other bodies
                    otherHeader.classList.remove('active'); // Reset icon rotation for other headers
                }
            });

            // Toggle the clicked item
            if (body.classList.contains('active')) {
                body.classList.remove('active'); // Collapse clicked body
                this.classList.remove('active'); // Reset icon rotation for clicked header
            } else {
                body.classList.add('active'); // Expand clicked body
                this.classList.add('active'); // Rotate icon
            }

            // Use requestAnimationFrame for smoother animations
            requestAnimationFrame(() => {
                if (body.classList.contains('active')) {
                    body.style.maxHeight = body.scrollHeight + 'px'; // Expand
                } else {
                    body.style.maxHeight = null; // Collapse
                }
            });
        });
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