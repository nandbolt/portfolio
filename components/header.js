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
        const generateTopNavHTML = (links) => {
            let text = "";
            for (let i = 0; i < links.length; i++)
            {
                text += `<a href="${links[i].href}" class="topnav-button" id="topnav-${i.toString()}">${links[i].text}</a>`;
            }
            return text;
        }
        const generateSubNavHTML = (links) => {
            let text = "";
            for (let i = 0; i < links.length; i++)
            {
                text += `<a href="${links[i].href}" class="subnav-button" id="subnav-${i.toString()}">${links[i].text}</a>`;
            }
            return text;
        }

        // Set HTML
        this.innerHTML = `
            <header>
                <div class="topheader">
                    <div class="toptitle">
                        <a href="/portfolio/index.html"><img class="nblogo" src="/portfolio/images/nb-logo-1.png" /></a>
                        <h1>Alexander Wilson</h1>
                        <h3>( Software Engineer | Game Designer )</h3>
                    </div>
                    ${topNavLinks.length ? `<div class="topnav">${generateTopNavHTML(topNavLinks)}</div>` : ""}
                    ${subNavLinks.length ? `<div class="subtopnav">${generateSubNavHTML(subNavLinks)}</div>` : ""}
                </div>
            </header>
        `;
    }
}

customElements.define("header-component", HeaderComponent);