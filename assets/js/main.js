// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeScrollReveal();
    initializeScrollHighlighting();
    initializeRoadmapInteractions();
    initializeReferences();
    initializeCopyButtons();
    initializeAccordions();
    initializeQuiz();
    initializeProblemSolving();
    initializeInterviewQA();
    initializeSmoothScroll();
    initializeFooterYear();
    initializeScrollToTop();
});

// Scroll Reveal Animation
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('reveal');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// Copy to Clipboard functionality
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.parentElement;
            const code = codeBlock.querySelector('pre').textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(code).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.background = 'var(--secondary-color)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                }, 2000);
            }).catch(err => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = code;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.style.background = 'var(--secondary-color)';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
                
                document.body.removeChild(textArea);
            });
        });
    });
}

// Accordion functionality
function initializeAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
}

// Quiz functionality
function initializeQuiz() {
    const quizChecks = document.querySelectorAll('.quiz-check');
    
    quizChecks.forEach(button => {
        button.addEventListener('click', function() {
            const quizQuestion = this.closest('.quiz-question');
            const selectedOption = quizQuestion.querySelector('input[type="radio"]:checked');
            const feedbackDiv = quizQuestion.querySelector('.quiz-feedback');
            
            if (!selectedOption) {
                feedbackDiv.textContent = 'Please select an answer!';
                feedbackDiv.style.background = '#f8d7da';
                feedbackDiv.style.color = '#721c24';
                feedbackDiv.classList.remove('hidden');
                return;
            }
            
            // Check answer (dynamic validation based on question)
            const isCorrect = checkQuizAnswer(quizQuestion, selectedOption.value);
            
            if (isCorrect) {
                feedbackDiv.textContent = '✓ Correct! Well done!';
                feedbackDiv.style.background = '#d4edda';
                feedbackDiv.style.color = '#155724';
            } else {
                feedbackDiv.textContent = '✗ Incorrect. Try again!';
                feedbackDiv.style.background = '#f8d7da';
                feedbackDiv.style.color = '#721c24';
            }
            
            feedbackDiv.classList.remove('hidden');
            
            // Disable all options after checking
            quizQuestion.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.disabled = true;
            });
        });
    });
}

// Quiz answer validation function
function checkQuizAnswer(quizQuestion, selectedValue) {
    // Dynamic answer checking based on question content
    const questionText = quizQuestion.querySelector('h3').textContent.toLowerCase();
    
    // HTML quiz answers
    if (questionText.includes('html stand for')) {
        return selectedValue === 'a';
    }
    
    // CSS quiz answers
    if (questionText.includes('css stand for')) {
        return selectedValue === 'a';
    }
    
    // JavaScript quiz answers
    if (questionText.includes('keyword declares a constant')) {
        return selectedValue === 'c';
    }
    
    // Git quiz answers
    if (questionText.includes('command shows status')) {
        return selectedValue === 'a';
    }
    
    // Web Concepts quiz answers
    if (questionText.includes('http stand for')) {
        return selectedValue === 'a';
    }
    
    // Default to first option for other questions
    return selectedValue === 'a';
}

// Roadmap interactivity
function initializeRoadmapInteractions() {
    const roadmapNodes = document.querySelectorAll('.roadmap-node, .roadmap-orbit-node');
    
    roadmapNodes.forEach(node => {
        node.addEventListener('click', function() {
            // Add a pulse effect when clicked
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 8px 30px var(--shadow-medium)';
            
            // Create a temporary tooltip
            const existingTooltip = document.querySelector('.roadmap-tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }
            
            const tooltip = document.createElement('div');
            tooltip.className = 'roadmap-tooltip';
            tooltip.innerHTML = `
                <strong>${this.querySelector('div:first-child').textContent}</strong><br>
                <small>Click to learn more</small>
            `;
            
            tooltip.style.cssText = `
                position: absolute;
                background: var(--text-primary);
                color: var(--bg-primary);
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.8rem;
                z-index: 1000;
                white-space: nowrap;
                box-shadow: 0 4px 15px var(--shadow-light);
                top: ${this.getBoundingClientRect().top - 50}px;
                left: ${this.getBoundingClientRect().left}px;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            // Animate tooltip in
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            }, 10);
            
            // Reset node style after animation
            setTimeout(() => {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                // Remove tooltip after delay
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.style.opacity = '0';
                        tooltip.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            tooltip.remove();
                        }, 300);
                    }
                }, 2000);
            }, 200);
        });
        
        // Add hover effect
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px var(--shadow-medium)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Add keyboard accessibility
        node.setAttribute('tabindex', '0');
        node.setAttribute('role', 'button');
        node.setAttribute('aria-label', `${node.querySelector('div:first-child').textContent} - ${node.querySelector('.roadmap-topic-details')?.textContent || 'Click for details'}`);
        
        node.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add progress tracking to roadmaps
    addProgressTracking();
}

// Progress tracking for roadmaps
function addProgressTracking() {
    const roadmapNodes = document.querySelectorAll('.roadmap-node');
    let completedTopics = JSON.parse(localStorage.getItem('completedRoadmapTopics') || '[]');
    
    roadmapNodes.forEach(node => {
        const topicName = node.querySelector('div:first-child').textContent.trim();
        
        if (completedTopics.includes(topicName)) {
            node.classList.add('completed');
            node.style.opacity = '0.7';
            
            // Add checkmark
            const checkmark = document.createElement('div');
            checkmark.innerHTML = '✓';
            checkmark.style.cssText = `
                position: absolute;
                top: 5px;
                right: 5px;
                background: var(--secondary-color);
                color: white;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
            `;
            node.appendChild(checkmark);
        }
        
        // Double click to mark as complete
        node.addEventListener('dblclick', function() {
            const index = completedTopics.indexOf(topicName);
            if (index > -1) {
                completedTopics.splice(index, 1);
                node.classList.remove('completed');
                node.style.opacity = '';
                const checkmark = node.querySelector('div[style*="position: absolute"]');
                if (checkmark) checkmark.remove();
            } else {
                completedTopics.push(topicName);
                node.classList.add('completed');
                node.style.opacity = '0.7';
                
                const checkmark = document.createElement('div');
                checkmark.innerHTML = '✓';
                checkmark.style.cssText = `
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: var(--secondary-color);
                    color: white;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    font-weight: bold;
                `;
                node.appendChild(checkmark);
            }
            
            localStorage.setItem('completedRoadmapTopics', JSON.stringify(completedTopics));
        });
    });
    
    // Add styles for completed nodes
    const style = document.createElement('style');
    style.textContent = `
        .roadmap-node.completed {
            position: relative;
            filter: grayscale(50%);
        }
        
        .roadmap-tooltip {
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// References functionality
function initializeReferences() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const referenceCards = document.querySelectorAll('.reference-card');
    const bookCards = document.querySelectorAll('.book-card');
    
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const language = this.dataset.language;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter reference cards
            filterReferenceCards(language);
            
            // Filter book cards
            filterBookCards(language);
        });
    });
    
    // Add hover effects to book cards
    bookCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.book-title').textContent;
            const author = this.querySelector('.book-author').textContent;
            
            // Create temporary notification
            showBookNotification(`📚 "${title}" by ${author}`);
        });
    });
    
    // Add search functionality
    addReferenceSearch();
}

function filterReferenceCards(language) {
    const referenceCards = document.querySelectorAll('.reference-card');
    
    referenceCards.forEach(card => {
        const cardLanguage = card.dataset.language;
        
        if (language === 'all' || cardLanguage === language) {
            card.style.display = 'block';
            // Add animation
            card.style.animation = 'slideIn 0.3s ease-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 300);
        } else {
            card.style.display = 'none';
        }
    });
}

function filterBookCards(language) {
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (language === 'all') {
            card.style.display = 'block';
        } else {
            // Show relevant books based on language
            const relevantCategories = getRelevantCategories(language);
            if (relevantCategories.includes(cardCategory)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

function getRelevantCategories(language) {
    const categoryMap = {
        'html': ['html', 'design'],
        'css': ['css', 'design'],
        'javascript': ['javascript', 'advanced'],
        'git': ['advanced'],
        'web': ['design', 'performance', 'advanced']
    };
    
    return categoryMap[language] || [];
}

function showBookNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.book-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'book-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px var(--shadow-light);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function addReferenceSearch() {
    const referencesSection = document.querySelector('.references-section');
    if (!referencesSection) return;
    
    // Create search bar
    const searchBar = document.createElement('div');
    searchBar.className = 'reference-search';
    searchBar.innerHTML = `
        <input type="text" placeholder="🔍 Search resources..." class="search-input">
        <button class="search-clear">✕</button>
    `;
    
    searchBar.style.cssText = `
        margin-bottom: 2rem;
        position: relative;
    `;
    
    const input = searchBar.querySelector('.search-input');
    const clearBtn = searchBar.querySelector('.search-clear');
    
    input.style.cssText = `
        width: 100%;
        padding: 1rem 3rem 1rem 1rem;
        border: 2px solid var(--border-color);
        border-radius: 25px;
        font-size: 1rem;
        background: var(--bg-primary);
        color: var(--text-primary);
        transition: all 0.3s ease;
    `;
    
    clearBtn.style.cssText = `
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background: var(--text-secondary);
        color: var(--bg-primary);
        border: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
    `;
    
    // Insert search bar after header
    const header = referencesSection.querySelector('.references-header');
    header.insertAdjacentElement('afterend', searchBar);
    
    // Search functionality
    input.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const referenceCards = document.querySelectorAll('.reference-card');
        const bookCards = document.querySelectorAll('.book-card');
        
        // Show/hide clear button
        clearBtn.style.display = searchTerm ? 'flex' : 'none';
        
        // Filter reference cards
        referenceCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Filter book cards
        bookCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Clear button functionality
    clearBtn.addEventListener('click', function() {
        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.focus();
    });
    
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideOutRight {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(20px); }
        }
        
        .reference-search input:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }
        
        .search-input::placeholder {
            color: var(--text-secondary);
        }
    `;
    document.head.appendChild(animationStyles);
}

// Problem solving functionality
function initializeProblemSolving() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const problemSections = document.querySelectorAll('.problem-section');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const difficulty = this.dataset.difficulty;
            
            // Remove active class from all tabs and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            problemSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            this.classList.add('active');
            const targetSection = document.getElementById(`${difficulty}-problems`);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Hint and solution toggles
    const hintToggles = document.querySelectorAll('.hint-toggle');
    const solutionToggles = document.querySelectorAll('.solution-toggle');
    
    hintToggles.forEach(button => {
        button.addEventListener('click', function() {
            const hintContent = this.nextElementSibling;
            hintContent.classList.toggle('hidden');
            this.textContent = hintContent.classList.contains('hidden') ? 'Show Hint' : 'Hide Hint';
        });
    });
    
    solutionToggles.forEach(button => {
        button.addEventListener('click', function() {
            const solutionContent = this.parentElement.nextElementSibling;
            solutionContent.classList.toggle('hidden');
            this.textContent = solutionContent.classList.contains('hidden') ? 'Show Solution' : 'Hide Solution';
        });
    });
}

// Interview Q&A functionality
function initializeInterviewQA() {
    const qaToggles = document.querySelectorAll('.qa-toggle');
    
    qaToggles.forEach(button => {
        button.addEventListener('click', function() {
            const qaItem = this.closest('.qa-item');
            const qaAnswer = qaItem.querySelector('.qa-answer');
            const isActive = qaItem.classList.contains('active');
            
            if (isActive) {
                qaItem.classList.remove('active');
                qaAnswer.classList.add('hidden');
                this.textContent = '▼';
            } else {
                qaItem.classList.add('active');
                qaAnswer.classList.remove('hidden');
                this.textContent = '▲';
            }
        });
    });
    
    // Also make the question area clickable
    const qaQuestions = document.querySelectorAll('.qa-question');
    qaQuestions.forEach(question => {
        question.addEventListener('click', function(e) {
            if (e.target.classList.contains('qa-toggle')) return;
            
            const qaItem = this.closest('.qa-item');
            const toggle = qaItem.querySelector('.qa-toggle');
            toggle.click();
        });
    });
}

// Smooth scroll for navigation
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Mobile menu functionality (if needed)
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Scroll highlighting for sidebar and navigation
function initializeScrollHighlighting() {
    const sections = document.querySelectorAll('.content-section');
    const sidebarLinks = document.querySelectorAll('.sidebar a[href^="#"]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    const updateActiveSection = () => {
        let currentSection = '';
        let currentSectionId = '';
        
        // Find current section based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY;
            
            // Add buffer for header height
            const buffer = 200;
            if (scrollPosition >= (sectionTop - buffer)) {
                currentSectionId = section.getAttribute('id');
                currentSection = section;
            }
        });
        
        // Update sidebar links
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
        
        // Update main navigation links
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                link.classList.remove('active');
                if (href === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            }
        });
    };
    
    // Throttled scroll handler
    const throttledScroll = throttle(updateActiveSection, 100);
    window.addEventListener('scroll', throttledScroll);
    
    // Initial update
    updateActiveSection();
}

// Performance optimization for scroll events
const optimizedScroll = throttle(function() {
    // Legacy scroll functionality (kept for compatibility)
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav a[href^="#"], .sidebar a[href^="#"]');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}, 100);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes dropdowns/modals
    if (e.key === 'Escape') {
        const activeAccordions = document.querySelectorAll('.accordion-item.active');
        activeAccordions.forEach(item => {
            item.classList.remove('active');
        });
        
        const openHints = document.querySelectorAll('.hint-content:not(.hidden)');
        openHints.forEach(hint => {
            hint.classList.add('hidden');
            const toggle = hint.parentElement.querySelector('.hint-toggle');
            if (toggle) toggle.textContent = 'Show Hint';
        });
        
        const openSolutions = document.querySelectorAll('.solution-content:not(.hidden)');
        openSolutions.forEach(solution => {
            solution.classList.add('hidden');
            const toggle = solution.parentElement.querySelector('.solution-toggle');
            if (toggle) toggle.textContent = 'Show Solution';
        });
    }
});

// Footer year update
function initializeFooterYear() {
    const yearElement = document.querySelector('#currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Scroll to top functionality
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.title = 'Scroll to top';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Style the button
    const style = document.createElement('style');
    style.textContent = `
        #scrollTopBtn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 15px var(--shadow-light);
        }
        
        #scrollTopBtn:hover {
            background: var(--secondary-color);
            transform: scale(1.1);
        }
        
        #scrollTopBtn.visible {
            opacity: 1;
            visibility: visible;
        }
        
        @media (max-width: 768px) {
            #scrollTopBtn {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to body
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide based on scroll position
    const toggleScrollBtn = throttle(() => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, 100);
    
    window.addEventListener('scroll', toggleScrollBtn);
    
    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Focus on main content for accessibility
        const mainContent = document.querySelector('main, .main-content');
        if (mainContent) {
            mainContent.focus();
        }
    });
}

// Print styles
window.addEventListener('beforeprint', function() {
    // Optimize for printing
    document.querySelectorAll('.header, .sidebar, #scrollTopBtn').forEach(element => {
        element.style.display = 'none';
    });
});

window.addEventListener('afterprint', function() {
    // Restore normal display
    document.querySelectorAll('.header, .sidebar, #scrollTopBtn').forEach(element => {
        element.style.display = '';
    });
});