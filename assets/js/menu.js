document.addEventListener("DOMContentLoaded", function() {
    const menuHTML = `
        <div class="inner">
            <h2>Menu</h2>
            <ul>
                <li><a href="../../Portfolio-Website/index.html">Home</a></li>
                <li><a href="../../Portfolio-Website/AppsHome.html">Apps</a></li>
                <li><a href="../../Portfolio-Website/GamesHome.html">Games</a></li>
            </ul>
            <div class="menuLinks" style="margin-top: 60vh;">
                <h2>
                    <img src="images/Misc/Mail.png" width="35" height="35" alt="" />
                    <a href="mailto:c-forsyth02@sky.com">Email</a>
                </h2>
                <h2>
                    <img src="../../images/LinkedIn/LI-In-Bug.png" width="35" height="30" alt="" />
                    <a href="https://www.linkedin.com/feed/">LinkedIn</a>
                </h2>
                <h2>
                    <img src="../../images/GitHub/github-mark.png" width="30" height="30" alt="" />
                    <a href="https://github.com/Ghosthi1">GitHub</a>
                </h2>
                <h2>
                    <img src="../../images/ItchIo/Itch.svg" width="35" height="30" alt="" />
                    <a href="https://ghosthi.itch.io">itch.io</a>
                </h2>
            </div>
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