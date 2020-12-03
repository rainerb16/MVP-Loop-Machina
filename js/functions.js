// ClICK ANYWHERE TO START AUDIO AS PER GOOGLE AUTOPLAY POLICY
function mouseClicked() {
    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
    }
}


// CREATING PIANO ROLL FOR DRUM PROGRAMMING
function drawGrid() {
    background(85);
    stroke("white");
    strokeWeight(1);
    fill(0, 0, 255);
    for (let i = 0; i < beatGrid + 1; i++) {
        // X AXIS
        line(i * cellWidth, 0, i * cellWidth, height);
    }
    for (let i = 0; i < 10; i++) {
        // Y AXIS
        line(0, (i * height) / 9, width, (i * height) / 9);
    }
    noStroke();
    for (let i = 0; i < beatGrid; i++) {
        // HI HAT PATTERN ON GRID
        if (hhPattern[i] === 1) {
            ellipse(i * cellWidth + 0.5 * cellWidth, height / 18.5, 20);
        }

        // OPEN HAT PATTERN ON GRID
        if (openHatPattern[i] === 1) {
            ellipse(i * cellWidth + 0.5 * cellWidth, height / 6.0, 20);
        }

        // RIDE PATTERN ON GRID
        if (ridePattern[i] === 1) {
            ellipse(i * cellWidth + 0.5 * cellWidth, height / 3.6, 20);
        }

        // CLAP PATTERN ON GRID
        if (clapPattern[i] === 1) {
            ellipse(i * cellWidth + 0.5 * cellWidth, height / 2.57, 20);
        }

        // PERC PATTERN ON GRID
        if (percPattern[i] === 1) {
            ellipse(i * cellWidth + 0.5 * cellWidth, height / 1.99, 20);
        }

        // SNARE PATTERN ON GRID
        if (snarePattern[i] === 1) {
            ellipse(i * cellWidth + 0.5 * cellWidth, height / 1.62, 20);
        }

        // SYNTH ONE PATTERN ON GRID
        if (synthOnePattern[i] === 1) {
            ellipse(i * cellWidth + 0.5 * cellWidth, height / 1.38, 20);
        }

        // SYNTH THREE PATTERN ON GRID
        if (synthThreePattern[i] === 1) {
            ellipse(i * cellWidth + 0.5 * cellWidth, height / 1.20, 20);
        }

        // KICK PATTERN ON GRID
        if (kPattern[i] === 1) {
            ellipse(i * cellWidth + 0.5 * cellWidth, height / 1.06, 20);
        }
    }
}


// CALL PLAYHEAD
function sequence(time, beatGrid) {
    setTimeout(() => {
        drawGrid();
        playHead(beatGrid);
    }, time * 1000);
}

// DRAW PLAYHEAD
function playHead(beatGrid) {
    stroke(0, 0, 255);
    fill(0, 0, 255, 20);
    rect((beatGrid - 1) * cellWidth, 0, cellWidth, height);
}



// SETTING SPACEBAR AS PLAY BUTTON
// function keyPressed() {
//     if (key === " ") {
//     if (
//         hiHat.isLoaded() &&
//         kick.isLoaded() &&
//         clap.isLoaded() &&
//         perc.isLoaded() &&
//         snare.isLoaded()
//     ) {
//         if (!drums.isPlaying) {
//             drums.loop();
//         } else {
//             drums.pause();
//         }
//     } else {
//         console.log("Oops, please wait while sounds load...");
//     }
// }