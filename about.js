document.addEventListener('DOMContentLoaded', function() {
    // Animação da Timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        timelineItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.querySelector('.timeline-content').style.transform = 'translateX(0)';
                item.querySelector('.timeline-image').style.transform = 'translateX(0)';
            }
        });
    }
    
    // Inicializar estado da timeline
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        const content = item.querySelector('.timeline-content');
        const image = item.querySelector('.timeline-image');
        
        if (item.classList.contains('timeline-item') && !item.classList.contains('timeline-item:nth-child(odd)')) {
            content.style.transform = 'translateX(-50px)';
            image.style.transform = 'translateX(50px)';
        } else {
            content.style.transform = 'translateX(50px)';
            image.style.transform = 'translateX(-50px)';
        }
        
        content.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
        image.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
    });
    
    window.addEventListener('scroll', animateTimeline);
    window.addEventListener('load', animateTimeline);
    
    // Testimonial Slider (similar ao da página inicial)
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide change
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // Animação dos cards de filosofia
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    
    function animatePhilosophyCards() {
        philosophyCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estado dos cards de filosofia
    philosophyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease ' + (0.1 * Array.from(philosophyCards).indexOf(card)) + 's';
    });
    
    window.addEventListener('scroll', animatePhilosophyCards);
    window.addEventListener('load', animatePhilosophyCards);
    
    // Animação dos membros do time
    const teamMembers = document.querySelectorAll('.team-member');
    
    function animateTeamMembers() {
        teamMembers.forEach((member, index) => {
            const memberPosition = member.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (memberPosition < screenPosition) {
                member.style.opacity = '1';
                member.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estado dos membros do time
    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        member.style.transition = 'all 0.6s ease ' + (0.1 * Array.from(teamMembers).indexOf(member)) + 's';
    });
    
    window.addEventListener('scroll', animateTeamMembers);
    window.addEventListener('load', animateTeamMembers);
    
    // Animação dos parceiros
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    function animatePartnerLogos() {
        partnerLogos.forEach((logo, index) => {
            const logoPosition = logo.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (logoPosition < screenPosition) {
                logo.style.opacity = '1';
                logo.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estado dos logos de parceiros
    partnerLogos.forEach(logo => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
        logo.style.transition = 'all 0.6s ease ' + (0.1 * Array.from(partnerLogos).indexOf(logo)) + 's';
    });
    
    window.addEventListener('scroll', animatePartnerLogos);
    window.addEventListener('load', animatePartnerLogos);
});