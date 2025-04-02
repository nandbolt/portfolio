// Highlight nav buttons
document.addEventListener("DOMContentLoaded", () => {
    // Top nav (page)
    let pageIdx = document.getElementById("navHighlighter").getAttribute("pageIdx");
    let element = document.getElementById("topnav-" + pageIdx);
    if (element) element.classList.add("active");

    // Sub nav (scroll)
    const sections = document.querySelectorAll("section");
    const subnavList = document.getElementsByClassName("subnav-button");
    window.addEventListener("scroll", () => {
        const y = pageYOffset + 210;
        let buttonActivated = false;
        for (let i = 0; i < sections.length; i++)
        {
            const sectionTop = sections[i].offsetTop;
            const sectionHeight = sections[i].clientHeight;
            if ((i+1) < subnavList.length)
            {
                if (!buttonActivated && y >= sectionTop && y <= (sectionTop + sectionHeight))
                {
                    buttonActivated = true;
                    subnavList[i+1].classList.add("active");
                }
                else 
                {
                    // Deactivate button
                    subnavList[i+1].classList.remove("active");
                }
            }
        }

        // Check highlight top
        if (!buttonActivated) subnavList[0].classList.add("active");
        else subnavList[0].classList.remove("active");
    });

    // Init top highlight
    subnavList[0].classList.add("active");
});