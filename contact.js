document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fechar todos os itens primeiro
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir o item clicado se não estiver ativo
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Validação do Formulário
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !subject || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Por favor, insira um endereço de e-mail válido.');
                return;
            }
            
            // Simular envio do formulário
            const submitButton = contactForm.querySelector('.submit-button');
            submitButton.textContent = 'ENVIANDO...';
            submitButton.disabled = true;
            
            // Aqui você implementaria o envio real do formulário (AJAX, Fetch API, etc.)
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
                submitButton.textContent = 'ENVIAR MENSAGEM';
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Função para validar e-mail
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Máscara para telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            // Formatar como (XX) XXXXX-XXXX
            if (value.length > 0) {
                value = `(${value.substring(0, 2)}`;
                
                if (value.length > 2) {
                    value += `) ${value.substring(2, 7)}`;
                }
                
                if (value.length > 7) {
                    value += `-${value.substring(7, 11)}`;
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Animação dos elementos da página
    function animateElements() {
        const infoCards = document.querySelectorAll('.info-card');
        const formElements = document.querySelectorAll('.form-content, .form-image');
        
        infoCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
        
        formElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estado dos elementos animados
    document.querySelectorAll('.info-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease ' + (0.1 * Array.from(document.querySelectorAll('.info-card')).indexOf(card)) + 's';
    });
    
    document.querySelectorAll('.form-content, .form-image').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateElements);
    window.addEventListener('load', animateElements);
});