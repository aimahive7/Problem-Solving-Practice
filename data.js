// Course data structure
const courseData = {
    courses: [
        {
            id: "html-basics",
            title: "HTML Fundamentals",
            description: "Learn the building blocks of web pages with HTML5",
            difficulty: "beginner",
            duration: "4 hours",
            lessons: [
                {
                    id: "html-1",
                    title: "Introduction to HTML",
                    content: `
                        <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages.</p>
                        <p>HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.</p>
                        <h3>Key Concepts</h3>
                        <ul>
                            <li>HTML uses tags to define elements</li>
                            <li>Tags are enclosed in angle brackets &lt; &gt;</li>
                            <li>Most tags come in pairs: opening and closing</li>
                            <li>HTML documents have a specific structure</li>
                        </ul>
                        <h3>Basic HTML Structure</h3>
                        <div class="code-example">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello, World!&lt;/h1&gt;
    &lt;p&gt;This is my first HTML page.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
                        </div>
                    `,
                    exercises: [
                        {
                            type: "coding",
                            instructions: "Create your first HTML page with a heading and a paragraph.",
                            starterCode: "<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <!-- Add your content here -->\n</body>\n</html>"
                        }
                    ]
                },
                {
                    id: "html-2",
                    title: "HTML Elements and Tags",
                    content: `
                        <p>HTML elements are the building blocks of HTML pages. They are defined by tags, which usually come in pairs.</p>
                        <h3>Common HTML Tags</h3>
                        <div class="code-example">
&lt;h1&gt; to &lt;h6&gt; - Headings
&lt;p&gt; - Paragraphs
&lt;a&gt; - Links
&lt;img&gt; - Images
&lt;div&gt; - Container
&lt;span&gt; - Inline container
&lt;ul&gt;, &lt;ol&gt;, &lt;li&gt; - Lists
&lt;strong&gt;, &lt;em&gt; - Text formatting
                        </div>
                        <h3>Example</h3>
                        <div class="code-example">
&lt;h1&gt;Main Heading&lt;/h1&gt;
&lt;p&gt;This is a &lt;strong&gt;paragraph&lt;/strong&gt; with &lt;em&gt;emphasized&lt;/em&gt; text.&lt;/p&gt;
&lt;a href="https://example.com"&gt;This is a link&lt;/a&gt;
&lt;ul&gt;
    &lt;li&gt;First item&lt;/li&gt;
    &lt;li&gt;Second item&lt;/li&gt;
&lt;/ul&gt;
                        </div>
                    `,
                    exercises: [
                        {
                            type: "coding",
                            instructions: "Create a page with different heading levels, a paragraph with formatting, and a list.",
                            starterCode: "<!DOCTYPE html>\n<html>\n<head>\n    <title>HTML Elements</title>\n</head>\n<body>\n    <!-- Practice different HTML elements -->\n</body>\n</html>"
                        }
                    ]
                },
                {
                    id: "html-3",
                    title: "Forms and Input",
                    content: `
                        <p>HTML forms are used to collect user input. Forms contain various input elements like text fields, checkboxes, radio buttons, and submit buttons.</p>
                        <h3>Form Elements</h3>
                        <div class="code-example">
&lt;form&gt;
    &lt;label for="name"&gt;Name:&lt;/label&gt;
    &lt;input type="text" id="name" name="name"&gt;
    
    &lt;label for="email"&gt;Email:&lt;/label&gt;
    &lt;input type="email" id="email" name="email"&gt;
    
    &lt;label for="message"&gt;Message:&lt;/label&gt;
    &lt;textarea id="message" name="message"&gt;&lt;/textarea&gt;
    
    &lt;input type="submit" value="Submit"&gt;
&lt;/form&gt;
                        </div>
                        <h3>Input Types</h3>
                        <ul>
                            <li>text - Single line text input</li>
                            <li>email - Email address</li>
                            <li>password - Password field</li>
                            <li>checkbox - Check boxes</li>
                            <li>radio - Radio buttons</li>
                            <li>date - Date picker</li>
                            <li>number - Numeric input</li>
                        </ul>
                    `,
                    exercises: [
                        {
                            type: "coding",
                            instructions: "Create a contact form with various input types.",
                            starterCode: "<!DOCTYPE html>\n<html>\n<head>\n    <title>Contact Form</title>\n</head>\n<body>\n    <form>\n        <!-- Add form elements here -->\n    </form>\n</body>\n</html>"
                        }
                    ]
                }
            ]
        },
        {
            id: "css-basics",
            title: "CSS Styling",
            description: "Master CSS3 to create beautiful, responsive web designs",
            difficulty: "beginner",
            duration: "5 hours",
            lessons: [
                {
                    id: "css-1",
                    title: "Introduction to CSS",
                    content: `
                        <p>CSS (Cascading Style Sheets) is used to style and layout web pages.</p>
                        <p>CSS controls the colors, fonts, spacing, and positioning of HTML elements.</p>
                        <h3>How CSS Works</h3>
                        <ul>
                            <li>Selectors target HTML elements</li>
                            <li>Properties define what to style</li>
                            <li>Values specify how to style</li>
                            <li>CSS rules cascade and inherit</li>
                        </ul>
                        <h3>Basic CSS Syntax</h3>
                        <div class="code-example">
selector {
    property: value;
    property: value;
}

/* Example */
h1 {
    color: blue;
    font-size: 24px;
    text-align: center;
}
                        </div>
                        <h3>Ways to Include CSS</h3>
                        <div class="code-example">
/* 1. Inline CSS */
&lt;p style="color: red;"&gt;Red text&lt;/p&gt;

/* 2. Internal CSS */
&lt;style&gt;
    p { color: blue; }
&lt;/style&gt;

/* 3. External CSS */
&lt;link rel="stylesheet" href="styles.css"&gt;
                        </div>
                    `,
                    exercises: [
                        {
                            type: "coding",
                            instructions: "Style an HTML page using internal CSS.",
                            starterCode: "<!DOCTYPE html>\n<html>\n<head>\n    <title>CSS Practice</title>\n    <style>\n        /* Add your CSS here */\n    </style>\n</head>\n<body>\n    <h1>Styled Page</h1>\n    <p>This paragraph should be styled.</p>\n    <div class=\"container\">\n        <p>Container content</p>\n    </div>\n</body>\n</html>"
                        }
                    ]
                },
                {
                    id: "css-2",
                    title: "CSS Selectors and Properties",
                    content: `
                        <p>CSS selectors are used to find and select HTML elements based on their element name, id, class, attribute, and more.</p>
                        <h3>Common Selectors</h3>
                        <div class="code-example">
/* Element selector */
p { color: black; }

/* Class selector */
.highlight { background-color: yellow; }

/* ID selector */
#header { font-size: 24px; }

/* Descendant selector */
div p { margin: 10px; }

/* Attribute selector */
input[type="text"] { border: 1px solid #ccc; }
                        </div>
                        <h3>Common Properties</h3>
                        <ul>
                            <li>Text: color, font-size, font-family, text-align</li>
                            <li>Background: background-color, background-image</li>
                            <li>Box Model: margin, padding, border, width, height</li>
                            <li>Position: position, top, left, right, bottom</li>
                            <li>Display: display, visibility, opacity</li>
                        </ul>
                    `,
                    exercises: [
                        {
                            type: "coding",
                            instructions: "Practice using different CSS selectors and properties.",
                            starterCode: "<!DOCTYPE html>\n<html>\n<head>\n    <title>Selectors Practice</title>\n    <style>\n        /* Try different selectors */\n    </style>\n</head>\n<body>\n    <h1 id=\"main-title\">Main Title</h1>\n    <p class=\"intro\">Introduction paragraph</p>\n    <div class=\"content\">\n        <p>Content paragraph</p>\n        <span class=\"highlight\">Highlighted text</span>\n    </div>\n</body>\n</html>"
                        }
                    ]
                },
                {
                    id: "css-3",
                    title: "Flexbox and Grid Layout",
                    content: `
                        <p>Flexbox and CSS Grid are modern layout systems that make it easy to create responsive layouts.</p>
                        <h3>Flexbox</h3>
                        <div class="code-example">
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

.item {
    flex: 1;
    padding: 20px;
}
                        </div>
                        <h3>CSS Grid</h3>
                        <div class="code-example">
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
}

.grid-item {
    background: #f0f0f0;
    padding: 20px;
}
                        </div>
                        <h3>Responsive Design</h3>
                        <div class="code-example">
@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
    }
    
    .container {
        flex-direction: column;
    }
}
                        </div>
                    `,
                    exercises: [
                        {
                            type: "coding",
                            instructions: "Create a responsive layout using Flexbox or CSS Grid.",
                            starterCode: "<!DOCTYPE html>\n<html>\n<head>\n    <title>Layout Practice</title>\n    <style>\n        /* Create your layout here */\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <header>Header</header>\n        <main>Main Content</main>\n        <aside>Sidebar</aside>\n        <footer>Footer</footer>\n    </div>\n</body>\n</html>"
                        }
                    ]
                }
            ]
        },
        {
            id: "javascript-basics",
            title: "JavaScript Programming",
            description: "Learn JavaScript to add interactivity and dynamic behavior to websites",
            difficulty: "intermediate",
            duration: "6 hours",
            lessons: [
                {
                    id: "js-1",
                    title: "JavaScript Fundamentals",
                    content: `
                        <p>JavaScript is a programming language that enables interactive web pages and is an essential part of web applications.</p>
                        <h3>Variables and Data Types</h3>
                        <div class="code-example">
// Variables
let name = "John";           // String
let age = 25;               // Number
let isStudent = true;       // Boolean
let hobbies = ["coding", "music"];  // Array
let person = {              // Object
    firstName: "John",
    lastName: "Doe"
};

const PI = 3.14159;         // Constant
                        </div>
                        <h3>Functions</h3>
                        <div class="code-example">
// Function declaration
function greet(name) {
    return "Hello, " + name + "!";
}

// Arrow function
const add = (a, b) => a + b;

// Function calls
console.log(greet("World"));  // Output: Hello, World!
console.log(add(5, 3));       // Output: 8
                        </div>
                        <h3>Control Structures</h3>
                        <div class="code-example">
// If-else statement
if (age >= 18) {
    console.log("You are an adult");
} else {
    console.log("You are a minor");
}

// For loop
for (let i = 0; i < 5; i++) {
    console.log("Count: " + i);
}

// While loop
let count = 0;
while (count < 3) {
    console.log("While count: " + count);
    count++;
}
                        </div>
                    `,
                    exercises: [
                        {
                            type: "coding",
                            instructions: "Write JavaScript code that demonstrates variables, functions, and loops.",
                            starterCode: "<!DOCTYPE html>\n<html>\n<head>\n    <title>JavaScript Practice</title>\n</head>\n<body>\n    <h1>JavaScript Console</h1>\n    <p>Check the console for output</p>\n    \n    <script>\n        // Add your JavaScript code here\n    </script>\n</body>\n</html>"
                        }
                    ]
                },
                {
                    id: "js-2",
                    title: "DOM Manipulation",
                    content: `
                        <p>The Document Object Model (DOM) represents the HTML document as a tree structure that JavaScript can manipulate.</p>
                        <h3>Selecting Elements</h3>
                        <div class="code-example">
// Select by ID
const header = document.getElementById('header');

// Select by class
const items = document.getElementsByClassName('item');

// Select by tag
const paragraphs = document.getElementsByTagName('p');

// Query selector (more flexible)
const button = document.querySelector('.btn');
const allButtons = document.querySelectorAll('.btn');
                        </div>
                        <h3>Modifying Elements</h3>
                        <div class="code-example">
// Change content
element.textContent = 'New text';
element.innerHTML = '&lt;strong&gt;Bold text&lt;/strong&gt;';

// Change styles
element.style.color = 'blue';
element.classList.add('highlight');
element.classList.remove('hidden');

// Change attributes
image.src = 'new-image.jpg';
link.href = 'https://example.com';
                        </div>
                        <h3>Event Handling</h3>
                        <div class="code-example">
// Click event
button.addEventListener('click', function() {
    console.log('Button clicked!');
});

// Form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted');
});

// Mouse events
element.addEventListener('mouseover', function() {
    this.style.backgroundColor = 'yellow';
});
                        </div>
                    `,
                    exercises: [
                        {
                            type: "coding",
                            instructions: "Create an interactive page with DOM manipulation and event handlers.",
                            starterCode: "<!DOCTYPE html>\n<html>\n<head>\n    <title>DOM Manipulation</title>\n    <style>\n        .highlight { background-color: yellow; }\n        .hidden { display: none; }\n    </style>\n</head>\n<body>\n    <h1 id=\"title\">DOM Manipulation Demo</h1>\n    <button id=\"changeText\">Change Text</button>\n    <button id=\"toggleHighlight\">Toggle Highlight</button>\n    <button id=\"addElement\">Add Element</button>\n    \n    <div id=\"container\">\n        <p>Original paragraph</p>\n    </div>\n    \n    <script>\n        // Add your DOM manipulation code here\n    </script>\n</body>\n</html>"
                        }
                    ]
                },
                {
                    id: "js-3",
                    title: "Async JavaScript and APIs",
                    content: `
                        <p>Asynchronous JavaScript allows you to handle operations that take time, like API calls, without blocking the main thread.</p>
                        <h3>Promises</h3>
                        <div class="code-example">
// Creating a promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data loaded successfully');
        }, 2000);
    });
};

// Using promises
fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));
                        </div>
                        <h3>Async/Await</h3>
                        <div class="code-example">
// Async function
async function loadData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

loadData();
                        </div>
                        <h3>Fetch API</h3>
                        <div class="code-example">
// GET request
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// POST request
fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: 'John',
        email: 'john@example.com'
    })
})
.then(response => response.json())
.then(data => console.log(data));
                        </div>
                    `,
                    exercises: [
                        {
                            type: "coding",
                            instructions: "Create a demo that uses async JavaScript to simulate API calls.",
                            starterCode: "<!DOCTYPE html>\n<html>\n<head>\n    <title>Async JavaScript</title>\n</head>\n<body>\n    <h1>Async JavaScript Demo</h1>\n    <button id=\"loadData\">Load Data</button>\n    <div id=\"result\">Click the button to load data</div>\n    \n    <script>\n        // Simulate API call with async/await\n        async function simulateAPICall() {\n            // Add your async code here\n        }\n        \n        // Add event listener\n    </script>\n</body>\n</html>"
                        }
                    ]
                }
            ]
        }
    ],
    
    achievements: [
        {
            id: "first-lesson",
            name: "First Steps",
            description: "Complete your first lesson",
            icon: "🎯",
            unlocked: false
        },
        {
            id: "html-master",
            name: "HTML Expert",
            description: "Complete all HTML lessons",
            icon: "📝",
            unlocked: false
        },
        {
            id: "css-master",
            name: "CSS Stylist",
            description: "Complete all CSS lessons",
            icon: "🎨",
            unlocked: false
        },
        {
            id: "js-master",
            name: "JavaScript Ninja",
            description: "Complete all JavaScript lessons",
            icon: "⚡",
            unlocked: false
        },
        {
            id: "quick-learner",
            name: "Quick Learner",
            description: "Complete 5 lessons in one day",
            icon: "🚀",
            unlocked: false
        },
        {
            id: "practice-makes-perfect",
            name: "Practice Master",
            description: "Complete 10 exercises",
            icon: "💪",
            unlocked: false
        },
        {
            id: "streak-warrior",
            name: "Streak Warrior",
            description: "7-day learning streak",
            icon: "🔥",
            unlocked: false
        },
        {
            id: "full-stack-beginner",
            name: "Full Stack Beginner",
            description: "Complete all courses",
            icon: "🏆",
            unlocked: false
        }
    ]
};

// User progress data
const userProgress = {
    lessonsCompleted: [],
    exercisesCompleted: [],
    currentStreak: 0,
    lastActivityDate: null,
    totalLessons: 0,
    totalExercises: 0,
    achievements: []
};