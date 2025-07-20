const portfolioData = [
    {
        id: 1,
        title: "Design Work 1",
        image: "/assets/design-works/work1.jpg"
    },
    {
        id: 2,
        title: "Design Work 2", 
        image: "/assets/design-works/work2.png"
    },
    {
        id: 3,
        title: "Design Work 3",
        image: "/assets/design-works/work3.webp"
    },
    {
        id: 4,
        title: "Design Work 4",
        image: "/assets/design-works/work4.png"
    },
    {
        id: 5,
        title: "Design Work 5",
        image: "/assets/design-works/work5.jpg"
    },
    {
        id: 6,
        title: "Design Work 6",
        image: "/assets/design-works/work6.jpg"
    },
    {
        id: 7,
        title: "Design Work 7",
        image: "/assets/design-works/work7.jpg"
    },
    {
        id: 8,
        title: "Design Work 8",
        image: "/assets/design-works/work8.jpg"
    },
    {
        id: 9,
        title: "Design Work 9",
        image: "/assets/design-works/work9.jpg"
    },
    {
        id: 10,
        title: "Design Work 10",
        image: "/assets/design-works/work10.webp"
    },
];

class GraphicsPortfolio {
    constructor() {
        this.portfolioData = portfolioData;
        this.currentLightboxIndex = 0;
        
        this.init();
    }
    
    init() {
        this.renderGallery();
        this.bindEvents();
        this.setupIntersectionObserver();
    }
    
    renderGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        
        galleryGrid.innerHTML = this.portfolioData.map((item, index) => `
            <div class="gallery-item" data-index="${index}">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-expand-alt"></i>
                    <p>Click to enlarge</p>
                </div>
            </div>
        `).join('');
        
        // Add click events to gallery items
        this.bindGalleryItemEvents();
        
        // Animate items on load
        this.animateGalleryItems();
    }
    
    bindGalleryItemEvents() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.openLightbox(index);
            });
        });
    }
    
    bindEvents() {
        // Lightbox events
        const lightbox = document.getElementById('lightbox');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        
        lightboxClose.addEventListener('click', () => this.closeLightbox());
        lightboxPrev.addEventListener('click', () => this.previousImage());
        lightboxNext.addEventListener('click', () => this.nextImage());
        
        // Close lightbox on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.previousImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
        
        // Prevent scrolling when lightbox is open
        lightbox.addEventListener('wheel', (e) => {
            if (lightbox.classList.contains('active')) {
                e.preventDefault();
            }
        });
    }
    
    openLightbox(index) {
        this.currentLightboxIndex = index;
        const item = this.portfolioData[index];
        
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');
        const lightboxTags = document.getElementById('lightboxTags');
        
        // Set content
        lightboxImage.src = item.image;
        
        // Hide all text sections since we don't want to show titles
        lightboxTitle.style.display = 'none';
        lightboxDescription.style.display = 'none';
        lightboxTags.style.display = 'none';
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update navigation visibility
        this.updateNavigationVisibility();
    }
    
    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    previousImage() {
        if (this.currentLightboxIndex > 0) {
            this.currentLightboxIndex--;
            this.updateLightboxContent();
        } else {
            // Loop to last image
            this.currentLightboxIndex = this.portfolioData.length - 1;
            this.updateLightboxContent();
        }
    }
    
    nextImage() {
        if (this.currentLightboxIndex < this.portfolioData.length - 1) {
            this.currentLightboxIndex++;
            this.updateLightboxContent();
        } else {
            // Loop to first image
            this.currentLightboxIndex = 0;
            this.updateLightboxContent();
        }
    }
    
    updateLightboxContent() {
        const item = this.portfolioData[this.currentLightboxIndex];
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');
        const lightboxTags = document.getElementById('lightboxTags');
        
        // Add loading animation
        lightboxImage.style.opacity = '0.5';
        
        // Update content
        lightboxImage.onload = () => {
            lightboxImage.style.opacity = '1';
        };
        
        lightboxImage.src = item.image;
        
        // Hide all text sections
        lightboxTitle.style.display = 'none';
        lightboxDescription.style.display = 'none';
        lightboxTags.style.display = 'none';
        
        this.updateNavigationVisibility();
    }
    
    updateNavigationVisibility() {
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        
        // Show/hide navigation based on available images
        if (this.portfolioData.length <= 1) {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        } else {
            lightboxPrev.style.display = 'flex';
            lightboxNext.style.display = 'flex';
        }
    }
    
    animateGalleryItems() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);
        
        // Observe gallery items as they're created
        const observeNewItems = () => {
            const galleryItems = document.querySelectorAll('.gallery-item:not([data-observed])');
            galleryItems.forEach(item => {
                item.setAttribute('data-observed', 'true');
                observer.observe(item);
            });
        };
        
        // Set up mutation observer to watch for new gallery items
        const mutationObserver = new MutationObserver(observeNewItems);
        mutationObserver.observe(document.getElementById('galleryGrid'), {
            childList: true,
            subtree: true
        });
        
        // Initial observation
        observeNewItems();
    }
}

// Touch/Swipe support for mobile lightbox navigation
class TouchHandler {
    constructor(portfolio) {
        this.portfolio = portfolio;
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.minSwipeDistance = 50;
        
        this.bindTouchEvents();
    }
    
    bindTouchEvents() {
        const lightbox = document.getElementById('lightbox');
        
        lightbox.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
        }, { passive: true });
        
        lightbox.addEventListener('touchend', (e) => {
            this.endX = e.changedTouches[0].clientX;
            this.endY = e.changedTouches[0].clientY;
            this.handleSwipe();
        }, { passive: true });
    }
    
    handleSwipe() {
        const deltaX = this.endX - this.startX;
        const deltaY = this.endY - this.startY;
        
        // Check if it's a horizontal swipe (not vertical scroll)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - previous image
                this.portfolio.previousImage();
            } else {
                // Swipe left - next image
                this.portfolio.nextImage();
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new GraphicsPortfolio();
    const touchHandler = new TouchHandler(portfolio);
    
    // Add smooth scroll behavior for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GraphicsPortfolio, TouchHandler };
}
