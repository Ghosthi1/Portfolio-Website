document.addEventListener("DOMContentLoaded", function() {
    const menuHTML = `
        <div class="inner">
            <h2>Menu</h2>
            <ul>
                <li><a href="Homepage.html">Home</a></li>
                <li><a href="Apps.html">Apps</a></li>
                <li><a href="Games.html">Games</a></li>
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