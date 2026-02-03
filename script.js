// Main application JavaScript
class WebDevAcademy {
    constructor() {
        this.currentSection = 'home';
        this.currentCourse = null;
        this.currentLesson = null;
        this.userProgress = this.loadProgress();
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupPlayground();
        this.loadCourses();
        this.updateProgress();
        this.loadAchievements();
    }

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.navigateToSection(targetSection);
            });
        });
    }

    navigateToSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });

        this.currentSection = sectionId;

        // Load section-specific content
        if (sectionId === 'courses') {
            this.loadCourses();
        } else if (sectionId === 'progress') {
            this.updateProgress();
        }
    }

    setupMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');
        
        if (toggle) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
            });
        }
    }

    // Course Management
    loadCourses() {
        const courseGrid = document.getElementById('courseGrid');
        if (!courseGrid) return;

        courseGrid.innerHTML = '';

        courseData.courses.forEach(course => {
            const courseCard = this.createCourseCard(course);
            courseGrid.appendChild(courseCard);
        });
    }

    createCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="course-meta">
                <span class="course-difficulty difficulty-${course.difficulty}">${course.difficulty}</span>
                <span>${course.duration}</span>
            </div>
        `;

        card.addEventListener('click', () => {
            this.loadCourse(course);
        });

        return card;
    }

    loadCourse(course) {
        this.currentCourse = course;
        const courseGrid = document.getElementById('courseGrid');
        const lessonContent = document.getElementById('lessonContent');

        if (courseGrid) courseGrid.style.display = 'none';
        if (lessonContent) {
            lessonContent.style.display = 'block';
            this.loadLesson(course.lessons[0]);
        }
    }

    loadLesson(lesson) {
        this.currentLesson = lesson;
        const lessonContent = document.getElementById('lessonContent');
        
        if (!lessonContent) return;

        let exercisesHTML = '';
        if (lesson.exercises && lesson.exercises.length > 0) {
            exercisesHTML = `
                <div class="lesson-exercises">
                    <h4>Practice Exercises</h4>
                    ${lesson.exercises.map((exercise, index) => `
                        <div class="exercise">
                            <p><strong>Exercise ${index + 1}:</strong> ${exercise.instructions}</p>
                            <button class="exercise-button" onclick="app.startExercise(${index})">
                                Start Exercise
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        lessonContent.innerHTML = `
            <div class="lesson-header">
                <button class="back-button" onclick="app.backToCourses()">← Back to Courses</button>
                <h3>${lesson.title}</h3>
            </div>
            <div class="lesson-content-text">
                ${lesson.content}
            </div>
            ${exercisesHTML}
            <div class="lesson-navigation">
                <button class="nav-button" onclick="app.previousLesson()" id="prevBtn">
                    Previous Lesson
                </button>
                <button class="nav-button" onclick="app.completeLesson()" id="completeBtn">
                    Complete Lesson
                </button>
                <button class="nav-button" onclick="app.nextLesson()" id="nextBtn">
                    Next Lesson
                </button>
            </div>
        `;

        this.updateLessonNavigation();
    }

    updateLessonNavigation() {
        if (!this.currentCourse || !this.currentLesson) return;

        const lessons = this.currentCourse.lessons;
        const currentIndex = lessons.findIndex(l => l.id === this.currentLesson.id);
        
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex === lessons.length - 1;
        }
    }

    previousLesson() {
        if (!this.currentCourse || !this.currentLesson) return;

        const lessons = this.currentCourse.lessons;
        const currentIndex = lessons.findIndex(l => l.id === this.currentLesson.id);
        
        if (currentIndex > 0) {
            this.loadLesson(lessons[currentIndex - 1]);
        }
    }

    nextLesson() {
        if (!this.currentCourse || !this.currentLesson) return;

        const lessons = this.currentCourse.lessons;
        const currentIndex = lessons.findIndex(l => l.id === this.currentLesson.id);
        
        if (currentIndex < lessons.length - 1) {
            this.loadLesson(lessons[currentIndex + 1]);
        }
    }

    completeLesson() {
        if (!this.currentLesson) return;

        if (!this.userProgress.lessonsCompleted.includes(this.currentLesson.id)) {
            this.userProgress.lessonsCompleted.push(this.currentLesson.id);
            this.saveProgress();
            this.updateProgress();
            this.checkAchievements();
            
            // Show completion message
            this.showMessage('Lesson completed! Great work! 🎉');
        }
    }

    backToCourses() {
        const courseGrid = document.getElementById('courseGrid');
        const lessonContent = document.getElementById('lessonContent');

        if (courseGrid) courseGrid.style.display = 'grid';
        if (lessonContent) lessonContent.style.display = 'none';
    }

    startExercise(exerciseIndex) {
        if (!this.currentLesson || !this.currentLesson.exercises[exerciseIndex]) return;

        const exercise = this.currentLesson.exercises[exerciseIndex];
        this.navigateToSection('practice');
        
        // Load exercise code in playground
        if (exercise.starterCode) {
            this.loadCodeIntoPlayground(exercise.starterCode);
        }
        
        this.showMessage(`Exercise: ${exercise.instructions}`);
    }

    loadCodeIntoPlayground(code) {
        // Parse code to separate HTML, CSS, and JS if possible
        const htmlMatch = code.match(/<!DOCTYPE html>[\s\S]*?<\/html>/);
        const cssMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/);
        const jsMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/);

        if (htmlMatch) {
            document.getElementById('htmlEditor').value = htmlMatch[0];
        }
        if (cssMatch && cssMatch[1]) {
            document.getElementById('cssEditor').value = cssMatch[1].trim();
        }
        if (jsMatch && jsMatch[1]) {
            document.getElementById('jsEditor').value = jsMatch[1].trim();
        }
    }

    // Playground
    setupPlayground() {
        // Tab switching
        const tabButtons = document.querySelectorAll('.tab-button');
        const textareas = document.querySelectorAll('.editor-textarea');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tab = button.dataset.tab;
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active textarea
                textareas.forEach(textarea => {
                    textarea.classList.remove('active');
                    if (textarea.id === `${tab}Editor`) {
                        textarea.classList.add('active');
                    }
                });
            });
        });

        // Auto-run code on key press (with debounce)
        let timeout;
        textareas.forEach(textarea => {
            textarea.addEventListener('input', () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this.runCode();
                }, 1000);
            });
        });
    }

    runCode() {
        const html = document.getElementById('htmlEditor').value;
        const css = document.getElementById('cssEditor').value;
        const js = document.getElementById('jsEditor').value;
        
        const preview = document.getElementById('preview');
        if (!preview) return;

        const combinedCode = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
            </html>
        `;

        preview.srcdoc = combinedCode;
    }

    // Progress Tracking
    loadProgress() {
        const saved = localStorage.getItem('webdevAcademy_progress');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return {
            lessonsCompleted: [],
            exercisesCompleted: [],
            currentStreak: 0,
            lastActivityDate: null,
            totalLessons: 0,
            totalExercises: 0,
            achievements: []
        };
    }

    saveProgress() {
        localStorage.setItem('webdevAcademy_progress', JSON.stringify(this.userProgress));
    }

    updateProgress() {
        // Update stats
        const lessonsCompleted = document.getElementById('lessonsCompleted');
        const exercisesSolved = document.getElementById('exercisesSolved');
        const currentStreak = document.getElementById('currentStreak');

        if (lessonsCompleted) {
            lessonsCompleted.textContent = this.userProgress.lessonsCompleted.length;
        }
        if (exercisesSolved) {
            exercisesSolved.textContent = this.userProgress.exercisesCompleted.length;
        }
        if (currentStreak) {
            currentStreak.textContent = this.userProgress.currentStreak;
        }

        // Update activity streak
        this.updateStreak();
    }

    updateStreak() {
        const today = new Date().toDateString();
        const lastActivity = this.userProgress.lastActivityDate;

        if (lastActivity !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastActivity === yesterday.toDateString()) {
                this.userProgress.currentStreak++;
            } else if (lastActivity !== today) {
                this.userProgress.currentStreak = 1;
            }
            
            this.userProgress.lastActivityDate = today;
            this.saveProgress();
        }
    }

    // Achievements
    loadAchievements() {
        const achievementsGrid = document.getElementById('achievementsGrid');
        if (!achievementsGrid) return;

        achievementsGrid.innerHTML = '';

        courseData.achievements.forEach(achievement => {
            const isUnlocked = this.userProgress.achievements.includes(achievement.id);
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement ${isUnlocked ? 'unlocked' : ''}`;
            achievementElement.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <h4>${achievement.name}</h4>
                <p>${achievement.description}</p>
            `;
            achievementsGrid.appendChild(achievementElement);
        });
    }

    checkAchievements() {
        const achievements = courseData.achievements;
        let newAchievements = [];

        // Check for first lesson
        if (this.userProgress.lessonsCompleted.length === 1) {
            if (!this.userProgress.achievements.includes('first-lesson')) {
                newAchievements.push('first-lesson');
            }
        }

        // Check for course completion
        const htmlLessons = courseData.courses.find(c => c.id === 'html-basics').lessons.map(l => l.id);
        const cssLessons = courseData.courses.find(c => c.id === 'css-basics').lessons.map(l => l.id);
        const jsLessons = courseData.courses.find(c => c.id === 'javascript-basics').lessons.map(l => l.id);

        if (htmlLessons.every(id => this.userProgress.lessonsCompleted.includes(id))) {
            if (!this.userProgress.achievements.includes('html-master')) {
                newAchievements.push('html-master');
            }
        }

        if (cssLessons.every(id => this.userProgress.lessonsCompleted.includes(id))) {
            if (!this.userProgress.achievements.includes('css-master')) {
                newAchievements.push('css-master');
            }
        }

        if (jsLessons.every(id => this.userProgress.lessonsCompleted.includes(id))) {
            if (!this.userProgress.achievements.includes('js-master')) {
                newAchievements.push('js-master');
            }
        }

        // Check for all courses
        const allLessons = [...htmlLessons, ...cssLessons, ...jsLessons];
        if (allLessons.every(id => this.userProgress.lessonsCompleted.includes(id))) {
            if (!this.userProgress.achievements.includes('full-stack-beginner')) {
                newAchievements.push('full-stack-beginner');
            }
        }

        // Check for exercise completion
        if (this.userProgress.exercisesCompleted.length >= 10) {
            if (!this.userProgress.achievements.includes('practice-makes-perfect')) {
                newAchievements.push('practice-makes-perfect');
            }
        }

        // Check for streak
        if (this.userProgress.currentStreak >= 7) {
            if (!this.userProgress.achievements.includes('streak-warrior')) {
                newAchievements.push('streak-warrior');
            }
        }

        // Add new achievements
        if (newAchievements.length > 0) {
            this.userProgress.achievements.push(...newAchievements);
            this.saveProgress();
            this.loadAchievements();
            
            // Show achievement notifications
            newAchievements.forEach(achievementId => {
                const achievement = courseData.achievements.find(a => a.id === achievementId);
                if (achievement) {
                    this.showMessage(`🏆 Achievement Unlocked: ${achievement.name}!`);
                }
            });
        }
    }

    // Utility Functions
    showMessage(message) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = 'message-toast';
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(messageEl);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageEl.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 300);
        }, 3000);
    }
}

// Global functions for inline event handlers
let app;

function navigateToSection(sectionId) {
    app.navigateToSection(sectionId);
}

function runCode() {
    app.runCode();
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app = new WebDevAcademy();
    
    // Add some initial code to playground
    document.getElementById('htmlEditor').value = `<!DOCTYPE html>
<html>
<head>
    <title>My Project</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Start coding here...</p>
</body>
</html>`;

    document.getElementById('cssEditor').value = `body {
    font-family: Arial, sans-serif;
    margin: 40px;
    background: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}`;

    document.getElementById('jsEditor').value = `// Add your JavaScript here
console.log('Hello from the console!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully');
});`;

    // Run initial code
    setTimeout(() => {
        app.runCode();
    }, 100);
});