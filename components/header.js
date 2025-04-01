class HeaderComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        const topNavData = this.getAttribute("top-nav");
        const subNavData = this.getAttribute("sub-nav");

        // Convert JSON strings to arrays
        const topNavLinks = topNavData ? JSON.parse(topNavData) : [];
        const subNavLinks = subNavData ? JSON.parse(subNavData) : [];

        // Generate HTML
        const generateNavHTML = (links) =>
            links.map(link => `<a href="${link.href}">${link.text}</a>`).join("");

        this.innerHTML = `
            <header>
                <div class="topheader">
                    <div class="toptitle">
                        <h1>Alexander Wilson</h1>
                        <h3>( Software Engineer | Game Designer )</h3>
                    </div>
                    ${topNavLinks.length ? `<div class="topnav">${generateNavHTML(topNavLinks)}</div>` : ""}
                    ${subNavLinks.length ? `<div class="subtopnav">${generateNavHTML(subNavLinks)}</div>` : ""}
                </div>
            </header>
        `;
    }
}

customElements.define("header-component", HeaderComponent);