class FooterComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        // Set HTML
        this.innerHTML = `
            <footer>
                <p class="inline">Made with <i class="material-icons">bolt</i><i class="material-icons">add</i>&nbsp;<i class="material-icons">computer</i> &nbsp; by Alexander Wilson &nbsp; &nbsp; &nbsp;<i class="material-icons">copyright</i> 2025 &nbsp; &nbsp; &nbsp; ( <a href="files/resume.pdf">Resume</a> | <a href="https://www.linkedin.com/in/alexander-wilson-b5097916a/">LinkedIn</a> | <a href="https://discordapp.com/users/389247859578634241">Discord</a> | <a href="mailto:nandboltgames@gmail.com">Email</a> )</p>
            </footer>
        `;
    }
}

customElements.define("footer-component", FooterComponent);