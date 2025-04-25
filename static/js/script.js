document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });

    // Header scroll behavior
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Initialize Yandex Map
    ymaps.ready(initMap);
    
    function initMap() {
        const mapElement = document.getElementById('yandex-map');
        
        if (mapElement) {
            const myMap = new ymaps.Map('yandex-map', {
                center: [43.238949, 76.945327], // Almaty coordinates
                zoom: 16,
                controls: ['zoomControl', 'fullscreenControl']
            });
            
            // Address geocoding
            ymaps.geocode('г. Алматы, ул. Сатпаева, 76', {
                results: 1
            }).then(function(res) {
                const firstGeoObject = res.geoObjects.get(0);
                const coords = firstGeoObject.geometry.getCoordinates();
                
                // Create placemark
                const placemark = new ymaps.Placemark(coords, {
                    balloonContent: '<strong>SmartBuh</strong><br>г. Алматы, ул. Сатпаева, 76'
                }, {
                    preset: 'islands#blueFinanceIcon'
                });
                
                myMap.geoObjects.add(placemark);
                myMap.setCenter(coords);
                
                // Fit map to show placemark
                myMap.setBounds(myMap.geoObjects.getBounds(), {
                    checkZoomRange: true,
                    zoomMargin: 30
                });
            });
        }
    }

    // Animation on scroll
    const animateElements = document.querySelectorAll('.service-card, .case-card, .usp-card, .advantage');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // Add animation class
    document.querySelectorAll('.service-card, .case-card, .usp-card, .advantage').forEach(element => {
        element.classList.add('animate-prepare');
    });
    
    // Check for elements in view on load and scroll
    window.addEventListener('scroll', checkIfInView);
    checkIfInView();

    // Handle CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real scenario, this would open a form or initiate contact
            // For this example, we'll just show an alert
            alert('Спасибо за интерес! В полной версии сайта здесь будет форма связи. Пожалуйста, свяжитесь с нами по телефону +7 707 314-65-64 или email: smart_buh_kz@mail.ru');
        });
    });
});
