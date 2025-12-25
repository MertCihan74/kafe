// Menu Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initMenuTabs();
    initMenuFilters();
});

// Menu Tab Navigation
function initMenuTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Hide all menu contents
            menuContents.forEach(content => content.classList.remove('active'));

            // Show selected menu content
            const category = this.getAttribute('data-category');
            const targetContent = document.getElementById(category);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Smooth scroll to menu content
            const menuCategories = document.querySelector('.menu-categories');
            if (menuCategories) {
                menuCategories.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Menu Filtering System
function initMenuFilters() {
    // Add filter buttons for dietary preferences
    const menuGrid = document.querySelector('.menu-grid');
    if (!menuGrid) return;

    // Create filter container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'menu-filters';
    filterContainer.innerHTML = `
        <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">
                <i class="fas fa-utensils"></i>
                Tümü
            </button>
            <button class="filter-btn" data-filter="vegetarian">
                <i class="fas fa-seedling"></i>
                Vejetaryen
            </button>
            <button class="filter-btn" data-filter="spicy">
                <i class="fas fa-pepper-hot"></i>
                Baharatlı
            </button>
            <button class="filter-btn" data-filter="featured">
                <i class="fas fa-star"></i>
                Öne Çıkan
            </button>
        </div>
    `;

    // Insert filter container before menu grid
    menuGrid.parentNode.insertBefore(filterContainer, menuGrid);

    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterMenuItems(filter);

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterMenuItems(filter) {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const isVegetarian = item.querySelector('.dietary');
        const isSpicy = item.querySelector('.spicy-level');
        const isFeatured = item.classList.contains('featured');

        let showItem = false;

        switch(filter) {
            case 'all':
                showItem = true;
                break;
            case 'vegetarian':
                showItem = isVegetarian !== null;
                break;
            case 'spicy':
                showItem = isSpicy !== null && !isSpicy.textContent.includes('Baharatsız');
                break;
            case 'featured':
                showItem = isFeatured;
                break;
        }

        if (showItem) {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            // Animate in
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        } else {
            item.style.display = 'none';
        }
    });
}

// QR Code functionality
function initQRCode() {
    const qrDownloadBtn = document.querySelector('.qr-download');
    const qrShareBtn = document.querySelector('.qr-share');

    if (qrDownloadBtn) {
        qrDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Create a detailed QR code canvas
            const qrCanvas = document.createElement('canvas');
            qrCanvas.width = 300;
            qrCanvas.height = 300;
            const ctx = qrCanvas.getContext('2d');

            // Background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 300, 300);

            // QR Code pattern (simplified representation)
            ctx.fillStyle = '#000000';

            // Outer squares
            ctx.fillRect(20, 20, 60, 60);
            ctx.fillRect(220, 20, 60, 60);
            ctx.fillRect(20, 220, 60, 60);

            // Inner squares (white)
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(30, 30, 40, 40);
            ctx.fillRect(230, 30, 40, 40);
            ctx.fillRect(30, 230, 40, 40);

            // Small squares in corners
            ctx.fillStyle = '#000000';
            ctx.fillRect(35, 35, 10, 10);
            ctx.fillRect(55, 35, 10, 10);
            ctx.fillRect(35, 55, 10, 10);

            ctx.fillRect(235, 35, 10, 10);
            ctx.fillRect(255, 35, 10, 10);
            ctx.fillRect(235, 55, 10, 10);

            ctx.fillRect(35, 235, 10, 10);
            ctx.fillRect(55, 235, 10, 10);
            ctx.fillRect(35, 255, 10, 10);

            // Random pattern in center (simplified QR data)
            const pattern = [
                [1,0,1,0,1,0,1,0,1,0,1,0,1],
                [0,1,0,1,0,1,0,1,0,1,0,1,0],
                [1,0,1,1,1,0,1,0,1,0,1,0,1],
                [0,1,0,0,0,1,0,1,0,1,0,1,0],
                [1,0,1,0,1,0,1,1,1,0,1,0,1],
                [0,1,0,1,0,1,0,0,0,1,0,1,0],
                [1,0,1,0,1,0,1,0,1,0,1,1,1],
                [0,1,0,1,0,1,0,1,0,1,0,0,0],
                [1,1,1,0,1,0,1,0,1,0,1,0,1],
                [0,0,0,1,0,1,0,1,0,1,0,1,0],
                [1,0,1,0,1,1,1,0,1,0,1,0,1],
                [0,1,0,1,0,0,0,1,0,1,0,1,0],
                [1,0,1,0,1,0,1,0,1,1,1,0,1]
            ];

            for (let i = 0; i < pattern.length; i++) {
                for (let j = 0; j < pattern[i].length; j++) {
                    if (pattern[i][j]) {
                        ctx.fillRect(90 + j * 8, 90 + i * 8, 8, 8);
                    }
                }
            }

            // Add text
            ctx.fillStyle = '#000000';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Liman Balık Restaurant', 150, 270);
            ctx.fillText('Menu - www.limanbalik.com', 150, 290);

            // Download QR code
            const link = document.createElement('a');
            link.download = 'liman-balik-menu-qr.png';
            link.href = qrCanvas.toDataURL();
            link.click();

            showNotification('QR kod başarıyla indirildi!', 'success');
        });
    }

    if (qrShareBtn) {
        qrShareBtn.addEventListener('click', function(e) {
            e.preventDefault();

            const menuUrl = window.location.origin + '/menu.html';

            if (navigator.share) {
                navigator.share({
                    title: 'Liman Balık Restaurant - Menü',
                    text: 'Lezzetli Karadeniz yemeklerini keşfedin!',
                    url: menuUrl
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(menuUrl).then(() => {
                    showNotification('Menü linki panoya kopyalandı!', 'success');
                });
            }
        });
    }
}

// Menu item hover effects
function initMenuItemEffects() {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const image = item.querySelector('.menu-item-image img');

        item.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });

        item.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// Initialize all menu functions
initQRCode();
initMenuItemEffects();

// Menu search functionality (optional enhancement)
function initMenuSearch() {
    const menuHeader = document.querySelector('.menu-header');
    if (!menuHeader) return;

    const searchContainer = document.createElement('div');
    searchContainer.className = 'menu-search';
    searchContainer.innerHTML = `
        <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Menüde ara..." id="menuSearch">
        </div>
    `;

    menuHeader.appendChild(searchContainer);

    const searchInput = document.getElementById('menuSearch');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Uncomment to enable search functionality
// initMenuSearch();
