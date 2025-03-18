const bufferSpeed = 200;
const game = {
    isInit : false,
    world : undefined,
    player : undefined,
    init : function(world, player)
    {
        this.world = world;
        this.player = player;
        this.world.player = player;
        this.player.world = world;
        isInit = true;

        // Generate
        world.generate();
        world.draw();
    },
    restart : function()
    {
        // Reset world
        this.world.clear();
        this.world.generate();

        // Reset player
        this.player.reset();

        // Render
        this.world.draw();
    }
}
const world = {
    title : "D O N T C R A S H",
    width : 9,
    height : 9,
    objChance : 0.3,
    grid : new Array(9 * 9).fill("."),
    player : undefined,
    score : 0,
    highscore : 0,
    maxScoreLength : 7,
    generate : function()
    {
        // Setup anchors
        let centerX = Math.floor(this.width * 0.5);
        let centerY = Math.floor(this.height * 0.5);

        // Loop through grid
        for (let j = 0; j < this.height; j++)
        {
            for (let i = 0; i < this.width; i++)
            {
                // Get index
                let idx = j * this.width + i;

                // Turn buffer + player
                if (i > (centerX - 3) && i < (centerX + 3) &&
                    j > (centerY - 2) && j < (centerY + 2))
                {
                    if (i == centerX && j == centerY) this.grid[idx] = "A";
                    else this.grid[idx] = ".";
                    continue;
                }

                // Choose level obj or empty space
                if (Math.random() < this.objChance) this.grid[idx] = "#";
                else this.grid[idx] = ".";
            }
        }

        // Console
        console.log("New world created.");
    },
    clear : function()
    {
        // Clear world
        for (let i = 0; i < this.grid.length; i++)
        {
            this.grid[i] = ".";
        }

        // Clear variables
        this.title = "D O N T C R A S H";
        this.score = 0;
    },
    moveForward : function()
    {
        // Move camera up (or move everything down)
        for (let j = this.height - 2; j >= 0; j--)
        {
            for (let i = 0; i < this.width; i++)
            {
                // Move value
                let idx = j * this.width + i;
                if (this.grid[idx] == "*") this.grid[idx + this.width] = "%";
                else if (this.grid[idx] == "%") this.grid[idx + this.width] = "O";
                else if (this.grid[idx] == "O") this.grid[idx + this.width] = "#";
                else this.grid[idx + this.width] = this.grid[idx];
            }
        }

        // Try to move player
        let centerIdx = Math.floor(this.grid.length * 0.5);
        if (this.grid[centerIdx] == "#")
        {
            // CRASH!
            this.grid[centerIdx] = "X";
            this.player.crashed = true;
            this.title = "- C R A S H E D -";
            if (this.score > this.highscore) this.highscore = this.score;
            console.log("Crashed!");
        }
        else
        {
            // SAFE!
            this.grid[centerIdx] = "A";
            this.score += 1;
            console.log("Vroom...");
        }
        this.grid[centerIdx + this.width] = "*";

        // Generate top
        for (let i = 0; i < this.width; i++)
        {
            // Choose level obj or empty space
            if (Math.random() < this.objChance) this.grid[i] = "#";
            else this.grid[i] = ".";
        }

        // Update display
        this.draw();
    },
    rotateRight : function()
    {
        // Map grid to a temp rotated grid
        let rotatedGrid = new Array(this.grid.length);
        for (let j = 0; j < this.height; j++)
        {
            for (let i = 0; i < this.width; i++)
            {
                // Get index
                let idx = j * this.width + i;

                // Get vector (player = origin)
                let hw = Math.floor(this.width * 0.5);
                let hh = Math.floor(this.height * 0.5);
                let vx = i - hw;
                let vy = j - hh;

                // Get new index by rotation
                let newIdx = Math.round((vx + hh) * this.width + (-vy + hw))

                // Set rotation grid
                rotatedGrid[newIdx] = this.grid[idx];
            }
        }

        // Overwrite grid with rotated
        for (let i = 0; i < this.grid.length; i++)
        {
            this.grid[i] = rotatedGrid[i];
        }

        // Render
        this.draw();
    },
    rotateLeft : function()
    {
        // Map grid to a temp rotated grid
        let rotatedGrid = new Array(this.grid.length);
        for (let j = 0; j < this.height; j++)
        {
            for (let i = 0; i < this.width; i++)
            {
                // Get index
                let idx = j * this.width + i;

                // Get vector (player = origin)
                let hw = Math.floor(this.width * 0.5);
                let hh = Math.floor(this.height * 0.5);
                let vx = i - hw;
                let vy = j - hh;

                // Get new index by rotation
                let newIdx = Math.round((-vx + hh) * this.width + (vy + hw))

                // Set rotation grid
                rotatedGrid[newIdx] = this.grid[idx];
            }
        }

        // Overwrite grid with rotated
        for (let i = 0; i < this.grid.length; i++)
        {
            this.grid[i] = rotatedGrid[i];
        }

        // Render
        this.draw();
    },
    draw : function()
    {
        let worldString = "";

        // Title
        worldString += "- - - - - - - - - -<br>";
        worldString += "| " + this.title + " |<br>";
        worldString += "| - - - - - - - - - |<br>";

        // Scores
        let highString = this.highscore.toString();
        while (highString.length < this.maxScoreLength)
        {
            highString += "-";
        }
        highString = highString.split("").join(" ");
        worldString += "| H : " + highString + " |<br>";
        let scoreString = this.score.toString();
        while (scoreString.length < this.maxScoreLength)
        {
            scoreString += "-";
        }
        scoreString = scoreString.split("").join(" ");
        worldString += "| S : " + scoreString + " |<br>";
        worldString += "| - - - - - - - - - |<br>";

        // World
        for (let j = 0; j < this.height; j++)
        {
            worldString += "| ";
            for (let i = 0; i < this.width; i++)
            {
                let idx = j * this.width + i;
                worldString += this.grid[idx] + " ";
            }
            worldString += "|<br>";
        }
        worldString += "| - - - - - - - - - |<br>";
        worldString += "- - - - - - - - - -<br>";

        // Add color
        worldString = worldString.replaceAll("#", "<span style=\"color: brown\">#</span>");
        worldString = worldString.replaceAll(".", "<span style=\"color: green\">.</span>");
        worldString = worldString.replaceAll("A", "<span style=\"color: aqua\">A</span>");
        worldString = worldString.replaceAll("X", "<span style=\"color: red\">X</span>");
        worldString = worldString.replaceAll("*", "<span style=\"color: lime\">*</span>");
        worldString = worldString.replaceAll("%", "<span style=\"color: yellow\">%</span>");
        worldString = worldString.replaceAll("O", "<span style=\"color: orange\">O</span>");
        for (let i = 0; i < 10; i++)
        {
            let numString = i.toString();
            worldString = worldString.replaceAll(numString, "<span style=\"color: yellow\">" + numString + "</span>");
        }

        // Set HTML
        document.getElementById("world").innerHTML = worldString;
    },
}
const player = {
    world : undefined,
    crashed : false,
    inputQueued : false,
    turnRight : function()
    {
        // Return if input queued
        if (this.inputQueued || this.crashed) return;

        // Move forward
        this.world.moveForward();

        // Return if crashed
        if (this.crashed) return;

        // Queue inputs (rotate + forward)
        window.setTimeout(queueLeftRotation, bufferSpeed);
        this.inputQueued = true;
        console.log("Starting right turn...");
    },
    turnLeft : function()
    {
        // Return if input queued
        if (this.inputQueued || this.crashed) return;

        // Move forward
        this.world.moveForward();
        
        // Return if crashed
        if (this.crashed) return;

        // Queue inputs (rotate + forward)
        window.setTimeout(queueRightRotation, bufferSpeed);
        this.inputQueued = true;
        console.log("Starting left turn...");
    },
    keepForward : function()
    {
        // Return if input queued
        if (this.inputQueued || this.crashed) return;

        // Move forward
        this.world.moveForward();
    },
    reset : function()
    {
        this.crashed = false;
        this.inputQueued = false;        
    },
}

function queueRightRotation()
{
    world.rotateRight();
    window.setTimeout(queueMoveForward, bufferSpeed);
    console.log("Ending right turn...");
}

function queueLeftRotation()
{
    world.rotateLeft();
    window.setTimeout(queueMoveForward, bufferSpeed);
    console.log("Ending left turn...");
}

function queueMoveForward()
{
    world.moveForward();
    player.inputQueued = false;
    console.log("Turn complete!");
}

// Start game
game.init(world, player);