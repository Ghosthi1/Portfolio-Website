document.addEventListener("DOMContentLoaded", function() {
    const splashData = [
        {
            img: "images/Apps/TableTopTracker/TableTopTracker.jpg",
            link: "TableTopTracker.html",
            caption: "TableTopTracker"
        },
        {
            img: "images/Games/FlappyBird/flappySplash.png",
            link: "Html/Games/FlappyBird.html",
            caption: "FlappyBird"
        },
        {
            img: "images/Games/BreakOut/BreakOutSplash.png",
            link: "Html/Games/BreakOut.html",
            caption: "BreakOut"
        },
        {
            img: "images/Games/TickTackToe/TickTackToe.jpg",
            link: "Html/Games/TickTackToe.html",
            caption: "TickTackToe"
        },
        {
            img: "images/Misc/ColourSplash/pic01.jpg"
        },
                {
            img: "images/Misc/ColourSplash/pic02.jpg"
        }
    ];

    // Use splash-bg as the container instead of splash-page
    const splashBg = document.getElementById("splash-bg");
    if (!splashBg) return;

    // Create horizontal scroll container
    const scrollContainer = document.createElement("div");
    scrollContainer.style.display = "flex";
    scrollContainer.style.overflowX = "auto";
    scrollContainer.style.height = "100%";
    scrollContainer.style.alignItems = "center";
    scrollContainer.style.gap = "0";
    scrollContainer.style.padding = "1em 0";
    scrollContainer.style.scrollBehavior = "auto"; // Prevent smooth scroll for instant jump
    // Hide scrollbar (cross-browser)
    scrollContainer.style.msOverflowStyle = "none"; // IE and Edge
    scrollContainer.style.scrollbarWidth = "none"; // Firefox

    // Helper to create splash items
    function createSplashItems(data) {
        return data.map((item, idx) => {
            // Use a div instead of an anchor to remove links
            const splashItem = document.createElement("div");
            splashItem.style.display = "block";
            splashItem.style.position = "relative";
            splashItem.style.minWidth = "45%";
            splashItem.style.maxWidth = "45%";
            splashItem.style.height = "100%";
            splashItem.style.marginLeft = idx === 0 ? "0" : "-60px";
            splashItem.style.background = `url('${item.img}') center center / cover no-repeat`;
            splashItem.style.borderRadius = "2%";
            splashItem.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
            splashItem.style.transition = "transform 0.7s, z-index 0.5s, opacity 1s";
            splashItem.style.zIndex = 1;
            splashItem.style.opacity = "0.5";
            return splashItem;
        });
    }

    // Add original items
    const originalItems = createSplashItems(splashData);
    originalItems.forEach(item => scrollContainer.appendChild(item));

    // Clone items for seamless looping
    const cloneItems = createSplashItems(splashData);
    cloneItems.forEach(item => scrollContainer.appendChild(item));

    splashBg.appendChild(scrollContainer);

    // --- Pick a random image to start with ---
    // Each item is 700px wide, minus 60px overlap for each after the first
    const itemWidth = 700 - 60; // effective width per item after overlap
    const randomIndex = Math.floor(Math.random() * splashData.length);
    // Scroll so the random image is centered
    setTimeout(() => {
        scrollContainer.scrollLeft = randomIndex * itemWidth;
        updateCenterOpacity();
    }, 0);

    // Hide scrollbar for Webkit browsers (Chrome, Safari, Opera)
    scrollContainer.style.overflow = "auto";
    scrollContainer.style.setProperty("overflow-x", "auto");
    scrollContainer.style.setProperty("overflow-y", "hidden");
    scrollContainer.style.setProperty("scrollbar-width", "none");
    scrollContainer.style.setProperty("-ms-overflow-style", "none");
    scrollContainer.classList.add("hide-scrollbar");

    // Helper to update opacity based on center
    function updateCenterOpacity() {
        const containerRect = scrollContainer.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        let closest = null;
        let closestDist = Infinity;
        let closestIdx = -1;

        Array.from(scrollContainer.children).forEach((child, idx) => {
            const rect = child.getBoundingClientRect();
            const childCenter = rect.left + rect.width / 2;
            const dist = Math.abs(childCenter - containerCenter);
            if (dist < closestDist) {
                closestDist = dist;
                closest = child;
                closestIdx = idx % splashData.length; // modulo for clones
            }
        });

        Array.from(scrollContainer.children).forEach(child => {
            if (child === closest) {
                child.style.opacity = "1";
                child.style.zIndex = 10;
                child.style.transform = "scale(1.05)";
            } else {
                child.style.opacity = "0.2";
                child.style.zIndex = 1;
                child.style.transform = "scale(1)";
            }
        });

    }

    // Calculate the width of one full set of items (for looping)
    function getItemsWidth() {
        let width = 0;
        for (let i = 0; i < splashData.length; i++) {
            width += scrollContainer.children[i].offsetWidth;
            if (i > 0) width -= 60; // account for negative margin overlap
        }
        return width;
    }

    // Auto-scroll functionality with infinite loop
    let scrollDirection = 1;
    let autoScroll;
    let itemsWidth = 0;

    function startAutoScroll() {
        itemsWidth = getItemsWidth();
        autoScroll = setInterval(() => {
            scrollContainer.scrollLeft += scrollDirection;
            // If we've scrolled past the first set, reset to the start of the original set
            if (scrollContainer.scrollLeft >= itemsWidth) {
                scrollContainer.scrollLeft -= itemsWidth;
            }
            // If we've scrolled before the start, jump to the end of the original set
            if (scrollContainer.scrollLeft <= 0) {
                scrollContainer.scrollLeft += itemsWidth;
            }
            updateCenterOpacity();
        }, 0);
    }

    function stopAutoScroll() {
        clearInterval(autoScroll);
    }

    // Update on scroll and resize
    scrollContainer.addEventListener("scroll", updateCenterOpacity);
    window.addEventListener("resize", () => {
        itemsWidth = getItemsWidth();
        updateCenterOpacity();
    });

    startAutoScroll();
    updateCenterOpacity();
});