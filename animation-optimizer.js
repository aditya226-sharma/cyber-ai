// Animation Optimizer for CyberShield AI
// Ensures optimal animation performance across all sections and devices

class AnimationOptimizer {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isMobile = window.innerWidth <= 768;
        this.isLowPerformance = this.detectLowPerformance();
        this.animationElements = new Set();
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.optimizeExistingAnimations();
        this.setupPerformanceMonitoring();
        this.handleVisibilityChange();
        
        // Initialize on DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnimations());
        } else {
            this.setupAnimations();
        }
    }
    
    detectLowPerformance() {
        // Detect low-performance devices
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
        const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        const isOldDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        
        return isSlowConnection || isLowMemory || isOldDevice;
    }
    
    setupIntersectionObserver() {
        if (!window.IntersectionObserver) return;
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startAnimation(entry.target);
                } else {
                    this.pauseAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
    }
    
    setupAnimations() {
        // Optimize all animated elements
        const animatedSelectors = [
            '.floating-shapes .shape',
            '.particles .particle',
            '.quantum-particles .q-particle',
            '.scanner-card',
            '.dashboard-card',
            '.feature-card',
            '.matrix-node',
            '.protocol-step',
            '.metric-orb',
            '.tab-btn',
            '.quantum-btn'
        ];
        
        animatedSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => this.optimizeElement(el));
        });
        
        // Setup scroll-triggered animations
        this.setupScrollAnimations();
        
        // Setup staggered animations
        this.setupStaggeredAnimations();
    }
    
    optimizeElement(element) {
        if (!element) return;
        
        // Add to tracking set
        this.animationElements.add(element);
        
        // Apply performance optimizations
        element.style.willChange = 'transform';
        element.style.transform = 'translateZ(0)';
        
        // Reduce animation complexity on low-performance devices
        if (this.isLowPerformance || this.isReducedMotion) {
            this.simplifyAnimation(element);
        }
        
        // Add to intersection observer
        if (this.observer) {
            this.observer.observe(element);
        }
    }
    
    simplifyAnimation(element) {
        const animations = element.getAnimations?.() || [];
        animations.forEach(animation => {
            if (this.isReducedMotion) {
                animation.cancel();
            } else if (this.isLowPerformance) {
                // Reduce animation duration and complexity
                animation.playbackRate = 0.5;
            }
        });
    }
    
    startAnimation(element) {
        element.style.animationPlayState = 'running';
        element.classList.add('animate-visible');
    }
    
    pauseAnimation(element) {
        if (this.isLowPerformance) {
            element.style.animationPlayState = 'paused';
        }
    }
    
    setupScrollAnimations() {
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        
        scrollElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            
            if (this.observer) {
                this.observer.observe(el);
            }
        });
    }
    
    setupStaggeredAnimations() {
        // Stagger quantum matrix animations
        const matrixNodes = document.querySelectorAll('.matrix-node');
        matrixNodes.forEach((node, index) => {
            node.style.animationDelay = `${index * 0.2}s`;
            node.classList.add('animate-on-scroll');
        });
        
        // Stagger protocol step animations
        const protocolSteps = document.querySelectorAll('.protocol-step');
        protocolSteps.forEach((step, index) => {
            step.style.animationDelay = `${index * 0.3}s`;
            step.classList.add('animate-on-scroll');
        });
        
        // Stagger dashboard cards
        const dashboardCards = document.querySelectorAll('.dashboard-card');
        dashboardCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-card');
        });
    }
    
    optimizeExistingAnimations() {
        // Optimize CSS animations for better performance
        const style = document.createElement('style');
        style.textContent = `
            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
            
            .animate-visible {
                opacity: 1;
                transform: translate3d(0, 0, 0);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .performance-optimized {
                contain: layout style paint;
                will-change: transform;
            }
        `;
        document.head.appendChild(style);
    }
    
    setupPerformanceMonitoring() {
        // Monitor frame rate and adjust animations accordingly
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkPerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                if (fps < 30) {
                    this.reduceAnimationComplexity();
                } else if (fps > 50) {
                    this.enhanceAnimations();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkPerformance);
        };
        
        requestAnimationFrame(checkPerformance);
    }
    
    reduceAnimationComplexity() {
        // Reduce particle count
        const particles = document.querySelectorAll('.particle:nth-child(n+4), .q-particle:nth-child(n+3)');
        particles.forEach(p => p.style.display = 'none');
        
        // Simplify background animations
        const shapes = document.querySelectorAll('.shape:nth-child(n+4)');
        shapes.forEach(s => s.style.display = 'none');
    }
    
    enhanceAnimations() {
        // Re-enable animations if performance is good
        const hiddenElements = document.querySelectorAll('[style*="display: none"]');
        hiddenElements.forEach(el => {
            if (el.classList.contains('particle') || el.classList.contains('shape')) {
                el.style.display = '';
            }
        });
    }
    
    handleVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations when tab is not visible
                this.animationElements.forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
            } else {
                // Resume animations when tab becomes visible
                this.animationElements.forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }
        });
    }
    
    // Public methods for manual control
    pauseAllAnimations() {
        this.animationElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }
    
    resumeAllAnimations() {
        this.animationElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
    
    toggleAnimations() {
        const isPaused = Array.from(this.animationElements)[0]?.style.animationPlayState === 'paused';
        
        if (isPaused) {
            this.resumeAllAnimations();
        } else {
            this.pauseAllAnimations();
        }
    }
}

// Initialize animation optimizer
const animationOptimizer = new AnimationOptimizer();

// Export for global access
window.AnimationOptimizer = animationOptimizer;

// Add utility functions for smooth interactions
function addSmoothHover(element) {
    if (!element) return;
    
    element.addEventListener('mouseenter', () => {
        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.transform = 'translate3d(0, -5px, 0) scale(1.02)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate3d(0, 0, 0) scale(1)';
    });
}

function addSmoothClick(element) {
    if (!element) return;
    
    element.addEventListener('mousedown', () => {
        element.style.transform = 'translate3d(0, 0, 0) scale(0.95)';
        element.style.transition = 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    element.addEventListener('mouseup', () => {
        element.style.transform = 'translate3d(0, -5px, 0) scale(1.02)';
        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

// Auto-apply to common elements
document.addEventListener('DOMContentLoaded', () => {
    // Apply smooth interactions to buttons and cards
    const interactiveElements = document.querySelectorAll(`
        .tab-btn, .scan-btn, .quantum-btn, .cta-btn,
        .scanner-card, .dashboard-card, .feature-card,
        .matrix-node, .protocol-step
    `);
    
    interactiveElements.forEach(el => {
        addSmoothHover(el);
        addSmoothClick(el);
    });
});