// Filtro de Produtos
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const categoryFilter = document.getElementById('category');
    const materialFilter = document.getElementById('material');
    const sortFilter = document.getElementById('sort');
    const resetButton = document.querySelector('.filter-reset');
    const productCards = document.querySelectorAll('.product-card');
    
    // Função para filtrar produtos
    function filterProducts() {
        const categoryValue = categoryFilter.value;
        const materialValue = materialFilter.value;
        
        productCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardMaterial = card.dataset.material;
            
            // Verificar correspondência de categoria e material
            const categoryMatch = categoryValue === 'all' || cardCategory.includes(categoryValue);
            const materialMatch = materialValue === 'all' || cardMaterial === materialValue;
            
            if (categoryMatch && materialMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Ordenar produtos
        sortProducts();
    }
    
    // Função para ordenar produtos
    function sortProducts() {
        const sortValue = sortFilter.value;
        const productsContainer = document.querySelector('.products-grid');
        const productCardsArray = Array.from(document.querySelectorAll('.product-card[style*="display: block"]'));
        
        productCardsArray.sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);
            
            switch (sortValue) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'new':
                    // Ordenar por badge "NOVO" primeiro
                    const isNewA = a.querySelector('.product-badge.new') !== null;
                    const isNewB = b.querySelector('.product-badge.new') !== null;
                    return isNewB - isNewA;
                case 'popular':
                default:
                    // Ordenar por avaliações (simulado)
                    const ratingA = parseInt(a.querySelector('.product-rating span').textContent.match(/\d+/)[0]);
                    const ratingB = parseInt(b.querySelector('.product-rating span').textContent.match(/\d+/)[0]);
                    return ratingB - ratingA;
            }
        });
        
        // Reorganizar os produtos no DOM
        productCardsArray.forEach(card => {
            productsContainer.appendChild(card);
        });
    }
    
    // Event Listeners
    categoryFilter.addEventListener('change', filterProducts);
    materialFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', sortProducts);
    
    // Botão de reset
    resetButton.addEventListener('click', function() {
        categoryFilter.value = 'all';
        materialFilter.value = 'all';
        sortFilter.value = 'popular';
        filterProducts();
    });
    
    // Inicializar filtros
    filterProducts();
    
    // Modal de Visualização Rápida
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    
    // Abrir modal
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productRating = productCard.querySelector('.product-rating').innerHTML;
            const productPrice = productCard.querySelector('.price').textContent;
            const oldPrice = productCard.querySelector('.old-price')?.textContent || '';
            const productDescription = productCard.querySelector('.product-description').textContent;
            
            // Atualizar conteúdo do modal
            const modalDetails = quickViewModal.querySelector('.modal-details');
            modalDetails.querySelector('h2').textContent = productName;
            modalDetails.querySelector('.product-rating').innerHTML = productRating;
            modalDetails.querySelector('.price').textContent = productPrice;
            
            const oldPriceElement = modalDetails.querySelector('.old-price');
            if (oldPrice && oldPriceElement) {
                oldPriceElement.textContent = oldPrice;
                oldPriceElement.style.display = 'inline';
            } else if (oldPriceElement) {
                oldPriceElement.style.display = 'none';
            }
            
            modalDetails.querySelector('.product-description').textContent = productDescription;
            
            // Mostrar modal
            quickViewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fechar modal
    function closeModal() {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    
    // Trocar imagem principal ao clicar nas miniaturas
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const newImageSrc = this.querySelector('img').src;
            mainImage.src = newImageSrc;
        });
    });
    
    // Adicionar aos favoritos
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            this.innerHTML = this.classList.contains('active') ? 
                '<i class="fas fa-heart"></i>' : 
                '<i class="far fa-heart"></i>';
            
            // Animação
            if (this.classList.contains('active')) {
                this.style.color = '#ff4d4d';
                this.style.animation = 'heartBeat 0.5s';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            }
        });
    });
    
    // Seletor de quantidade
    const quantityMinus = document.querySelector('.quantity-minus');
    const quantityPlus = document.querySelector('.quantity-plus');
    const quantityInput = document.querySelector('.quantity-selector input');
    
    quantityMinus.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    quantityPlus.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });
    
    // Seletor de tamanho
    const sizeOptions = document.querySelectorAll('.size-option');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Seletor de cor
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Paginação
    const pageButtons = document.querySelectorAll('.page-button:not(.next)');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Aqui você implementaria a lógica para carregar a página correspondente
        });
    });
});

// Animação para o coração dos favoritos
const style = document.createElement('style');
style.textContent = `
    @keyframes heartBeat {
        0% { transform: scale(1); }
        25% { transform: scale(1.2); }
        50% { transform: scale(1); }
        75% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);