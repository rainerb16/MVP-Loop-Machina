// SET DROPDOWN OPTIONS NEXT*********

// VARIABLE DECLARATIONS
let hiHat, kick, clap, perc, snare;
let hats, kicks, claps, percs, snares;
let hhPattern, kPattern, clapPattern, percPattern, snarePattern;
let hhPhrasing, kPhrasing, clapPhrasing, percPhrasing, snarePhrasing;
let drums;
let bpmControl;
let beatGrid;
let cellWidth;
let cnvs, label;
let mousePressed;
let seqPattern;
let playPosition;
let playButton;
let masterAmpSlider, masterAmp, vol;

// ClICK ANYWHERE TO START AUDIO AS PER GOOGLE AUTOPLAY POLICY
function mouseClicked() {
    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
    }
}

function setup() {

    cnvs = createCanvas(500, 250);
    cnvs.parent('sketch-holder');
    cnvs.mousePressed(canvasPressed);

    // BEAT GRID
    beatGrid = 16;

    // CELLS
    cellWidth = width / beatGrid;

    // PLAY POSITION
    playPosition = 0;

    // LOAD SOUNDS
    hiHat = loadSound("assets/hi_hats/001Hat.wav", () => {});
    kick = loadSound("assets/kicks/001Kick.wav", () => {});
    clap = loadSound("assets/claps/004Clap.wav", () => {});
    perc = loadSound("assets/percussion/004Perc.wav", () => {});
    snare = loadSound("assets/snares/005Snare.wav", () => {});
    
    // SOUND PATTERNS
    hhPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    kPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    clapPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    percPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    snarePattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    seqPattern = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    // SOUND TRIGGER / FUNCTION
    hhPhrasing = new p5.Phrase(
        "hiHat",
        (time) => {
            hiHat.play(time);
        },
        hhPattern
    );

    kPhrasing = new p5.Phrase(
        "kick",
        (time) => {
            kick.play(time);
        },
        kPattern
    );

    clapPhrasing = new p5.Phrase(
        "clap",
        (time) => {
            clap.play(time);
        },
        clapPattern
    );

    percPhrasing = new p5.Phrase(
        "perc",
        (time) => {
            perc.play(time);
        },
        percPattern
    );

    snarePhrasing = new p5.Phrase(
        "snare",
        (time) => {
            snare.play(time);
        },
        snarePattern
    );

    //  

    // PLAY AND PAUSE BUTTON
    playStop = createButton('Play / Stop')
    playStop.parent('play-button-holder')
        .mouseClicked(() => {
            if (
                hiHat.isLoaded() &&
                kick.isLoaded() &&
                clap.isLoaded() &&
                perc.isLoaded() &&
                snare.isLoaded()
            ) {
                if (!drums.isPlaying) {
                    drums.loop();
                    playStop.html('pause');
                } else {
                    drums.pause();
                    playStop.html('play');
                }
            } else {
                console.log("Oops, please wait while sounds load...");
            }
        })


    drums = new p5.Part();

    drums.addPhrase(hhPhrasing);
    drums.addPhrase(kPhrasing);
    drums.addPhrase(clapPhrasing);
    drums.addPhrase(percPhrasing);
    drums.addPhrase(snarePhrasing);
    drums.addPhrase('sequence', sequence, seqPattern);

    // MASTER VOLUME SLIDER
    masterAmpSlider = createSlider(0, 10, 0.01, 0.01);
    masterAmpSlider.parent('masteramp-control');
    masterAmpSlider.value(masterVolume());

    // SET BPM, CREATE SLIDER
    bpmControl = createSlider(80, 200, 119, 1);
    bpmControl.parent('bpmControl-holder');
    bpmControl.input(() => {
        drums.setBPM(bpmControl.value());
    });
    drums.setBPM("125");

    // CALLING GRID / PIANO ROLL
    drawGrid();

}

    function canvasPressed() {
        let rowClicked = floor((6 * mouseY) / height);
        let indexClicked = floor((16 * mouseX) / width);

        if (rowClicked === 0) {
            hhPattern[indexClicked] = +!hhPattern[indexClicked];

        } else if (rowClicked === 1) {
            clapPattern[indexClicked] = +!clapPattern[indexClicked];
 
        } else if (rowClicked === 3) {
            percPattern[indexClicked] = +!percPattern[indexClicked];

        } else if (rowClicked === 4) {
            snarePattern[indexClicked] = +!snarePattern[indexClicked];

        } else if (rowClicked === 5) {
            kPattern[indexClicked] = +!kPattern[indexClicked];
        }
        drawGrid();
    }


    // CREATING PIANO ROLL FOR DRUM PROGRAMMING
    function drawGrid() {
        background(51);
        stroke("white");
        strokeWeight(1);
        fill('rgba(100%, 0%, 100%, 0.75)');
        for (let i = 0; i < beatGrid + 1; i++) {
            // X AXIS
            line(i * cellWidth, 0, i * cellWidth, height);
        }
        for (let i = 0; i < 6; i++) {
            // Y AXIS
            line(0, (i * height) / 5, width, (i * height) / 5);
        }
        noStroke();
        for (let i = 0; i < beatGrid; i++) {
            // HI HAT PATTERN ON GRID
            if (hhPattern[i] === 1) {
                ellipse(i * cellWidth + 0.5 * cellWidth, height / 10, 20);
            }

            // CLAP PATTERN ON GRID
            if (clapPattern[i] === 1) {
                ellipse(i * cellWidth + 0.5 * cellWidth, height / 3.4, 20);
            }

            // PERC PATTERN ON GRID
            if (percPattern[i] === 1) {
                ellipse(i * cellWidth + 0.5 * cellWidth, height / 2, 20);
            }

            // SNARE PATTERN ON GRID
            if (snarePattern[i] === 1) {
                ellipse(i * cellWidth + 0.5 * cellWidth, height / 1.43, 20);
            }

            // KICK PATTERN ON GRID
            if (kPattern[i] === 1) {
                ellipse(i * cellWidth + 0.5 * cellWidth, height / 1.11, 20);
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
        stroke(0, 255, 0);
        fill(0, 255, 0, 20);
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