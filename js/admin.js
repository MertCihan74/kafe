// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initAdminNavigation();
    initAdminInteractions();
    initMenuManagement();
    initDataTables();
});

// Admin Navigation
function initAdminNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const adminSections = document.querySelectorAll('.admin-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Hide all sections
            adminSections.forEach(section => section.classList.remove('active'));

            // Show target section
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }

            // Update URL hash
            window.location.hash = targetSection;
        });
    });

    // Handle initial load with hash
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetNav = document.querySelector(`[data-section="${hash}"]`);
        if (targetNav) {
            targetNav.click();
        }
    }
}

// Admin Interactions
function initAdminInteractions() {
    // Reservation actions
    initReservationActions();

    // Menu item actions
    initMenuItemActions();

    // Review actions
    initReviewActions();

    // Settings forms
    initSettingsForms();
}

function initReservationActions() {
    // Approve reservation
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-success') && e.target.closest('.reservation-item')) {
            const reservationItem = e.target.closest('.reservation-item');
            const statusBadge = reservationItem.querySelector('.status-badge');

            statusBadge.className = 'status-badge status-confirmed';
            statusBadge.textContent = 'Onaylandı';

            // Update action buttons
            const actionsDiv = reservationItem.querySelector('.reservation-actions');
            actionsDiv.innerHTML = `
                <button class="btn btn-warning btn-sm" title="Düzenle">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" title="İptal">
                    <i class="fas fa-times"></i>
                </button>
            `;

            showNotification('Rezervasyon onaylandı!', 'success');
        }
    });

    // Cancel reservation
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-danger') && e.target.closest('.reservation-item')) {
            const reservationItem = e.target.closest('.reservation-item');
            const statusBadge = reservationItem.querySelector('.status-badge');

            statusBadge.className = 'status-badge status-cancelled';
            statusBadge.textContent = 'İptal Edildi';

            // Update action buttons
            const actionsDiv = reservationItem.querySelector('.reservation-actions');
            actionsDiv.innerHTML = '<span class="text-muted">İptal edildi</span>';

            showNotification('Rezervasyon iptal edildi!', 'error');
        }
    });

    // Edit reservation (placeholder)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-warning') && e.target.closest('.reservation-item')) {
            showNotification('Düzenleme özelliği yakında eklenecek!', 'info');
        }
    });
}

// Menu Management
function initMenuManagement() {
    const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
    const menuContents = document.querySelectorAll('.menu-category-content');

    menuTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            menuTabBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Hide all menu contents
            menuContents.forEach(content => content.classList.remove('active'));

            // Show target content
            const category = this.getAttribute('data-category');
            const targetContent = document.getElementById(`${category}-management`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Add new menu item
    const addMenuItemBtn = document.getElementById('addMenuItem');
    if (addMenuItemBtn) {
        addMenuItemBtn.addEventListener('click', function() {
            showNotification('Yeni ürün ekleme özelliği yakında eklenecek!', 'info');
        });
    }
}

function initMenuItemActions() {
    // Edit menu item
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-warning') && e.target.closest('.menu-item-card')) {
            showNotification('Ürün düzenleme özelliği yakında eklenecek!', 'info');
        }
    });

    // Delete menu item
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-danger') && e.target.closest('.menu-item-card')) {
            const menuItem = e.target.closest('.menu-item-card');
            if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
                menuItem.style.transition = 'opacity 0.3s ease';
                menuItem.style.opacity = '0';

                setTimeout(() => {
                    menuItem.remove();
                    showNotification('Ürün başarıyla silindi!', 'success');
                }, 300);
            }
        }
    });
}

// Review Actions
function initReviewActions() {
    // Publish review
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-success') && e.target.closest('.review-card')) {
            const reviewCard = e.target.closest('.review-card');
            const actionsDiv = reviewCard.querySelector('.review-actions');

            actionsDiv.innerHTML = '<span class="text-success">Yayınlandı</span>';
            showNotification('Yorum yayınlandı!', 'success');
        }
    });

    // Hide review
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-danger') && e.target.closest('.review-card')) {
            const reviewCard = e.target.closest('.review-card');
            const actionsDiv = reviewCard.querySelector('.review-actions');

            actionsDiv.innerHTML = '<span class="text-muted">Gizlendi</span>';
            showNotification('Yorum gizlendi!', 'error');
        }
    });
}

// Settings Forms
function initSettingsForms() {
    const settingsForms = document.querySelectorAll('.settings-form');

    settingsForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Ayarlar başarıyla kaydedildi!', 'success');
        });
    });
}

// Data Tables
function initDataTables() {
    // Filters
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');

    if (statusFilter) {
        statusFilter.addEventListener('change', filterReservations);
    }

    if (dateFilter) {
        dateFilter.addEventListener('change', filterReservations);
    }

    // Export functionality
    const exportBtn = document.getElementById('exportReservations');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            showNotification('Rezervasyonlar dışa aktarıldı!', 'success');
        });
    }
}

function filterReservations() {
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    const tableRows = document.querySelectorAll('#reservationsTable tr');

    tableRows.forEach(row => {
        const statusBadge = row.querySelector('.status-badge');
        const dateCell = row.cells[2];

        let showRow = true;

        // Filter by status
        if (statusFilter !== 'all') {
            if (!statusBadge || !statusBadge.classList.contains(`status-${statusFilter}`)) {
                showRow = false;
            }
        }

        // Filter by date
        if (dateFilter && dateCell) {
            const rowDate = dateCell.textContent;
            if (rowDate !== formatDate(dateFilter)) {
                showRow = false;
            }
        }

        row.style.display = showRow ? '' : 'none';
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save (in settings)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const activeSection = document.querySelector('.admin-section.active');
        if (activeSection.id === 'settings') {
            const saveBtn = activeSection.querySelector('.btn-primary');
            if (saveBtn) {
                saveBtn.click();
            }
        }
    }
});

// Auto-refresh dashboard stats (demo)
setInterval(() => {
    const activeSection = document.querySelector('.admin-section.active');
    if (activeSection && activeSection.id === 'dashboard') {
        // Simulate updating stats
        const statNumbers = document.querySelectorAll('.stat-card h3');
        statNumbers.forEach(stat => {
            const currentValue = parseInt(stat.textContent);
            const randomChange = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const newValue = Math.max(0, currentValue + randomChange);
            stat.textContent = newValue;
        });
    }
}, 30000); // Update every 30 seconds

// Admin header scroll effect
function initAdminHeaderScroll() {
    const adminHeader = document.querySelector('.admin-header');

    if (adminHeader) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                adminHeader.style.background = 'rgba(30, 58, 138, 0.98)';
                adminHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                adminHeader.style.background = 'rgba(30, 58, 138, 0.9)';
                adminHeader.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
}

// Initialize admin header scroll effect
initAdminHeaderScroll();
