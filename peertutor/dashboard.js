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
