document.addEventListener("DOMContentLoaded", function() {
    const menuHTML = `
        <div class="inner">
            <h2>Menu</h2>
            <ul>
                <li><a href="Homepage.html">Home</a></li>
                <li><a href="Html/Apps/AppsHome.html">Apps</a></li>
                <li><a href="Html/Games/GamesHome.html">Games</a></li>
            </ul>
        </div>
    `;
    document.getElementById("menu").innerHTML = menuHTML;

    // Dropdown functionality
    document.querySelectorAll('.dropdown-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('show');
        });
    });
});