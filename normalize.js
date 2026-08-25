// ==========================================
// YOUTUBE CLONE - JAVASCRIPT
// ==========================================


// ==========================================
// 1. SELECT IMPORTANT ELEMENTS
// ==========================================

const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

const categories = document.querySelectorAll(".category");
const videoCards = document.querySelectorAll(".video-card");

const notificationBtn = document.querySelectorAll(".header-icon")[1];
const createVideoBtn = document.querySelectorAll(".header-icon")[0];



// ==========================================
// 2. SIDEBAR TOGGLE
// ==========================================

let sidebarOpen = true;

menuBtn.addEventListener("click", () => {

    sidebarOpen = !sidebarOpen;

    if (sidebarOpen) {

        sidebar.style.width = "240px";
        document.querySelector(".main").style.marginLeft = "240px";

        document.querySelectorAll(".side-item span").forEach(item => {
            item.style.display = "inline";
        });

        document.querySelectorAll(".sidebar h3").forEach(item => {
            item.style.display = "block";
        });

    } else {

        sidebar.style.width = "80px";
        document.querySelector(".main").style.marginLeft = "80px";

        document.querySelectorAll(".side-item span").forEach(item => {
            item.style.display = "none";
        });

        document.querySelectorAll(".sidebar h3").forEach(item => {
            item.style.display = "none";
        });
    }

});



// ==========================================
// 3. SEARCH FUNCTION
// ==========================================

function searchVideos() {

    const searchText = searchInput.value
        .toLowerCase()
        .trim();

    let foundVideos = 0;

    videoCards.forEach(card => {

        const title = card
            .querySelector("h2")
            .textContent
            .toLowerCase();

        const channel = card
            .querySelector(".video-details p")
            .textContent
            .toLowerCase();

        if (
            title.includes(searchText) ||
            channel.includes(searchText)
        ) {

            card.style.display = "block";

            foundVideos++;

        } else {

            card.style.display = "none";

        }

    });


    // No results message

    let noResults = document.querySelector(".no-results");

    if (foundVideos === 0) {

        if (!noResults) {

            noResults = document.createElement("div");

            noResults.className = "no-results";

            noResults.innerHTML = `
                <i class="fa-solid fa-magnifying-glass"></i>
                <h2>No results found</h2>
                <p>Try searching for something else.</p>
            `;

            document.querySelector(".video-grid")
                .appendChild(noResults);
        }

    } else {

        if (noResults) {
            noResults.remove();
        }

    }

}



// Search button

searchButton.addEventListener("click", searchVideos);


// Search when pressing Enter

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        searchVideos();

    }

});



// ==========================================
// 4. CATEGORY FILTER
// ==========================================

categories.forEach(category => {

    category.addEventListener("click", () => {

        // Remove active class

        categories.forEach(item => {
            item.classList.remove("active-category");
        });


        // Add active class

        category.classList.add("active-category");


        const selectedCategory =
            category.textContent
                .toLowerCase()
                .trim();


        // "All"

        if (selectedCategory === "all") {

            videoCards.forEach(card => {
                card.style.display = "block";
            });

            return;
        }


        let found = false;


        videoCards.forEach(card => {

            const title =
                card.querySelector("h2")
                    .textContent
                    .toLowerCase();

            const channel =
                card.querySelector(".video-details p")
                    .textContent
                    .toLowerCase();


            if (
                title.includes(selectedCategory) ||
                channel.includes(selectedCategory)
            ) {

                card.style.display = "block";

                found = true;

            } else {

                card.style.display = "none";

            }

        });


        // If category has no exact matches,
        // show all videos instead of blank page.

        if (!found) {

            videoCards.forEach(card => {
                card.style.display = "block";
            });

        }

    });

});



// ==========================================
// 5. VIDEO CARD CLICK
// ==========================================

videoCards.forEach(card => {

    card.addEventListener("click", (event) => {

        // Don't open video when clicking menu button

        if (
            event.target.closest(".more-btn")
        ) {
            return;
        }


        const title =
            card.querySelector("h2").textContent;

        const channel =
            card.querySelector(".video-details p")
                .textContent;


        const thumbnail =
            card.querySelector("img").src;


        openVideoPage(
            title,
            channel,
            thumbnail
        );

    });

});



// ==========================================
// 6. WATCH VIDEO PAGE
// ==========================================

function openVideoPage(title, channel, thumbnail) {

    const main = document.querySelector(".main");

    main.innerHTML = `

        <div class="watch-page">

            <div class="watch-video">

                <img
                    src="${thumbnail}"
                    alt="Video"
                >

                <div class="fake-play">

                    <i class="fa-solid fa-play"></i>

                </div>

            </div>


            <h1 class="watch-title">
                ${title}
            </h1>


            <div class="watch-actions">

                <div class="watch-channel">

                    <div class="channel-avatar">
                        ${channel.charAt(0)}
                    </div>

                    <div>

                        <h3>
                            ${channel}
                        </h3>

                        <p>
                            1.2M subscribers
                        </p>

                    </div>

                    <button class="subscribe-btn">
                        Subscribe
                    </button>

                </div>


                <div class="actions">

                    <button class="like-btn">
                        <i class="fa-regular fa-thumbs-up"></i>
                        <span>Like</span>
                    </button>

                    <button>
                        <i class="fa-solid fa-share"></i>
                        Share
                    </button>

                    <button>
                        <i class="fa-solid fa-download"></i>
                        Download
                    </button>

                </div>

            </div>


            <div class="description">

                <strong>
                    1.2M views • 2 days ago
                </strong>

                <p>
                    This is a YouTube clone watch page.
                    You can extend this section with
                    real video data, descriptions,
                    comments and recommendations.
                </p>

            </div>


            <button class="back-home">
                ← Back to Home
            </button>

        </div>

    `;


    // Subscribe

    const subscribeBtn =
        document.querySelector(".subscribe-btn");


    subscribeBtn.addEventListener("click", () => {

        if (
            subscribeBtn.textContent ===
            "Subscribe"
        ) {

            subscribeBtn.textContent =
                "Subscribed";

            subscribeBtn.style.background =
                "#eee";

            subscribeBtn.style.color =
                "#000";

        } else {

            subscribeBtn.textContent =
                "Subscribe";

            subscribeBtn.style.background =
                "#0f0f0f";

            subscribeBtn.style.color =
                "#fff";

        }

    });


    // Like

    const likeBtn =
        document.querySelector(".like-btn");


    likeBtn.addEventListener("click", () => {

        likeBtn.classList.toggle("liked");

        if (
            likeBtn.classList.contains("liked")
        ) {

            likeBtn.innerHTML = `
                <i class="fa-solid fa-thumbs-up"></i>
                <span>Liked</span>
            `;

        } else {

            likeBtn.innerHTML = `
                <i class="fa-regular fa-thumbs-up"></i>
                <span>Like</span>
            `;

        }

    });


    // Back home

    document
        .querySelector(".back-home")
        .addEventListener("click", () => {

            location.reload();

        });

}



// ==========================================
// 7. MORE BUTTON
// ==========================================

const moreButtons =
    document.querySelectorAll(".more-btn");


moreButtons.forEach(button => {

    button.addEventListener("click", (event) => {

        event.stopPropagation();


        // Remove previous menu

        document
            .querySelectorAll(".video-menu")
            .forEach(menu => menu.remove());


        const menu = document.createElement("div");

        menu.className = "video-menu";


        menu.innerHTML = `

            <div>
                <i class="fa-regular fa-clock"></i>
                Save to Watch later
            </div>

            <div>
                <i class="fa-solid fa-list"></i>
                Save to playlist
            </div>

            <div>
                <i class="fa-solid fa-ban"></i>
                Not interested
            </div>

            <div>
                <i class="fa-solid fa-flag"></i>
                Report
            </div>

        `;


        button.parentElement.appendChild(menu);


        // Menu actions

        menu.querySelectorAll("div")
            .forEach(item => {

                item.addEventListener(
                    "click",
                    () => {

                        alert(
                            item.textContent.trim()
                        );

                        menu.remove();

                    }
                );

            });

    });

});



// ==========================================
// 8. NOTIFICATION BUTTON
// ==========================================

notificationBtn.addEventListener("click", () => {

    let notificationPanel =
        document.querySelector(
            ".notification-panel"
        );


    if (notificationPanel) {

        notificationPanel.remove();

        return;

    }


    notificationPanel =
        document.createElement("div");


    notificationPanel.className =
        "notification-panel";


    notificationPanel.innerHTML = `

        <h3>Notifications</h3>

        <div class="notification">
            <strong>AI Academy</strong>
            uploaded a new video.
        </div>

        <div class="notification">
            <strong>Code World</strong>
            uploaded a new video.
        </div>

        <div class="notification">
            Your video is ready to watch.
        </div>

    `;


    document.body.appendChild(
        notificationPanel
    );

});



// ==========================================
// 9. CREATE VIDEO BUTTON
// ==========================================

createVideoBtn.addEventListener("click", () => {

    alert(
        "Create button clicked!\n\n" +
        "In a real YouTube application, " +
        "this would open the video upload page."
    );

});



// ==========================================
// 10. SEARCH CLEAR
// ==========================================

searchInput.addEventListener("input", () => {

    if (
        searchInput.value.trim() === ""
    ) {

        videoCards.forEach(card => {

            card.style.display = "block";

        });


        const noResults =
            document.querySelector(
                ".no-results"
            );


        if (noResults) {
            noResults.remove();
        }

    }

});



// ==========================================
// 11. CLOSE MENUS WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener("click", (event) => {

    if (
        !event.target.closest(".more-btn") &&
        !event.target.closest(".video-menu")
    ) {

        document
            .querySelectorAll(".video-menu")
            .forEach(menu => menu.remove());

    }

});



// ==========================================
// 12. DARK MODE
// ==========================================

// Double-click profile to toggle dark mode

const profile =
    document.querySelector(".profile");


profile.addEventListener("dblclick", () => {

    document.body.classList.toggle(
        "dark-mode"
    );


    const darkMode =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "darkMode",
        darkMode
    );

});



// ==========================================
// 13. REMEMBER DARK MODE
// ==========================================

const savedDarkMode =
    localStorage.getItem("darkMode");


if (savedDarkMode === "true") {

    document.body.classList.add(
        "dark-mode"
    );

}



// ==========================================
// 14. SIDE ITEM ACTIVE STATE
// ==========================================

const sideItems =
    document.querySelectorAll(".side-item");


sideItems.forEach(item => {

    item.addEventListener("click", () => {

        sideItems.forEach(side => {
            side.classList.remove("active");
        });


        item.classList.add("active");

    });

});



// ==========================================
// 15. INITIAL MESSAGE
// ==========================================

console.log(
    "YouTube Clone JavaScript Loaded Successfully 🚀"
);