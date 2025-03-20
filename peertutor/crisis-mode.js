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
function closeCrisisModal() {
    crisisModal.style.display = 'none';
}

// Event listeners
if (crisisBtn) {
    crisisBtn.addEventListener('click', openCrisisModal);
}

if (closeCrisisModal) {
    closeCrisisModal.addEventListener('click', closeCrisisModal);
}

if (cancelSearch) {
    cancelSearch.addEventListener('click', closeCrisisModal);
}

// Close when clicking outside
window.addEventListener('click', function(event) {
    if (event.target == crisisModal) {
        closeCrisisModal();
    }
});

