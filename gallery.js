document.addEventListener('DOMContentLoaded', function() {
    // Filtro da Galeria
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            
            // Filtrar itens da galeria
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.dataset.category.includes(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption h3');
    const lightboxDescription = document.querySelector('.lightbox-caption p');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const viewButtons = document.querySelectorAll('.view-button');
    
    let currentImageIndex = 0;
    const images = [];
    
    // Preencher array com informações das imagens
    galleryItems.forEach((item, index) => {
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        
        images.push({
            src: imgSrc,
            title: title,
            description: description,
            element: item
        });
        
        // Adicionar evento de clique para cada botão de visualização
        item.querySelector('.view-button').addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    // Função para abrir o lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightbox();
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Função para fechar o lightbox
    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Função para atualizar o conteúdo do lightbox
    function updateLightbox() {
        const image = images[currentImageIndex];
        lightboxImage.src = image.src;
        lightboxCaption.textContent = image.title;
        lightboxDescription.textContent = image.description;
    }
    
    // Função para navegar para a imagem anterior
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightbox();
    }
    
    // Função para navegar para a próxima imagem
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightbox();
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Fechar lightbox ao clicar no overlay
    document.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
    
    // Navegação com teclado
    document.addEventListener('keydown', function(e) {
        if (!lightboxModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
    
    // Animação dos itens da galeria
    function animateGalleryItems() {
        galleryItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estado dos itens da galeria
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease ' + (0.1 * Array.from(galleryItems).indexOf(item)) + 's';
    });
    
    window.addEventListener('scroll', animateGalleryItems);
    window.addEventListener('load', animateGalleryItems);
    
    // Botão "Carregar Mais" (simulado)
    const loadMoreButton = document.querySelector('.load-more button');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            // Simular carregamento de mais itens
            this.textContent = 'CARREGANDO...';
            this.disabled = true;
            
            setTimeout(() => {
                // Aqui você implementaria a lógica para carregar mais itens
                this.textContent = 'NÃO HÁ MAIS ITENS';
                this.style.opacity = '0.5';
            }, 1500);
        });
    }
});