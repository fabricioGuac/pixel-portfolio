import { scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { setCamScale, startDialogue } from "./utils";

// Preload slow Render servers
const urls = [
    "https://tumorido-fittrack-docker.onrender.com/",
    "https://book-api-refactor-graphql.onrender.com/"
  ];
  
  Promise.all(urls.map(url => fetch(url, { mode: "no-cors" }).catch(() => {})));

// Loads the main spritesheet
k.loadSprite("spritesheet", "./spritesheet.png", {
    // Defines the number of  horizontal frames in the spritesheet
    sliceX: 39,
    // Defines the number of  vertical frames in the spritesheet
    sliceY: 31,
    // Defines the animations by mapping them to specific frames in the spritesheet
    anims: {
        // Idle frame of the player facing down
        "idle-down": 936,
        // Walking animation facing down looping at a rate of 8 frames per second
        "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
        // Idle frame of the player facing sideways
        "idle-side": 975,
        // Walking animation sideways down looping at a rate of 8 frames per second
        "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
        // Idle frame of the player facing up
        "idle-up": 1014,
        // Walking animation facing up looping at a rate of 8 frames per second
        "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
        // Idle npc animation looping at a rate of 1.5 frames per second
        "idle-npc": { from: 784, to: 785, loop: true, speed: 1.5 },
        // Coin animation
        "coin": { from: 969, to: 974, loop: true, speed: 4 },
    },
});

// Loads the custom map image as a sprite
k.loadSprite("map", "./map.png");

// Loads the coin sound effect
k.loadSound("coinPickup", "./coinPickup.mp3");

// Sets the background color of the game scene to a dark purple shade
k.setBackground(k.Color.fromHex("#121029"));

// Defines the main scene for kaboom
k.scene("main", async () => {
    // Fetches and parses the json map data
    const mapData = await (await fetch("./map.json")).json();
    // Extracts the layers from the parsed map data
    const layers = mapData.layers;

    // Adds the map to the scene at position 0,0 and scales it using the predefined scale factor
    const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);


    // Creates the player object
    const player = k.make([
        // Renders the default idle frame for the player facing up
        k.sprite("spritesheet", { anim: "idle-up" }),
        // Defines the colission area of the player
        k.area({
            // Adjusts collision box to fit the player sprite
            shape: new k.Rect(k.vec2(0, 3), 10, 10),
        }),
        // Enables physics properties and allows interactions with solid objects
        k.body(),
        // Sets the anchor to the center so that trasnformations happen from the center
        k.anchor("center"),
        // Initializes the position for later modification
        k.pos(),
        // Scales the object to the constant scale factor
        k.scale(scaleFactor),
        // Custom fields to trak player state
        {
            // Defines the movement speed in pixels per second
            speed: 250,
            // Sets the initial facing  direction of the player
            direction: "up",
            // Flag to restrict movements when in dialogue
            isInDialogue: false,
        },
        // Assigns the tag "player" to the object for easy indentification
        "player",
    ]);

    // Creates the NPC object
    const npc = k.make([
        // Renders the NPC's idle animation
        k.sprite("spritesheet", { anim: "idle-npc" }),
        // Scales the NPC to the constant scale factor
        k.scale(scaleFactor),
        // Assigns the tag "npc" to the object for easy indentification
        "npc",
    ]);


    // Defines coin pickup beheavior
    player.onCollide("coin", (coin) => {
        k.destroy(coin); // Removes the coin
        k.play("coinPickup", { volume: 0.6, speed: 0.5 }); // Plays sound effect to 60% of the volume and half the speed
    });


    // Iterates over each layer in the map data
    for (const layer of layers) {
        // If the layer name is "boundaies" Iterates over each of its objects
        if (layer.name === "boundaies") {
            for (const boundary of layer.objects) {
                // Adds a bodundary object to the map
                map.add([
                    // Defines the collision area of the boundary
                    k.area({
                        // Creates a rectangular collision box with the same height and width as the boundary
                        shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
                    }),
                    // Makes the boundary a static body
                    k.body({ isStatic: true }),
                    // Sets the boundary at the specified coordinates in the map
                    k.pos(boundary.x, boundary.y),
                    // Assigns the boundary name as the tag to the object for easy indentification in collision
                    boundary.name,
                ]);

                // If the boundary represents the desk, adds interaction behavior
                if (boundary.name === "desk") {
                    player.onCollide("desk", () => {
                        // Prevents player movement during dialogue leveraging the isInDialohue flag
                        player.isInDialogue = true;
                        // Calls the startDialogue utility function
                        startDialogue("start", () => (player.isInDialogue = false));
                    });
                }
            }
        }
        // If the layer's name is "spawnpoint" iterates over each of is entities
        if (layer.name === "spawnpoint") {
            for (const entity of layer.objects) {
                // If the entity represents the player, sets its position and scales it to match the map
                if (entity.name === "player") {
                    player.pos = k.vec2(
                        (map.pos.x + entity.x) * scaleFactor,
                        (map.pos.y + entity.y) * scaleFactor
                    );
                    // Adds the player object to the kaboom scene
                    k.add(player);
                }

                // If the entity represents the NPC, sets its position and scales it to match the map
                else if (entity.name === "npc") {
                    npc.pos = k.vec2(
                        (map.pos.x + entity.x - 5) * scaleFactor, // Offset for better positioning
                        (map.pos.y + entity.y - 11) * scaleFactor
                    );
                    // Adds the NPC object to the kaboom scene
                    k.add(npc);
                }

                // If the entity represents the coins, creates them and sets them in the scene
                else if (entity.name === "coin") {
                    // Creates a coin object
                    const coin = k.make([
                        k.sprite("spritesheet", { anim: "coin" }), // Plays coin animation
                        k.area(), // Defines collision area
                        // Sets the coins position and scales it to match the map
                        k.pos(
                            (map.pos.x + entity.x) * scaleFactor,
                            (map.pos.y + entity.y) * scaleFactor
                        ),
                        k.scale(scaleFactor), // Scales the coin to the constant scale factor
                        // Assigns the tag "coin" to the object for easy indentification
                        "coin",
                    ]);

                    // Adds the coin object to the scene
                    k.add(coin);
                }
            }
        }
    }

    // Utility function to scale the camera based on the screen size
    setCamScale(k);

    // Adjusts the camera scale dynamically whenever the screen is resized
    k.onResize(() => {
        setCamScale(k);
    })

    // Updates the camera position every frame to follow the playerwith an upward offset for better visibility
    k.onUpdate(() => {
        k.camPos(player.pos.x, player.pos.y - 200);
    });

    // Event listener to handle mouse clicks or touch inputs
    k.onMouseDown((mouseBtn) => {
        // Early return if the player is in dialogue or the click is not a left click
        if (mouseBtn !== "left" || player.isInDialogue) return;

        // Converts the screen mouse position to world coordinates
        const worldMousePos = k.toWorld(k.mousePos());
        // Moves the player towards the clicked position at the defined speed
        player.moveTo(worldMousePos, player.speed);

        // Calculates the angle between the player's position and the mouse click
        const mouseAngle = player.pos.angle(worldMousePos);

        // Angle thresholds to determine the direction the player should face
        const lowerBound = 50;
        const upperBound = 125;

        // If the angle is within the range for moving upwards, plays the "walk-up" animation
        if (mouseAngle > lowerBound && mouseAngle < upperBound && player.curAnim() !== "walk-up") {
            player.play("walk-up");
            player.direction = "up";
            return;
        }

        // If the angle is within the range for moving downwards, plays the "walk-down" animation
        if (mouseAngle < -lowerBound && mouseAngle > -upperBound && player.curAnim() !== "walk-down") {
            player.play("walk-down");
            player.direction = "down";
            return;
        }

        // if the angle sugests the player is moving right, plays the "walk-side" animation and ensures te sprite is facing right
        if (Math.abs(mouseAngle) > upperBound) {
            player.flipX = false;
            if (player.curAnim() !== "walk-side") {
                player.play("walk-side");
                player.direction = "right";
                return;
            }
        }

        // if the angle sugests the player is moving left, plays the "walk-side" animation and flips the sprite horizontally
        if (Math.abs(mouseAngle) < lowerBound) {
            player.flipX = true;
            if (player.curAnim() !== "walk-side") {
                player.play("walk-side");
                player.direction = "left";
                return;
            }
        }
    });

    // Stops the animation when the mouse ot touc input is released
    k.onMouseRelease(() => {
        // Plays the corresponding idel animation based on teh player's last movement direction
        if (player.direction === "up") {
            player.play("idle-up");
            return;
        }
        if (player.direction === "down") {
            player.play("idle-down");
            return;
        }
        // Defauls to idel-side for left or right movement
        player.play("idle-side");
    });

});

// Starts the game by loading the "main" scene
k.go("main");