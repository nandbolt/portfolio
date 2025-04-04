class SkillsShowcaseComponent extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {
        // Get info
        const title = this.getAttribute("title");

        // Get skill list
        const skillData = this.getAttribute("skills");

        // Convert JSON strings to arrays
        const skillList = skillData ? JSON.parse(skillData) : [];

        // Generate HTML
        const generateSkillsHTML = (skills) => {
            let text = "";
            for (let i = 0; i < skills.length; i++)
            {
                text += `<li>${skills[i].skill}</li>`;
            }
            return text;
        }
        const generateSkillBarsHTML = (skills) => {
            let text = "";
            for (let i = 0; i < skills.length; i++)
            {
                text += `<li><div class="${(skillList[i].level == 3) ? "skill-bar-3" : (skillList[i].level == 2) ? "skill-bar-2" : "skill-bar-1"}">${(skillList[i].level == 3) ? '<i class="material-icons">bolt</i><i class="material-icons">bolt</i><i class="material-icons">bolt</i>' : (skillList[i].level == 2) ? '<i class="material-icons">bolt</i><i class="material-icons">bolt</i>' : '<i class="material-icons">bolt</i>'}</div></li>`;
            }
            return text;
        }

        // Set info
        this.innerHTML = `
            <div class="skills-showcase">
                <h3>${title}</h3>
                <div class="horizontal-container">
                    <div class="skills-showcase-text-container">
                        <ul class="skill-list">
                            ${skillList.length ? `${generateSkillsHTML(skillList)}` : ""}
                        </ul>
                    </div>
                    <div class="skillbars-showcase-text-container">
                        <ul class="skillbar-list">
                            ${skillList.length ? `${generateSkillBarsHTML(skillList)}` : ""}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("skills-showcase-component", SkillsShowcaseComponent);