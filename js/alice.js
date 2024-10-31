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



document.getElementById("toggle-diagram").addEventListener("click", function() {
    var diagram = document.getElementById("diagram-container");
    if (diagram.classList.contains("show")) {
        diagram.classList.remove("show");
        this.textContent = "Show Diagram";
    } else {
        diagram.classList.add("show");
        this.textContent = "Hide Diagram";
    }
});


// Get the button
const backToTopBtn = document.getElementById('backToTopBtn');

// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.classList.add('show');
        backToTopBtn.classList.remove('hide');
    } else {
        backToTopBtn.classList.add('hide');
        backToTopBtn.classList.remove('show');
    }
};

// When the user clicks on the button, scroll to the top of the document
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


document.addEventListener("DOMContentLoaded", function () { 
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarMenu = document.getElementById('navbarNav');

    navbarToggler.addEventListener('click', function () {
        navbarMenu.classList.toggle('menu-open'); // Toggle class for smooth open/close
    });
});


document.addEventListener("DOMContentLoaded", function() {
        document.body.classList.add("fade", "show");
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
