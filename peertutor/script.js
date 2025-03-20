// Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('.nav-list');

if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        navList.classList.toggle('active');
    });
}

// Navigation items click handling
const menuListItems = document.querySelectorAll('.nav-list li a');
if (menuListItems.length) {
    for (let i = 0; i < menuListItems.length; i++) {
        menuListItems[i].addEventListener('click', function() {
            menuBtn.classList.remove('active');
            navList.classList.remove('active');
        });
    }
}

// Modal Functionality
const modal = document.getElementById('login-modal');
const openModalBtn = document.getElementById('open-login-modal');
const closeModalBtn = document.querySelector('.close-modal');

if (openModalBtn) {
    openModalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Auth tabs functionality
const tabs = document.querySelectorAll('.tab');
const forms = document.querySelectorAll('.auth-form');

if (tabs.length && forms.length) {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all forms
            forms.forEach(form => form.classList.remove('active'));
            
            // Show form corresponding to clicked tab
            const formId = tab.dataset.tab + '-form';
            document.getElementById(formId).classList.add('active');
        });
    });
}

// Prevent form submission (for demo purposes)
const authForms = document.querySelectorAll('form');
if (authForms.length) {
    authForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('This is a demo. Form submission is disabled.');
        });
    });
}

// Testimonials Carousel
if (typeof $.fn.owlCarousel !== 'undefined') {
    $('.testimonials-slider').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 6000,
        margin: 10,
        nav: true,
        navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });
}

// Book Now buttons
const bookButtons = document.querySelectorAll('.book-btn');
if (bookButtons.length) {
    bookButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Booking functionality would be implemented here in the full version.');
        });
    });
}

// Add this to your existing script.js file to make the search bar functional
// Sample course data - replace with your actual course data
const courses = [
    // Introductory courses
    { id: 1, code: "CSC 101", name: "Introduction to Computer Science", instructor: "Dr. Smith" },
    { id: 2, code: "MAT 210", name: "Calculus I", instructor: "Dr. Johnson" },
    { id: 3, code: "BIO 150", name: "General Biology", instructor: "Dr. Martinez" },
    { id: 4, code: "CHM 201", name: "Organic Chemistry", instructor: "Dr. Williams" },
    { id: 5, code: "PHY 220", name: "Physics for Engineers", instructor: "Dr. Taylor" },
    { id: 6, code: "ENG 101", name: "College Composition", instructor: "Dr. Brown" },
    
    // Higher level courses
    { id: 7, code: "CSC 310", name: "Data Structures and Algorithms", instructor: "Dr. Wilson" },
    { id: 8, code: "CSC 420", name: "Artificial Intelligence", instructor: "Dr. Lee" },
    { id: 9, code: "CSC 450", name: "Advanced Operating Systems", instructor: "Dr. Garcia" },
    { id: 10, code: "MAT 315", name: "Linear Algebra", instructor: "Dr. White" },
    { id: 11, code: "MAT 450", name: "Complex Analysis", instructor: "Dr. Miller" },
    { id: 12, code: "BIO 340", name: "Genetics", instructor: "Dr. Anderson" },
    { id: 13, code: "BIO 420", name: "Molecular Biology", instructor: "Dr. Thomas" },
    { id: 14, code: "CHM 340", name: "Physical Chemistry", instructor: "Dr. Jackson" },
    { id: 15, code: "CHM 410", name: "Advanced Biochemistry", instructor: "Dr. Harris" },
    { id: 16, code: "PHY 330", name: "Quantum Mechanics", instructor: "Dr. Martin" },
    { id: 17, code: "PHY 450", name: "Astrophysics", instructor: "Dr. Thompson" },
    { id: 18, code: "ENG 320", name: "Creative Writing", instructor: "Dr. Clark" },
    { id: 19, code: "ENG 410", name: "Literary Criticism", instructor: "Dr. Lewis" },
    { id: 20, code: "CSC 380", name: "Database Management Systems", instructor: "Dr. Walker" },
    { id: 21, code: "CSC 401", name: "Cybersecurity", instructor: "Dr. Hall" },
    { id: 22, code: "BIO 390", name: "Evolutionary Biology", instructor: "Dr. Young" },
    { id: 23, code: "MAT 390", name: "Differential Equations", instructor: "Dr. King" },
    { id: 24, code: "PHY 380", name: "Thermodynamics", instructor: "Dr. Wright" },
    { id: 25, code: "CHM 350", name: "Analytical Chemistry", instructor: "Dr. Scott" },
    
    // Business courses
    { id: 26, code: "BUS 101", name: "Introduction to Business", instructor: "Dr. Adams" },
    { id: 27, code: "BUS 220", name: "Principles of Marketing", instructor: "Dr. Baker" },
    { id: 28, code: "BUS 330", name: "Business Ethics", instructor: "Dr. Carter" },
    { id: 29, code: "BUS 450", name: "Strategic Management", instructor: "Dr. Davis" },
    
    // Accounting courses
    { id: 30, code: "ACC 201", name: "Financial Accounting", instructor: "Dr. Evans" },
    { id: 31, code: "ACC 202", name: "Managerial Accounting", instructor: "Dr. Foster" },
    { id: 32, code: "ACC 310", name: "Intermediate Accounting", instructor: "Dr. Green" },
    { id: 33, code: "ACC 420", name: "Auditing", instructor: "Dr. Hill" },
    { id: 34, code: "ACC 430", name: "Taxation", instructor: "Dr. Irwin" },
    
    // Economics courses
    { id: 35, code: "ECO 101", name: "Principles of Microeconomics", instructor: "Dr. Jones" },
    { id: 36, code: "ECO 102", name: "Principles of Macroeconomics", instructor: "Dr. Klein" },
    { id: 37, code: "ECO 330", name: "International Economics", instructor: "Dr. Lopez" },
    
    // Psychology courses
    { id: 38, code: "PSY 101", name: "Introduction to Psychology", instructor: "Dr. Moore" },
    { id: 39, code: "PSY 240", name: "Developmental Psychology", instructor: "Dr. Nelson" },
    { id: 40, code: "PSY 350", name: "Abnormal Psychology", instructor: "Dr. Owens" },
    
    // Art and Humanities
    { id: 41, code: "ART 110", name: "Introduction to Drawing", instructor: "Prof. Parker" },
    { id: 42, code: "ART 250", name: "Art History", instructor: "Dr. Quinn" },
    { id: 43, code: "MUS 120", name: "Music Theory", instructor: "Prof. Rogers" },
    { id: 44, code: "PHIL 200", name: "Introduction to Philosophy", instructor: "Dr. Smith" },
    
    // Political Science and History
    { id: 45, code: "POL 101", name: "American Government", instructor: "Dr. Turner" },
    { id: 46, code: "POL 330", name: "International Relations", instructor: "Dr. Underwood" },
    { id: 47, code: "HIS 101", name: "World History", instructor: "Dr. Vincent" },
    { id: 48, code: "HIS 240", name: "Modern European History", instructor: "Dr. Wilson" },
    
    // Finance courses
    { id: 49, code: "FIN 301", name: "Corporate Finance", instructor: "Dr. Xavier" },
    { id: 50, code: "FIN 420", name: "Investment Analysis", instructor: "Dr. Young" }
];

// Search functionality
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-btn');
let resultsContainer = null;

// Create a results container if it doesn't exist
function createResultsContainer() {
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        document.querySelector('.search-bar').appendChild(resultsContainer);
        
        // Style the results container
        resultsContainer.style.position = 'absolute';
        resultsContainer.style.top = '100%';
        resultsContainer.style.left = '0';
        resultsContainer.style.width = '100%';
        resultsContainer.style.backgroundColor = 'var(--dark-card)';
        resultsContainer.style.borderRadius = '0 0 5px 5px';
        resultsContainer.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        resultsContainer.style.zIndex = '50';
        resultsContainer.style.maxHeight = '300px';
        resultsContainer.style.overflowY = 'auto';
    }
}

// Search function
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    createResultsContainer();
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    if (query.length < 2) {
        resultsContainer.style.display = 'none';
        return;
    }
    
    // Filter courses based on input
    const filteredCourses = courses.filter(course => 
        course.code.toLowerCase().includes(query) || 
        course.name.toLowerCase().includes(query)
    );
    
    // Display results
    if (filteredCourses.length > 0) {
        filteredCourses.forEach(course => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <div class="result-info">
                    <div class="result-title">${course.code}: ${course.name}</div>
                    <div class="result-subtitle">Instructor: ${course.instructor}</div>
                </div>
            `;
            
            // Style the result item
            resultItem.style.padding = '15px';
            resultItem.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            resultItem.style.cursor = 'pointer';
            resultItem.style.transition = 'background-color 0.3s';
            
            // Hover effect
            resultItem.addEventListener('mouseenter', () => {
                resultItem.style.backgroundColor = 'var(--form-bg)';
            });
            
            resultItem.addEventListener('mouseleave', () => {
                resultItem.style.backgroundColor = 'transparent';
            });
            
            // Click event
            resultItem.addEventListener('click', () => {
                alert(`You selected ${course.code}: ${course.name}. In the full version, this would take you to the course page.`);
                searchInput.value = `${course.code}: ${course.name}`;
                resultsContainer.style.display = 'none';
            });
            
            resultsContainer.appendChild(resultItem);
        });
        
        resultsContainer.style.display = 'block';
    } else {
        // No results found
        const noResults = document.createElement('div');
        noResults.textContent = 'No courses found. Try a different search term.';
        noResults.style.padding = '15px';
        noResults.style.color = 'var(--muted-text)';
        noResults.style.textAlign = 'center';
        
        resultsContainer.appendChild(noResults);
        resultsContainer.style.display = 'block';
    }
}

// Event listeners
searchInput.addEventListener('input', performSearch);
searchBtn.addEventListener('click', performSearch);

// Close results when clicking outside
document.addEventListener('click', (e) => {
    if (resultsContainer && !e.target.closest('.search-bar')) {
        resultsContainer.style.display = 'none';
    }
});


// Crisis Mode Button Functionality
const crisisBtn = document.querySelector('.crisis-btn');
const crisisModal = document.getElementById('crisis-modal');
const closeCrisisModal = document.getElementById('close-crisis-modal');
const cancelSearch = document.getElementById('cancel-crisis-search');
const searchingElements = document.querySelector('.searching-text');
const tutorResults = document.querySelector('.tutor-results');
const tutorCount = document.getElementById('tutor-count');
const availableTutors = document.querySelector('.available-tutors');

// Sample tutor data
const tutors = [
    {
        name: "Alex Johnson",
        photo: "https://via.placeholder.com/60x60/87ceeb/0a1929?text=AJ",
        subjects: "Calculus, Statistics",
        rating: 4.9,
        distance: "2 min away"
    },
    {
        name: "Maria Garcia",
        photo: "https://via.placeholder.com/60x60/87ceeb/0a1929?text=MG",
        subjects: "Biology, Chemistry",
        rating: 4.8,
        distance: "5 min away"
    },
    {
        name: "David Kim",
        photo: "https://via.placeholder.com/60x60/87ceeb/0a1929?text=DK",
        subjects: "Computer Science, Physics",
        rating: 4.7,
        distance: "Online now"
    }
];

// Function to show tutor results
function showTutorResults() {
    searchingElements.style.display = 'none';
    tutorResults.style.display = 'block';
    
    // Set tutor count
    tutorCount.textContent = tutors.length;
    
    // Clear previous tutors
    availableTutors.innerHTML = '';
    
    // Add tutors to the container
    tutors.forEach(tutor => {
        const tutorCard = document.createElement('div');
        tutorCard.className = 'tutor-card';
        tutorCard.innerHTML = `
            <img src="${tutor.photo}" alt="${tutor.name}" class="tutor-photo">
            <div class="tutor-info">
                <div class="tutor-name">${tutor.name}</div>
                <div class="tutor-subjects">${tutor.subjects}</div>
                <div class="tutor-rating">
                    <i class="fas fa-star"></i> ${tutor.rating} - ${tutor.distance}
                </div>
            </div>
            <div class="tutor-actions">
                <button class="connect-btn">Connect</button>
            </div>
        `;
        availableTutors.appendChild(tutorCard);
        
        // Add click event to connect button
        const connectBtn = tutorCard.querySelector('.connect-btn');
        connectBtn.addEventListener('click', function() {
            alert(`Connecting you with ${tutor.name}! In the full version, this would open a chat window.`);
        });
    });
}

// Open crisis mode modal
function openCrisisModal() {
    crisisModal.style.display = 'block';
    searchingElements.style.display = 'block';
    tutorResults.style.display = 'none';
    
    // Simulate search time (5 seconds)
    setTimeout(showTutorResults, 5000);
}

// Close crisis mode modal
function closeCrisisModalFunc() {
    crisisModal.style.display = 'none';
}

// Event listeners
if (crisisBtn) {
    crisisBtn.addEventListener('click', openCrisisModal);
}

if (closeCrisisModal) {
    closeCrisisModal.addEventListener('click', closeCrisisModalFunc);
}

if (cancelSearch) {
    cancelSearch.addEventListener('click', closeCrisisModalFunc);
}

// Close when clicking outside
window.addEventListener('click', function(event) {
    if (event.target == crisisModal) {
        closeCrisisModalFunc();
    }
});

// Add this to your script.js file or inside a <script> tag right after your login form

// Get the login form
const loginForm = document.getElementById('login-form');

// Add an event listener for the form submission
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission
        
        // Redirect to the dashboard page
        window.location.href = 'dashboard.html';
    });
}
