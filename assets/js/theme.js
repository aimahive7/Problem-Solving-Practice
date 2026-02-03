// Theme Management System

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('selectedTheme') || 'light';
        this.themeSelect = null;
        this.init();
    }

    init() {
        // Initialize theme select dropdown
        this.themeSelect = document.getElementById('themeSelect');
        if (this.themeSelect) {
            this.themeSelect.value = this.currentTheme;
            this.themeSelect.addEventListener('change', (e) => this.changeTheme(e.target.value));
        }

        // Apply saved theme on load
        this.applyTheme(this.currentTheme);

        // Listen for system theme changes
        this.setupSystemThemeListener();

        // Add keyboard shortcuts for theme switching
        this.setupKeyboardShortcuts();
    }

    changeTheme(theme) {
        // Validate theme
        if (!this.isValidTheme(theme)) {
            console.warn(`Invalid theme: ${theme}`);
            return;
        }

        // Apply theme
        this.currentTheme = theme;
        this.applyTheme(theme);

        // Save preference
        localStorage.setItem('selectedTheme', theme);

        // Update select dropdown
        if (this.themeSelect) {
            this.themeSelect.value = theme;
        }

        // Dispatch custom event for theme change
        this.dispatchThemeChangeEvent(theme);

        // Add transition effect
        this.addTransitionEffect();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);
        
        // Update document title suffix (optional)
        this.updateDocumentTitle(theme);
    }

    isValidTheme(theme) {
        const validThemes = ['light', 'dark', 'neon', 'minimal'];
        return validThemes.includes(theme);
    }

    setupSystemThemeListener() {
        // Listen for system theme preference changes
        if (window.matchMedia) {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            darkModeQuery.addListener((e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('selectedTheme')) {
                    const systemTheme = e.matches ? 'dark' : 'light';
                    this.changeTheme(systemTheme);
                }
            });
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + T for quick theme cycling
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.cycleTheme();
            }

            // Ctrl/Cmd + Shift + L for light theme
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
                e.preventDefault();
                this.changeTheme('light');
            }

            // Ctrl/Cmd + Shift + D for dark theme
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.changeTheme('dark');
            }
        });
    }

    cycleTheme() {
        const themes = ['light', 'dark', 'neon', 'minimal'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.changeTheme(themes[nextIndex]);
    }

    updateMetaThemeColor(theme) {
        let metaColor = '#3498db'; // Default

        switch(theme) {
            case 'dark':
                metaColor = '#1e1e1e';
                break;
            case 'neon':
                metaColor = '#0a0a0a';
                break;
            case 'minimal':
                metaColor = '#ffffff';
                break;
            default:
                metaColor = '#3498db';
        }

        // Update or create meta theme-color tag
        let metaTag = document.querySelector('meta[name="theme-color"]');
        if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.name = 'theme-color';
            document.head.appendChild(metaTag);
        }
        metaTag.content = metaColor;
    }

    updateDocumentTitle(theme) {
        const baseTitle = document.title.replace(' - Light Theme', '').replace(' - Dark Theme', '').replace(' - Neon Theme', '').replace(' - Minimal Theme', '');
        const themeSuffix = theme !== 'light' ? ` - ${theme.charAt(0).toUpperCase() + theme.slice(1)} Theme` : '';
        document.title = baseTitle + themeSuffix;
    }

    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChanged', {
            detail: { theme: theme, previousTheme: this.getPreviousTheme() }
        });
        document.dispatchEvent(event);
    }

    getPreviousTheme() {
        // This is a simplified approach - in production, you might want to track this more carefully
        return localStorage.getItem('previousTheme') || 'light';
    }

    addTransitionEffect() {
        // Add a smooth transition effect when theme changes
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // Get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Reset to system preference
    resetToSystemTheme() {
        localStorage.removeItem('selectedTheme');
        const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        this.changeTheme(systemTheme);
    }

    // Get theme CSS custom properties
    getThemeProperties(theme) {
        const themes = {
            light: {
                '--primary-color': '#3498db',
                '--bg-primary': '#ffffff',
                '--text-primary': '#2c3e50'
            },
            dark: {
                '--primary-color': '#4fc3f7',
                '--bg-primary': '#121212',
                '--text-primary': '#e1f5fe'
            },
            neon: {
                '--primary-color': '#00ff88',
                '--bg-primary': '#0a0a0a',
                '--text-primary': '#00ff88'
            },
            minimal: {
                '--primary-color': '#000000',
                '--bg-primary': '#ffffff',
                '--text-primary': '#000000'
            }
        };

        return themes[theme] || themes.light;
    }

    // Export theme configuration
    exportTheme() {
        return {
            currentTheme: this.currentTheme,
            customColors: this.getThemeProperties(this.currentTheme),
            timestamp: new Date().toISOString()
        };
    }

    // Import theme configuration
    importTheme(config) {
        if (config && config.currentTheme && this.isValidTheme(config.currentTheme)) {
            this.changeTheme(config.currentTheme);
            return true;
        }
        return false;
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Make it available globally
window.themeManager = themeManager;

// Add theme indicator for debugging (optional)
if (typeof window !== 'undefined') {
    window.addEventListener('themeChanged', (e) => {
        console.log(`Theme changed to: ${e.detail.theme}`);
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}