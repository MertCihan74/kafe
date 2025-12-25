// Gallery JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initGalleryTabs();
    initGalleryModal();
    initGalleryFilters();
});

// Gallery Tab Navigation
function initGalleryTabs() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryContents = document.querySelectorAll('.gallery-content');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            galleryTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all gallery contents
            galleryContents.forEach(content => content.classList.remove('active'));

            // Show selected gallery content
            const category = this.getAttribute('data-category');
            const targetContent = document.getElementById(`${category}-gallery`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Gallery Modal Functionality
function initGalleryModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalClose = document.querySelector('.modal-close');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');

    let currentGalleryItems = [];
    let currentIndex = 0;

    // Open modal when clicking on gallery item
    document.addEventListener('click', function(e) {
        if (e.target.closest('.gallery-item')) {
            const galleryItem = e.target.closest('.gallery-item');
            const activeGallery = document.querySelector('.gallery-content.active');

            if (activeGallery) {
                currentGalleryItems = Array.from(activeGallery.querySelectorAll('.gallery-item'));
                currentIndex = currentGalleryItems.indexOf(galleryItem);

                updateModalContent(galleryItem);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';

                // Animate modal entrance
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
            }
        }
    });

    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Navigation buttons
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });

    function updateModalContent(galleryItem) {
        const img = galleryItem.querySelector('img');
        const title = galleryItem.querySelector('h3').textContent;
        const description = galleryItem.querySelector('p').textContent;

        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = title;
        modalDescription.textContent = description;

        // Update navigation buttons visibility
        prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentIndex < currentGalleryItems.length - 1 ? 'block' : 'none';
    }

    function showPrevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateModalContent(currentGalleryItems[currentIndex]);
        }
    }

    function showNextImage() {
        if (currentIndex < currentGalleryItems.length - 1) {
            currentIndex++;
            updateModalContent(currentGalleryItems[currentIndex]);
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Gallery Filtering and Search
function initGalleryFilters() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');

    // Add search functionality
    const gallerySection = document.querySelector('.gallery-section');
    if (!gallerySection) return;

    const searchContainer = document.createElement('div');
    searchContainer.className = 'gallery-search';
    searchContainer.innerHTML = `
        <div class="search-input-container">
            <i class="fas fa-search"></i>
            <input type="text" id="gallerySearch" placeholder="Galeri içinde ara...">
            <button id="clearSearch" style="display: none;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Insert search before gallery tabs
    const container = document.querySelector('.container');
    const galleryTabsElement = document.querySelector('.gallery-tabs');
    container.insertBefore(searchContainer, galleryTabsElement);

    const searchInput = document.getElementById('gallerySearch');
    const clearButton = document.getElementById('clearSearch');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();

        if (searchTerm) {
            clearButton.style.display = 'block';
            filterGalleryItems(searchTerm);
        } else {
            clearButton.style.display = 'none';
            showAllGalleryItems();
        }
    });

    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearButton.style.display = 'none';
        showAllGalleryItems();
    });
}

function filterGalleryItems(searchTerm) {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const category = item.getAttribute('data-category');

        const matchesSearch = title.includes(searchTerm) ||
                             description.includes(searchTerm) ||
                             category.includes(searchTerm);

        if (matchesSearch) {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';

            // Animate in
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
        } else {
            item.style.display = 'none';
        }
    });
}

function showAllGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';

        // Animate in
        setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 50);
    });
}

// Gallery Statistics (Optional Enhancement)
function initGalleryStats() {
    const galleryContents = document.querySelectorAll('.gallery-content');

    galleryContents.forEach(content => {
        const items = content.querySelectorAll('.gallery-item');
        const category = content.id.replace('-gallery', '');

        // Add count badge to tabs
        const tab = document.querySelector(`[data-category="${category}"]`);
        if (tab) {
            const badge = document.createElement('span');
            badge.className = 'gallery-count';
            badge.textContent = items.length;
            tab.appendChild(badge);
        }
    });
}

// Initialize stats on load
initGalleryStats();

// Lazy Loading for Gallery Images
function initLazyLoading() {
    const galleryImages = document.querySelectorAll('.gallery-item img');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        galleryImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        galleryImages.forEach(img => {
            img.classList.add('loaded');
        });
    }
}

// Initialize lazy loading
initLazyLoading();

// Gallery Hover Effects
function initGalleryHoverEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const overlay = item.querySelector('.gallery-overlay');
        const image = item.querySelector('img');

        item.addEventListener('mouseenter', function() {
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
            image.style.transform = 'scale(1.1)';
        });

        item.addEventListener('mouseleave', function() {
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(20px)';
            image.style.transform = 'scale(1)';
        });
    });
}

// Initialize hover effects
initGalleryHoverEffects();
