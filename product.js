document.addEventListener('DOMContentLoaded', function() {
    // Zoom na Imagem do Produto
    const zoomImage = document.getElementById('zoomImage');
    const imageZoom = document.getElementById('imageZoom');
    
    if (zoomImage && imageZoom) {
        zoomImage.addEventListener('mousemove', function(e) {
            if (!this.classList.contains('zoomed')) {
                this.classList.add('zoomed');
                imageZoom.style.display = 'block';
            }
            
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            const xPercent = (x / width) * 100;
            const yPercent = (y / height) * 100;
            
            // Posiciona o zoom
            imageZoom.style.left = `${e.clientX - 100}px`;
            imageZoom.style.top = `${e.clientY - 100}px`;
            
            // Ajusta o background-position
            imageZoom.style.backgroundImage = `url('${zoomImage.src}')`;
            imageZoom.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
        });
        
        zoomImage.addEventListener('mouseleave', function() {
            this.classList.remove('zoomed');
            imageZoom.style.display = 'none';
        });
    }
    
    // Trocar Imagem Principal ao Clicar nas Miniaturas
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove a classe active de todas as miniaturas
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Adiciona a classe active à miniatura clicada
            this.classList.add('active');
            
            // Atualiza a imagem principal
            const newImageSrc = this.querySelector('img').src;
            mainImage.src = newImageSrc;
            if (imageZoom) {
                imageZoom.style.backgroundImage = `url('${newImageSrc}')`;
            }
        });
    });
    
    // Controle de Quantidade
    const quantityInput = document.getElementById('quantity');
    const quantityMinus = document.querySelector('.quantity-minus');
    const quantityPlus = document.querySelector('.quantity-plus');
    
    if (quantityInput && quantityMinus && quantityPlus) {
        quantityMinus.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        quantityPlus.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
            }
        });
    }
    
    // Navegação entre Abas
    const tabHeaders = document.querySelectorAll('.tab-headers li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove a classe active de todos os headers e contents
            tabHeaders.forEach(h => h.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Adiciona a classe active ao header e content selecionados
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Modal de Avaliação
    const writeReviewBtn = document.querySelector('.write-review');
    const reviewModal = document.querySelector('.review-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    
    if (writeReviewBtn && reviewModal && modalCloseBtn) {
        writeReviewBtn.addEventListener('click', function() {
            reviewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        modalCloseBtn.addEventListener('click', function() {
            reviewModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Fechar modal ao clicar no overlay
        document.querySelector('.modal-overlay').addEventListener('click', function() {
            reviewModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Fechar modal com tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && reviewModal.classList.contains('active')) {
                reviewModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Envio do Formulário de Avaliação
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-review');
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            
            // Simular envio do formulário
            setTimeout(() => {
                alert('Avaliação enviada com sucesso! Obrigado por seu feedback.');
                reviewForm.reset();
                submitBtn.textContent = 'ENVIAR AVALIAÇÃO';
                submitBtn.disabled = false;
                reviewModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }, 1500);
        });
    }
    
    // Botão Comprar Agora
    const buyNowBtn = document.querySelector('.buy-now');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            // Adiciona ao carrinho e redireciona para checkout
            alert('Produto adicionado ao carrinho. Redirecionando para o checkout...');
            // Aqui você implementaria a lógica real de adicionar ao carrinho e redirecionar
            window.location.href = 'checkout.html';
        });
    }
    
    // Botão Adicionar ao Carrinho
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productName = document.querySelector('.product-details h1').textContent;
            const quantity = document.getElementById('quantity').value;
            const selectedColor = document.querySelector('input[name="color"]:checked').value;
            const selectedSize = document.getElementById('size').value;
            const selectedMount = document.querySelector('input[name="mount"]:checked').value;
            
            // Simular adição ao carrinho
            this.textContent = 'ADICIONADO!';
            this.style.backgroundColor = '#25D366';
            
            // Atualizar contador do carrinho
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                let count = parseInt(cartCount.textContent);
                cartCount.textContent = count + parseInt(quantity);
                cartCount.style.animation = 'bounce 0.5s';
                setTimeout(() => {
                    cartCount.style.animation = '';
                }, 500);
            }
            
            // Resetar botão após 2 segundos
            setTimeout(() => {
                this.textContent = 'ADICIONAR AO CARRINHO';
                this.style.backgroundColor = '';
            }, 2000);
            
            // Aqui você implementaria a lógica real de adicionar ao carrinho
            console.log('Produto adicionado:', {
                name: productName,
                quantity: quantity,
                color: selectedColor,
                size: selectedSize,
                mount: selectedMount
            });
        });
    }
    
    // Animação dos elementos ao rolar
    function animateOnScroll() {
        const elements = document.querySelectorAll('.product-container, .product-tabs, .related-products');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estado dos elementos animados
    document.querySelectorAll('.product-container, .product-tabs, .related-products').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Animação para o contador do carrinho
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: scale(1);
            }
            40% {
                transform: scale(1.3);
            }
            60% {
                transform: scale(1.1);
            }
        }
    `;
    document.head.appendChild(style);
});