// Chart.js configuration for Progress Chart
document.addEventListener('DOMContentLoaded', function() {
    // Progress Chart
    const progressCtx = document.getElementById('progressChart').getContext('2d');
    
    const progressChart = new Chart(progressCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Grade Average',
                data: [70, 65, 72, 78, 82, 85],
                borderColor: '#87ceeb',
                backgroundColor: 'rgba(135, 206, 235, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#102a43',
                    titleColor: '#e0e0e0',
                    bodyColor: '#e0e0e0',
                    borderColor: '#87ceeb',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(160, 160, 160, 0.1)'
                    },
                    ticks: {
                        color: '#a0a0a0'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(160, 160, 160, 0.1)'
                    },
                    ticks: {
                        color: '#a0a0a0'
                    }
                }
            }
        }
    });
    
    // Crisis Mode Button
    const crisisBtn = document.querySelector('.crisis-btn');
    
    if (crisisBtn) {
        crisisBtn.addEventListener('click', function() {
            alert('Crisis Mode would be activated here in the full version.');
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.sidebar-nav li a');
    const mainContent = document.querySelector('.main-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.parentElement.classList.remove('active'));
            
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // Get the section to display
            const section = this.getAttribute('href').substring(1);
            
            // Load the appropriate content
            loadSection(section);
        });
    });
    
    function loadSection(section) {
        // This function needs to actually update the mainContent HTML
        switch(section) {
            case 'dashboard':
                break;
            case 'appointments':
                mainContent.innerHTML = generateAppointmentsHTML();
                break;
            case 'courses':
                mainContent.innerHTML = generateCoursesHTML();
                break;
            case 'history':
                mainContent.innerHTML = generateHistoryHTML();
                break;
            case 'settings':
                mainContent.innerHTML = generateSettingsHTML();
                break;
        }
        
        // Re-attach event listeners for the crisis mode button
        const crisisBtn = document.querySelector('.crisis-btn');
        if (crisisBtn) {
            crisisBtn.addEventListener('click', function() {
                alert('Crisis Mode would be activated here in the full version.');
            });
        }
    }
    
    // Functions to generate HTML for each section
    function generateAppointmentsHTML() {
        return `
            <header class="dashboard-header">
                <div class="welcome">
                    <h1>Your Appointments</h1>
                    <p>Thursday, March 20, 2025</p>
                </div>
                <div class="header-actions">
                    <button class="btn crisis-btn"><i class="fas fa-exclamation-circle"></i> Crisis Mode</button>
                    <div class="notifications">
                        <i class="fas fa-bell"></i>
                        <span class="notification-badge">3</span>
                    </div>
                </div>
            </header>
            
            <section class="appointments-management">
                <div class="section-header">
                    <h2>Manage Your Sessions</h2>
                    <button class="btn"><i class="fas fa-plus"></i> New Appointment</button>
                </div>
                
                <div class="filter-options">
                    <button class="filter-btn active">All</button>
                    <button class="filter-btn">Upcoming</button>
                    <button class="filter-btn">Pending</button>
                    <button class="filter-btn">Completed</button>
                    <button class="filter-btn">Canceled</button>
                </div>
                
                <div class="appointments-list">
                    <div class="appointment-card">
                        <div class="appointment-date">
                            <span class="day">Today</span>
                            <span class="time">7:00 PM</span>
                        </div>
                        <div class="appointment-details">
                            <h3>Calculus II - Integrals Review</h3>
                            <p>Tutor: Alex Johnson</p>
                            <p class="location"><i class="fas fa-map-marker-alt"></i> Library, Room 204</p>
                        </div>
                        <div class="appointment-status">
                            <span class="status confirmed">Confirmed</span>
                            <div class="action-buttons">
                                <button class="action-btn"><i class="fas fa-edit"></i></button>
                                <button class="action-btn"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="appointment-card">
                        <div class="appointment-date">
                            <span class="day">Mar 21</span>
                            <span class="time">4:30 PM</span>
                        </div>
                        <div class="appointment-details">
                            <h3>Data Structures - Binary Trees</h3>
                            <p>Tutor: Maria Garcia</p>
                            <p class="location"><i class="fas fa-map-marker-alt"></i> Online Session</p>
                        </div>
                        <div class="appointment-status">
                            <span class="status confirmed">Confirmed</span>
                            <div class="action-buttons">
                                <button class="action-btn"><i class="fas fa-edit"></i></button>
                                <button class="action-btn"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
    
    function generateCoursesHTML() {
        return `
            <header class="dashboard-header">
                <div class="welcome">
                    <h1>My Courses</h1>
                    <p>Thursday, March 20, 2025</p>
                </div>
                <div class="header-actions">
                    <button class="btn crisis-btn"><i class="fas fa-exclamation-circle"></i> Crisis Mode</button>
                    <div class="notifications">
                        <i class="fas fa-bell"></i>
                        <span class="notification-badge">3</span>
                    </div>
                </div>
            </header>
            
            <section class="courses-list-section">
                <div class="section-header">
                    <h2>Current Courses</h2>
                    <button class="btn"><i class="fas fa-plus"></i> Add Course</button>
                </div>
                
                <div class="courses-grid">
                    <div class="course-item">
                        <div class="course-item-header math">
                            <h3>Calculus II</h3>
                            <p>MAT 210 - Dr. Johnson</p>
                        </div>
                        <div class="course-item-body">
                            <p><i class="fas fa-calendar-alt"></i> MWF 10:00 AM - 11:15 AM</p>
                            <p><i class="fas fa-book"></i> 4 Credit Hours</p>
                            <div class="progress-bar">
                                <div class="progress" style="width: 75%;"></div>
                            </div>
                            <p>75% Complete</p>
                        </div>
                        <div class="course-item-footer">
                            <button class="btn">Find Tutors</button>
                        </div>
                    </div>
                    
                    <div class="course-item">
                        <div class="course-item-header cs">
                            <h3>Data Structures</h3>
                            <p>CSC 215 - Dr. Smith</p>
                        </div>
                        <div class="course-item-body">
                            <p><i class="fas fa-calendar-alt"></i> TR 1:00 PM - 2:15 PM</p>
                            <p><i class="fas fa-book"></i> 3 Credit Hours</p>
                            <div class="progress-bar">
                                <div class="progress" style="width: 60%;"></div>
                            </div>
                            <p>60% Complete</p>
                        </div>
                        <div class="course-item-footer">
                            <button class="btn">Find Tutors</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
    
    function generateHistoryHTML() {
        return `
            <header class="dashboard-header">
                <div class="welcome">
                    <h1>Session History</h1>
                    <p>Thursday, March 20, 2025</p>
                </div>
                <div class="header-actions">
                    <button class="btn crisis-btn"><i class="fas fa-exclamation-circle"></i> Crisis Mode</button>
                    <div class="notifications">
                        <i class="fas fa-bell"></i>
                        <span class="notification-badge">3</span>
                    </div>
                </div>
            </header>
            
            <section class="history-section">
                <div class="section-header">
                    <h2>Past Sessions</h2>
                    <div class="filter-dropdown">
                        <select>
                            <option>All Time</option>
                            <option>Last Month</option>
                            <option>Last Week</option>
                        </select>
                    </div>
                </div>
                
                <div class="history-list">
                    <div class="history-item">
                        <div class="history-date">
                            <span class="month">MAR</span>
                            <span class="day">15</span>
                        </div>
                        <div class="history-details">
                            <h3>Calculus I - Limits and Derivatives</h3>
                            <p>Tutor: Alex Johnson</p>
                            <p>Duration: 1 hour 30 minutes</p>
                        </div>
                        <div class="history-rating">
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </span>
                            <button class="btn">Book Again</button>
                        </div>
                    </div>
                    
                    <div class="history-item">
                        <div class="history-date">
                            <span class="month">MAR</span>
                            <span class="day">10</span>
                        </div>
                        <div class="history-details">
                            <h3>Java Programming - Object-Oriented Concepts</h3>
                            <p>Tutor: Maria Garcia</p>
                            <p>Duration: 2 hours</p>
                        </div>
                        <div class="history-rating">
                            <span class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                            </span>
                            <button class="btn">Book Again</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
    
    function generateSettingsHTML() {
        return `
            <header class="dashboard-header">
                <div class="welcome">
                    <h1>Account Settings</h1>
                    <p>Thursday, March 20, 2025</p>
                </div>
                <div class="header-actions">
                    <button class="btn crisis-btn"><i class="fas fa-exclamation-circle"></i> Crisis Mode</button>
                    <div class="notifications">
                        <i class="fas fa-bell"></i>
                        <span class="notification-badge">3</span>
                    </div>
                </div>
            </header>
            
            <section class="settings-section">
                <div class="settings-tabs">
                    <button class="tab-btn active">Profile</button>
                    <button class="tab-btn">Notifications</button>
                    <button class="tab-btn">Payment Methods</button>
                    <button class="tab-btn">Privacy</button>
                </div>
                
                <div class="settings-content">
                    <div class="profile-settings">
                        <div class="profile-header">
                            <div class="profile-image">
                                <img src="https://via.placeholder.com/100x100/87ceeb/0a1929?text=JS" alt="Profile Picture">
                                <button class="change-photo-btn"><i class="fas fa-camera"></i></button>
                            </div>
                            <div class="profile-info">
                                <h2>John Smith</h2>
                                <p>Computer Science Major</p>
                                <p>Student ID: 123456789</p>
                            </div>
                        </div>
                        
                        <form class="settings-form">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" value="John Smith">
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" value="john.smith@usm.edu">
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="tel" value="(601) 555-1234">
                            </div>
                            <div class="form-group">
                                <label>Major</label>
                                <input type="text" value="Computer Science">
                            </div>
                            <div class="form-group">
                                <label>Bio</label>
                                <textarea rows="4">Computer Science student with interests in AI and machine learning. Looking for help with advanced calculus and physics courses.</textarea>
                            </div>
                            <button type="button" class="btn">Save Changes</button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }
});

// Quiz Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners for quiz buttons
    const quizButtons = document.querySelectorAll('.quiz-btn');
    
    quizButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activityItem = this.closest('.activity-item');
            const sessionTitle = activityItem.querySelector('h3').textContent;
            showQuizModal(sessionTitle);
        });
    });
    
    // Quiz modal functionality
    const quizModal = document.querySelector('.quiz-modal');
    const closeQuizBtn = document.querySelector('.close-quiz');
    const questionContainer = document.querySelector('.question-container');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const submitBtn = document.querySelector('.nav-btn.submit');
    
    closeQuizBtn.addEventListener('click', function() {
        quizModal.classList.remove('active');
    });
    
    // Sample quiz questions (in a real app, these would come from an API or database)
    const quizQuestions = {
        'Completed Session: Calculus I': [
            {
                question: "What is the derivative of f(x) = x²?",
                options: ["f'(x) = x", "f'(x) = 2x", "f'(x) = 2", "f'(x) = x²"],
                answer: 1
            },
            {
                question: "What is the limit of (1 + 1/n)^n as n approaches infinity?",
                options: ["0", "1", "e", "Infinity"],
                answer: 2
            },
            {
                question: "Which of the following is the chain rule?",
                options: [
                    "d/dx[f(g(x))] = f'(g(x)) · g'(x)",
                    "d/dx[f(x) · g(x)] = f'(x) · g(x) + f(x) · g'(x)",
                    "d/dx[f(x)/g(x)] = [f'(x) · g(x) - f(x) · g'(x)]/[g(x)]²",
                    "d/dx[f(x) + g(x)] = f'(x) + g'(x)"
                ],
                answer: 0
            },
            {
                question: "What is the indefinite integral of 2x?",
                options: ["x² + C", "x² - C", "x² / 2 + C", "2x² + C"],
                answer: 0
            },
            {
                question: "The derivative of sin(x) is:",
                options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
                answer: 0
            }
        ],
        'Completed Session: Java Programming': [
            {
                question: "What is inheritance in Java?",
                options: [
                    "The process where one class acquires the properties of another",
                    "The ability to create multiple methods with the same name",
                    "The concept of hiding the internal details and showing the functionality",
                    "A way to create a new instance of a class"
                ],
                answer: 0
            },
            {
                question: "Which keyword is used to inherit a class in Java?",
                options: ["implements", "extends", "inherits", "using"],
                answer: 1
            },
            {
                question: "What does the 'super' keyword do in Java?",
                options: [
                    "It refers to the superclass object",
                    "It creates a new instance of the parent class",
                    "It overrides a method in the parent class",
                    "It makes a class immutable"
                ],
                answer: 0
            },
            {
                question: "What is method overriding in Java?",
                options: [
                    "Defining a method in a subclass that has the same name as in the parent class",
                    "Creating multiple methods with the same name but different parameters",
                    "Hiding variables of the superclass",
                    "Making a method inaccessible in the child class"
                ],
                answer: 0
            },
            {
                question: "Which of the following is true about the 'final' keyword in Java?",
                options: [
                    "A final class can be inherited",
                    "A final method can be overridden",
                    "A final variable can be reassigned",
                    "A final method cannot be overridden"
                ],
                answer: 3
            }
        ]
    };
    
    let currentQuiz = null;
    let currentQuestionIndex = 0;
    let userAnswers = [];
    
    function showQuizModal(sessionTitle) {
        // Set up the quiz based on the session title
        if (quizQuestions[sessionTitle]) {
            currentQuiz = sessionTitle;
            currentQuestionIndex = 0;
            userAnswers = new Array(quizQuestions[sessionTitle].length).fill(-1);
            
            // Update total questions count
            totalQuestionsSpan.textContent = quizQuestions[sessionTitle].length;
            
            // Show the first question
            showQuestion(0);
            
            // Show the modal
            quizModal.classList.add('active');
        } else {
            alert('No quiz available for this session yet.');
        }
    }
    
    function showQuestion(index) {
        const questions = quizQuestions[currentQuiz];
        const question = questions[index];
        
        // Update current question number
        currentQuestionSpan.textContent = index + 1;
        
        // Create the question HTML
        let questionHTML = `
            <div class="question">${index + 1}. ${question.question}</div>
            <div class="options">
        `;
        
        // Add each option
        question.options.forEach((option, i) => {
            const selected = userAnswers[index] === i ? 'selected' : '';
            questionHTML += `<div class="option ${selected}" data-index="${i}">${option}</div>`;
        });
        
        questionHTML += '</div>';
        
        // Update the question container
        questionContainer.innerHTML = questionHTML;
        
        // Add event listeners to options
        const optionElements = questionContainer.querySelectorAll('.option');
        optionElements.forEach(option => {
            option.addEventListener('click', function() {
                const optionIndex = parseInt(this.dataset.index);
                userAnswers[currentQuestionIndex] = optionIndex;
                
                // Remove selected class from all options
                optionElements.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
            });
        });
        
        // Update navigation buttons
        prevBtn.disabled = index === 0;
        
        if (index === questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }
    
    function showResults() {
        const questions = quizQuestions[currentQuiz];
        let correctAnswers = 0;
        
        // Count correct answers
        userAnswers.forEach((answer, index) => {
            if (answer === questions[index].answer) {
                correctAnswers++;
            }
        });
        
        const score = Math.round((correctAnswers / questions.length) * 100);
        let resultMessage = '';
        
        if (score >= 80) {
            resultMessage = 'Excellent! You have a strong understanding of the material.';
        } else if (score >= 60) {
            resultMessage = 'Good job! You understand most of the concepts, but there\'s room for improvement.';
        } else {
            resultMessage = 'You might need to review the material again. Consider booking another session.';
        }
        
        // Create results HTML
        const resultsHTML = `
            <div class="quiz-results">
                <div class="score">${score}%</div>
                <p class="result-message">${resultMessage}</p>
                <button class="btn">Done</button>
            </div>
        `;
        
        // Update the question container with results
        questionContainer.innerHTML = resultsHTML;
        
        // Hide navigation
        document.querySelector('.quiz-footer').style.display = 'none';
        
        // Add event listener to Done button
        const doneBtn = questionContainer.querySelector('.btn');
        doneBtn.addEventListener('click', function() {
            quizModal.classList.remove('active');
            // Reset quiz footer display for next time
            document.querySelector('.quiz-footer').style.display = 'flex';
        });
    }
    
    // Navigation event listeners
    prevBtn.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentQuestionIndex < quizQuestions[currentQuiz].length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
    });
    
    submitBtn.addEventListener('click', function() {
        showResults();
    });
});

