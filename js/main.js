//swipper

var swiper = new Swiper(".popular-content", {
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        280: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        320: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        510: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        758: {
            slidesPerView: 4,
            spaceBetween: 15,
        },
        900: {
            lidesPerView:5,
            spaceBetween: 20,
        },
    }
    
});
const popularSwiper = new Swiper('.popular-content', {
    slidesPerView: 'auto', // Dynamic based on container
    spaceBetween: 20,
    centeredSlides: false,
    loop: true,
    autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: { spaceBetween: 15 },
        1024: { spaceBetween: 30 }
    }
});
//show video
let playButton = document.querySelector('.play-movie')
let video = document.querySelector('.video-container')
let myvideo = document.querySelector('#myvideo')
let closebtn = document.querySelector(".close video")

playButton.onclick = () => {
    video.classList.add("show-video");
    //Auto play when click On Button
    myvideo.play();
};
closebtn.onclick = () => {
    video.classList.remove("show-video");
    // Pause On clause Video
    myvideo.pause();
};
// Add to main.js
document.getElementById('search-input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.movie-card').forEach(card => {
        const title = card.querySelector('.movie-title').textContent.toLowerCase();
        card.style.display = title.includes(searchTerm) ? 'block' : 'none';
    });
});

// Add to main.js
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 
        document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
    );
});

// Add to main.js
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const movieId = btn.closest('.movie-card').dataset.movieId;
        document.getElementById('trailer-frame').src = `https://youtube.com/embed/${movieId}`;
        document.getElementById('trailer-modal').style.display = 'block';
    });
});

document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('trailer-frame').src = '';
    document.getElementById('trailer-modal').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.querySelector('.search-box .bx-search');
    
    // Get ALL movie boxes from BOTH sections
    const allMovies = [
        ...document.querySelectorAll('#popular .movie-box'),
        ...document.querySelectorAll('#movies .movie-box')
    ];
    
    function filterMovies() {
        const searchTerm = searchInput.value.toLowerCase();
        let hasMatches = false;
        
        allMovies.forEach(movie => {
            const title = movie.querySelector('.movie-title').textContent.toLowerCase();
            const genre = movie.querySelector('.movie-type').textContent.toLowerCase();
            
            const isVisible = title.includes(searchTerm) || genre.includes(searchTerm);
            movie.style.display = isVisible ? 'flex' : 'none'; // Use your card's display type
            
            if (isVisible) hasMatches = true;
        });
        
        // Show "no results" message if needed
        const noResults = document.getElementById('no-results') || createNoResultsMessage();
        noResults.style.display = hasMatches || searchTerm === '' ? 'none' : 'block';
    }
    
    function createNoResultsMessage() {
        const msg = document.createElement('div');
        msg.id = 'no-results';
        msg.style.display = 'none';
        msg.style.color = 'white';
        msg.style.textAlign = 'center';
        msg.style.padding = '2rem';
        msg.style.gridColumn = '1 / -1';
        msg.textContent = 'No movies found. Try another search!';
        document.querySelector('.movies-content').appendChild(msg);
        return msg;
    }
    
    // Event listeners
    searchInput.addEventListener('input', filterMovies);
    searchIcon.addEventListener('click', filterMovies);
    
    // Clear search when clicking the 'X' in search input (for Chrome)
    searchInput.addEventListener('search', function() {
        if (this.value === '') filterMovies();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Favorite buttons functionality
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    // Initialize favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Update button states on page load
    favoriteButtons.forEach(btn => {
        const movieId = btn.getAttribute('data-movie-id');
        if (favorites.includes(movieId)) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="bx bxs-heart"></i>';
        }
    });
    
    // Toggle favorite on click
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const movieId = this.getAttribute('data-movie-id');
            
            if (favorites.includes(movieId)) {
                // Remove from favorites
                favorites = favorites.filter(id => id !== movieId);
                this.classList.remove('active');
                this.innerHTML = '<i class="bx bx-heart"></i>';
            } else {
                // Add to favorites
                favorites.push(movieId);
                this.classList.add('active');
                this.innerHTML = '<i class="bx bxs-heart"></i>';
            }
            
            // Save to localStorage
            localStorage.setItem('favorites', JSON.stringify(favorites));
            
            // Update favorites display if on favorites page
            if (window.location.hash === '#favorites') {
                displayFavorites();
            }
        });
    });
    
    // Display favorites section
    function displayFavorites() {
        const favoritesSection = document.getElementById('favorites');
        if (!favoritesSection) return;
        
        const favoritesContainer = document.createElement('div');
        favoritesContainer.className = 'favorites-container';
        
        if (favorites.length === 0) {
            favoritesContainer.innerHTML = '<p>No favorites yet. Click the heart icon on movies to add some!</p>';
        } else {
            favorites.forEach(movieId => {
                const movieElement = document.querySelector(`.movie-box[data-movie-id="${movieId}"]`);
                if (movieElement) {
                    const clone = movieElement.cloneNode(true);
                    favoritesContainer.appendChild(clone);
                }
            });
        }
        
        // Clear previous content
        favoritesSection.innerHTML = '<h2 class="heading-title">Your Favorites</h2>';
        favoritesSection.appendChild(favoritesContainer);
    }
    
    // Check if we're on favorites page
    if (window.location.hash === '#favorites') {
        displayFavorites();
    }
});

// Add to your existing main.js
window.addEventListener('hashchange', function() {
    if (window.location.hash === '#favorites') {
        document.getElementById('favorites').style.display = 'block';
        displayFavorites();
    } else {
        document.getElementById('favorites').style.display = 'none';
    }
});

// Update your favorite button click handler
btn.addEventListener('click', function(e) {
    e.preventDefault();
    const movieId = this.getAttribute('data-movie-id');
    
    // Reset animation
    this.style.animation = 'none';
    void this.offsetWidth; // Trigger reflow
    
    if (favorites.includes(movieId)) {
        // Remove animation
        this.classList.remove('active');
        this.innerHTML = '<i class="bx bx-heart"></i>';
        this.style.animation = 'heartPulse 0.6s ease reverse';
        favorites = favorites.filter(id => id !== movieId);
    } else {
        // Add animation
        this.classList.add('active');
        this.innerHTML = '<i class="bx bxs-heart"></i>';
        this.style.animation = 'heartPulse 0.6s ease';
        favorites.push(movieId);
        
        // Optional: Add confetti effect for special favorites
        if (movieId === "special-movie-id") {
            triggerConfetti();
        }
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
});

// Add this function to your main.js
function triggerConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}