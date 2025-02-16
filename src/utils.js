import { dialogueTree } from "./constants";


// Function to display the dialogue in a game-like typewriter effect
export function startDialogue(dialogueKey, onDisplayEnd) {
    // Gets the UI elements
    const dialogueUI = document.getElementById("textbox-container");
    const dialogue = document.getElementById("dialogue");
    const optionsContainer = document.getElementById("options-container");

    // Get dialogue data from the constants
    const dialogueData = dialogueTree[dialogueKey];

    // Makes te dialogue box visible
    dialogueUI.style.display = "block";

    let index = 0;
    let currentText = "";

    // Hides the options container
    optionsContainer.classList.remove("show");

    // Interval function to display the text one character at a time
    const intervalRef = setInterval(() => {
        if (index < dialogueData.text.length) {
            // Adds the next character to the text
            currentText += dialogueData.text[index];
            // Updates the dialogue box with the new text
            dialogue.innerHTML = currentText;
            // Moves to the next character in the text
            index++;
            // Exits the current iteration and schedules the next one
            return;
        }

        // Stops the interval when the text is fully displayed
        clearInterval(intervalRef);

        // Clears the previous options
        optionsContainer.innerHTML = ""; 
        // Shows options container with animation
        optionsContainer.classList.add("show");

        // Creates buttons for each dialogue option, attaches click handlers to trigger the next dialogue step,  
        // and appends them to the options container.
        dialogueData.options.forEach(option => {
            const optionBtn = document.createElement("button");
            optionBtn.textContent = option.text;
            optionBtn.classList.add("dialogue-option");
            if(option.next){
                optionBtn.onclick = () => startDialogue(option.next, onDisplayEnd);
            } else if (option.link) {
                optionBtn.onclick = () => window.open(option.link, '_blank');
            }
            optionsContainer.appendChild(optionBtn);
        });

    }, 5);

    // Gets the close button
    const closeBtn = document.getElementById("close");

    // Handles closing the dialogue box
    function onCloseBtnClick() {
        // Calls the callback function to set the isInDialogue flag to false
        onDisplayEnd();
        // Hides the dialogue box
        dialogueUI.style.display = "none";
        // Clears the contents
        dialogue.innerHTML = "";
        optionsContainer.innerHTML = "";
        // Removes the show class making hiding it again
        optionsContainer.classList.remove("show")
        // Stops the typewriter effect if still running
        clearInterval(intervalRef);
        // Removes the event listener to prevent memory leaks
        closeBtn.removeEventListener("click", onCloseBtnClick);
    }

    // Attaches event listener to the close button
    closeBtn.addEventListener("click", onCloseBtnClick);
}

// Adjusts the camera scale based on screen aspect ration
export function setCamScale(k) {
    // Calculates the aspect ratio of the screen
    const resizeFactor = k.width() / k.height();
    // If the screen is wider than tall, uses normal scale
    if (resizeFactor > 1) {
        k.camScale(k.vec2(1));
        return;
    }

    // If the screen us taller than wide, increaes te scale  for better visibility
    k.camScale(k.vec2(1.5));
}