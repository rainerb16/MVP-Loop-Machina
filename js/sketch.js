// VARIABLE DECLARATIONS
let hiHat, kick, clap, perc, snare, openHat, ride, synthOne, synthThree;
let hats, kicks, claps, percs, snares, openHats, rides, synthsOne, synthsThree;
let hhPattern, kPattern, clapPattern, percPattern, snarePattern, openHatPattern, ridePattern, synthOnePattern, synthThreePattern;
let hhPhrasing, kPhrasing, clapPhrasing, percPhrasing, snarePhrasing, openHatPhrasing, RidePhrasing, synthOnePhrasing, synthThreePhrasing;
let techno;
let bpmControl;
let beatGrid;
let cellWidth;
let cnvs, label;
let mousePressed;
let seqPattern;
let playPosition;
let playButton;

// ClICK ANYWHERE TO START AUDIO AS PER GOOGLE AUTOPLAY POLICY
function mouseClicked() {
    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
    }
}

function setup() {

    cnvs = createCanvas(525, 350);
    cnvs.parent('beatgrid');
    cnvs.mousePressed(canvasPressed);

    // MASTER VOLUME SLIDER
    masterVolSlider = createSlider().input(() => {
        masterVolume(masterVolSlider.value() / 100, 0.1)
    })
    masterVolSlider.parent('masterVolControl-holder');
    
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
    openHat = loadSound("assets/hi_hats/001OpenHat.wav", () => {});
    ride = loadSound("assets/hi_hats/006Ride.wav", () => {});
    synthOne = loadSound("assets/synths/synth_one.wav", () => {});
    synthThree = loadSound("assets/synths/synth_three.wav", () => {});
    
    // SOUND PATTERNS
    hhPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    kPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    clapPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    percPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    snarePattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    openHatPattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    ridePattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    synthOnePattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    synthThreePattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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

    openHatPhrasing = new p5.Phrase(
        "openHat",
        (time) => {
            openHat.play(time);
        },
        openHatPattern
    );

    ridePhrasing = new p5.Phrase(
        "ride",
        (time) => {
            ride.play(time);
        },
        ridePattern
    );

    synthOnePhrasing = new p5.Phrase(
        "synthOne",
        (time) => {
            synthOne.play(time);
        },
        synthOnePattern
    );

    synthThreePhrasing = new p5.Phrase(
        "synthThree",
        (time) => {
            synthThree.play(time);
        },
        synthThreePattern
    );

    // PLAY AND PAUSE BUTTON
    playStop = createButton('Play / Stop')
    playStop.parent('play-button-holder')
        .mouseClicked(() => {
            if (
                hiHat.isLoaded() &&
                kick.isLoaded() &&
                clap.isLoaded() &&
                perc.isLoaded() &&
                snare.isLoaded() &&
                openHat.isLoaded() &&
                ride.isLoaded() &&
                synthOne.isLoaded() &&
                synthThree.isLoaded()
            ) {
                if (!techno.isPlaying) {
                    techno.loop();
                    playStop.html('pause');
                } else {
                    techno.pause();
                    playStop.html('play');
                }
            } else {
                console.log("Oops, please wait while sounds load...");
            }
        })
    

    // saveButton = createButton('Bounce Audio')
    // saveButton.parent('save-button')
    //     .mouseClicked(() => {
    //         if (
    //             hiHat.isPlaying() ||
    //             kick.isPlaying() ||
    //             clap.isPlaying() ||
    //             perc.isPlaying() ||
    //             snare.isPlaying() ||
    //             openHat.isPlaying() ||
    //             ride.isPlaying() ||
    //             synthOne.isPlaying() ||
    //             synthThree.isPlaying()
    //         ) {
    //             if (!techno.isPlaying) {
    //                 techno.loop();
    //                 saveButton.html('Stop')
    //             } else {
    //                 techno.pause();
    //                 playStop.html('play');
    //                 saveLoop()
    //                 saveButton.html('Bounce Audio')
    //             }
    //         } else {
    //             console.log("Oops, please wait while sounds load...");
    //         }
    //     })

    techno = new p5.Part();
    techno.amp = .1;

    techno.addPhrase(hhPhrasing);
    techno.addPhrase(kPhrasing);
    techno.addPhrase(clapPhrasing);
    techno.addPhrase(percPhrasing);
    techno.addPhrase(snarePhrasing);
    techno.addPhrase(openHatPhrasing);
    techno.addPhrase(ridePhrasing);
    techno.addPhrase(synthOnePhrasing);
    techno.addPhrase(synthThreePhrasing);
    techno.addPhrase('sequence', sequence, seqPattern);

    // SET BPM, CREATE SLIDER
    bpmControl = createSlider(80, 200, 119, 1);
    bpmControl.parent('bpmControl-holder');
    bpmControl.input(() => {
        techno.setBPM(bpmControl.value());
    });
    techno.setBPM("125");

    // CALLING GRID / PIANO ROLL
    drawGrid();
}

    function canvasPressed() {
        let rowClicked = floor((9 * mouseY) / height);
        let indexClicked = floor((16 * mouseX) / width);

        if (rowClicked === 0) {
            hhPattern[indexClicked] = +!hhPattern[indexClicked];

        } else if (rowClicked === 1) {
            openHatPattern[indexClicked] = +!openHatPattern[indexClicked];
        
        } else if (rowClicked === 2) {
            ridePattern[indexClicked] = +!ridePattern[indexClicked];

        } else if (rowClicked === 3) {
            clapPattern[indexClicked] = +!clapPattern[indexClicked];
 
        } else if (rowClicked === 4) {
            percPattern[indexClicked] = +!percPattern[indexClicked];

        } else if (rowClicked === 5) {
            snarePattern[indexClicked] = +!snarePattern[indexClicked];

        } else if (rowClicked === 6) {
            synthOnePattern[indexClicked] = +!synthOnePattern[indexClicked];

        } else if (rowClicked === 7) {
            synthThreePattern[indexClicked] = +!synthThreePattern[indexClicked];

        } else if (rowClicked === 8) {
            kPattern[indexClicked] = +!kPattern[indexClicked];
        }

        drawGrid();
    }


    