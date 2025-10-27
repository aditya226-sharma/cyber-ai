// AI Assistant Interactive Enhancements

class AIEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardShortcuts();
        this.setupAdvancedAnimations();
        this.setupInteractiveElements();
        this.setupThemeSync();
        this.setupPerformanceOptimizations();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus input
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const input = document.getElementById('message-input');
                if (input) {
                    input.focus();
                    input.select();
                }
            }
            
            // Escape to clear input
            if (e.key === 'Escape') {
                const input = document.getElementById('message-input');
                if (input && input.value) {
                    input.value = '';
                    input.blur();
                }
            }
            
            // Ctrl/Cmd + Enter to send message
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                if (window.enhancedAI) {
                    window.enhancedAI.sendMessage();
                }
            }
        });
    }

    setupAdvancedAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements for animation
        document.querySelectorAll('.capability-card, .stat-card, .quick-btn').forEach(el => {
            observer.observe(el);
        });

        // Add stagger animation to quick buttons
        const quickBtns = document.querySelectorAll('.quick-btn');
        quickBtns.forEach((btn, index) => {
            btn.style.animationDelay = `${index * 0.1}s`;
            btn.classList.add('stagger-animate');
        });
    }

    setupInteractiveElements() {
        // Add ripple effect to buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.quick-btn, .send-btn, .action-btn, .control-btn')) {
                this.createRipple(e);
            }
        });

        // Add hover sound effects (optional)
        document.querySelectorAll('.quick-btn, .topic-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.playHoverSound();
            });
        });

        // Add focus indicators for accessibility
        document.querySelectorAll('button, input').forEach(el => {
            el.addEventListener('focus', () => {
                el.classList.add('focused');
            });
            el.addEventListener('blur', () => {
                el.classList.remove('focused');
            });
        });
    }

    createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    playHoverSound() {
        // Optional: Add subtle hover sound
        if (this.audioEnabled) {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
            audio.volume = 0.1;
            audio.play().catch(() => {}); // Ignore errors
        }
    }

    setupThemeSync() {
        // Sync with system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener((e) => {
            this.updateThemeElements(e.matches);
        });

        // Initial theme setup
        this.updateThemeElements(mediaQuery.matches);
    }

    updateThemeElements(isDark) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            if (isDark) {
                particle.style.background = 'rgba(102, 126, 234, 0.8)';
            } else {
                particle.style.background = 'rgba(102, 126, 234, 0.6)';
            }
        });
    }

    setupPerformanceOptimizations() {
        // Lazy load animations
        const lazyAnimations = document.querySelectorAll('[data-animate]');
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.dataset.animate;
                    entry.target.style.animation = animation;
                    animationObserver.unobserve(entry.target);
                }
            });
        });

        lazyAnimations.forEach(el => animationObserver.observe(el));

        // Optimize particle rendering
        this.optimizeParticles();

        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    optimizeParticles() {
        const particles = document.querySelectorAll('.particle');
        
        // Reduce particles on mobile
        if (window.innerWidth < 768) {
            particles.forEach((particle, index) => {
                if (index > 5) {
                    particle.style.display = 'none';
                }
            });
        }

        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            particles.forEach(particle => {
                if (document.hidden) {
                    particle.style.animationPlayState = 'paused';
                } else {
                    particle.style.animationPlayState = 'running';
                }
            });
        });
    }

    handleResize() {
        // Recalculate particle positions and animations
        this.optimizeParticles();
        
        // Update chat container height
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer && window.innerWidth < 768) {
            chatContainer.style.height = '400px';
        } else if (chatContainer) {
            chatContainer.style.height = '600px';
        }
    }

    // Public methods for external use
    enableAudio() {
        this.audioEnabled = true;
    }

    disableAudio() {
        this.audioEnabled = false;
    }

    addCustomAnimation(element, animation) {
        if (element && animation) {
            element.style.animation = animation;
        }
    }

    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.8rem;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

        setTimeout(() => tooltip.style.opacity = '1', 10);

        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
        }, 2000);
    }
}

// Add CSS for animations
const enhancementStyles = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.animate-in {
    animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
    from {
        transform: translateY(30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.stagger-animate {
    animation: fadeInScale 0.5s ease-out both;
}

@keyframes fadeInScale {
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

.focused {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}

.custom-tooltip {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .particle {
        display: none;
    }
}

/* High contrast mode */
@media (prefers-contrast: high) {
    .message-bubble {
        border: 2px solid currentColor;
    }
    
    .quick-btn, .action-btn, .control-btn {
        border: 2px solid currentColor;
    }
}
`;

// Add enhancement styles
const enhancementStyleSheet = document.createElement('style');
enhancementStyleSheet.textContent = enhancementStyles;
document.head.appendChild(enhancementStyleSheet);

// Initialize enhancements
let aiEnhancements;
document.addEventListener('DOMContentLoaded', () => {
    aiEnhancements = new AIEnhancements();
    
    // Add keyboard shortcut hints
    const input = document.getElementById('message-input');
    if (input) {
        input.setAttribute('title', 'Press Ctrl+K to focus, Ctrl+Enter to send, Escape to clear');
    }
});

// Export for global access
window.aiEnhancements = aiEnhancements;