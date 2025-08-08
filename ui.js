const quotes = [
            {
                text: "The only way to do great work is to love what you do.",
                author: "Steve Jobs"
            },
            {
                text: "Life is what happens to you while you're busy making other plans.",
                author: "John Lennon"
            },
            {
                text: "The future belongs to those who believe in the beauty of their dreams.",
                author: "Eleanor Roosevelt"
            },
            {
                text: "It is during our darkest moments that we must focus to see the light.",
                author: "Aristotle"
            },
            {
                text: "The way to get started is to quit talking and begin doing.",
                author: "Walt Disney"
            },
            {
                text: "Your time is limited, don't waste it living someone else's life.",
                author: "Steve Jobs"
            },
            {
                text: "If life were predictable it would cease to be life, and be without flavor.",
                author: "Eleanor Roosevelt"
            },
            {
                text: "If you look at what you have in life, you'll always have more.",
                author: "Oprah Winfrey"
            },
            {
                text: "Life is really simple, but we insist on making it complicated.",
                author: "Confucius"
            },
            {
                text: "The purpose of our lives is to be happy.",
                author: "Dalai Lama"
            },
            {
                text: "You will face many defeats in life, but never let yourself be defeated.",
                author: "Maya Angelou"
            },
            {
                text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
                author: "Martin Luther King Jr."
            }
        ];

        let currentQuote = {};
        let favorites = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];

        // DOM elements
        const quoteContainer = document.getElementById('quoteContainer');
        const quoteText = document.getElementById('quoteText');
        const quoteAuthor = document.getElementById('quoteAuthor');
        const newQuoteBtn = document.getElementById('newQuoteBtn');
        const saveQuoteBtn = document.getElementById('saveQuoteBtn');
        const heartIcon = document.getElementById('heartIcon');
        const saveText = document.getElementById('saveText');
        const sidebar = document.getElementById('sidebar');
        const toggleBtn = document.getElementById('toggleBtn');
        const mobileToggle = document.getElementById('mobileToggle');
        const favoritesList = document.getElementById('favoritesList');

        // Initialize the app
        function init() {
            displayRandomQuote();
            updateFavoritesList();
            
            // Show sidebar by default on desktop
            if (window.innerWidth > 768) {
                sidebar.classList.add('visible');
            }
        }

        // Display a random quote
        function displayRandomQuote() {
            let newQuote;
            do {
                newQuote = quotes[Math.floor(Math.random() * quotes.length)];
            } while (newQuote === currentQuote && quotes.length > 1);

            currentQuote = newQuote;

            // Add fade out effect
            quoteContainer.classList.add('fade-out');

            setTimeout(() => {
                quoteText.textContent = currentQuote.text;
                quoteAuthor.textContent = currentQuote.author;
                updateSaveButton();
                
                // Remove fade out and add fade in
                quoteContainer.classList.remove('fade-out');
                quoteContainer.classList.add('fade-in');
                
                setTimeout(() => {
                    quoteContainer.classList.remove('fade-in');
                }, 500);
            }, 250);
        }

        // Update save button appearance
        function updateSaveButton() {
            const isSaved = favorites.some(fav => 
                fav.text === currentQuote.text && fav.author === currentQuote.author
            );

            if (isSaved) {
                saveQuoteBtn.classList.add('saved');
                heartIcon.textContent = '♥';
                saveText.textContent = 'Saved';
            } else {
                saveQuoteBtn.classList.remove('saved');
                heartIcon.textContent = '♡';
                saveText.textContent = 'Save Quote';
            }
        }

        // Toggle favorite status of current quote
        function toggleFavorite() {
            const existingIndex = favorites.findIndex(fav => 
                fav.text === currentQuote.text && fav.author === currentQuote.author
            );

            if (existingIndex !== -1) {
                favorites.splice(existingIndex, 1);
            } else {
                favorites.push({ ...currentQuote });
            }

            localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
            updateSaveButton();
            updateFavoritesList();
        }

        // Remove quote from favorites
        function removeFavorite(index) {
            favorites.splice(index, 1);
            localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
            updateFavoritesList();
            updateSaveButton();
        }

        // Update favorites list display
        function updateFavoritesList() {
            if (favorites.length === 0) {
                favoritesList.innerHTML = '<div class="empty-state">No saved quotes yet. Start collecting your favorites!</div>';
                return;
            }

            favoritesList.innerHTML = favorites.map((quote, index) => `
                <div class="favorite-item">
                    <div class="favorite-quote">"${quote.text}"</div>
                    <div class="favorite-author">— ${quote.author}</div>
                    <button class="remove-btn" onclick="removeFavorite(${index})">×</button>
                </div>
            `).join('');
        }

        // Toggle sidebar visibility
        function toggleSidebar() {
            sidebar.classList.toggle('visible');
        }

        // Event listeners
        newQuoteBtn.addEventListener('click', displayRandomQuote);
        saveQuoteBtn.addEventListener('click', toggleFavorite);
        toggleBtn.addEventListener('click', toggleSidebar);
        mobileToggle.addEventListener('click', toggleSidebar);

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                sidebar.classList.add('visible');
            } else {
                sidebar.classList.remove('visible');
            }
        });

        // Initialize the application
        init();