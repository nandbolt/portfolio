class ArticleShowcaseComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        // Get info
        const mainImage = this.getAttribute("main-image");
        const title = this.getAttribute("title");
        const company = this.getAttribute("company");
        const role = this.getAttribute("role");
        const tech = this.getAttribute("tech");
        const teamSize = this.getAttribute("teamSize");
        const time = this.getAttribute("time");
        const status = this.getAttribute("status");
        const description = this.getAttribute("desc");
        const projectLink = this.getAttribute("project-link");

        // Set info
        this.innerHTML = `
            <div class="showcase">
                <img src="${mainImage}" alt="Gameplay of ${title}." class="scaleable"/>
                <h3><a href="${projectLink}">${title}</a></h3>
                <i class="material-icons">apartment</i><p class="inline">${company}</p>
                <i class="material-icons">work</i><p class="inline">${role}</p>
                <i class="material-icons">computer</i><p class="inline">${tech}</p>
                <i class="material-icons">groups</i><p class="inline">${teamSize}</p>
                <i class="material-icons">schedule</i><p class="inline">${time}</p>
                <i class="material-icons">sync</i><p class="inline">${status}</p>
                <div class="showcase-text-container">
                    <p>${description}</p>
                </div>
            </div>
        `;
    }
}

customElements.define("showcase-component", ShowcaseComponent);