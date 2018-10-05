const frame = new Frame("fit", 1024, 768, black, dark);
frame.on("ready", function() {
    zog("ready from ZIM Frame"); // logs in console (F12 - choose console)

    // often need below - so consider it part of the template
    let stage = frame.stage;
    let stageW = frame.width;
    let stageH = frame.height;

    // REFERENCES for ZIM at http://zimjs.com
    // see http://zimjs.com/learn.html for video and code tutorials
    // see http://zimjs.com/docs.html for documentation
    // see https://www.youtube.com/watch?v=pUjHFptXspM for INTRO to ZIM
    // see https://www.youtube.com/watch?v=v7OT0YrDWiY for INTRO to CODE

    const path = [
        [-221.4,58.8,0,0,-107.6,280.2,107.6,-280.2,"mirror"],
        [43.7,147.6,0,0,-130.1,-36.3,130.1,36.3,"mirror"],
        [107.5,-153.9,0,0,252.7,-63.8,-252.7,63.8,"mirror"],
        [337.6,185.1,0,0,-107.6,66.3,107.6,-66.3,"mirror"],
        [497.6,-82.6,0,0,-168.8,-208.9,168.8,208.9,"mirror"]
    ]; // recorded with commented out button below Squiggle

    const squiggle = new Squiggle({
        points:path,
        showControls:false,
        onTop:false,
        stickColor:light
    }).center();
    squiggle.visible = false;

    // used to record the initial squiggle shape
    // new Button({label:"RECORD"}).pos(30,30,null,true).on("click", ()=>{
    // 	squiggle.recordPoints(true); // pop up in window with point array
    // });

		const ghost = new Blob({
			points:[ // recorded with commented code
				[-36.5,-114.6,0,0,-62.9,2.9,83.8,-3.9],
				[90,49.4,0,0,18.1,-46.6,-16.1,41.2],
				[45.6,9.2,0,0,14.4,-10.2,-14.4,10.2,"mirror"],
				[47.4,58.8,0,0,15.8,5,-15.8,-5,"mirror"],
				[-8.8,-0.6,0,0,11.5,-6.2,-11.5,6.2,"mirror"],
				[6,66.6,0,0,19.4,1.9,-19.4,-1.9,"mirror"],
				[-45.9,17.1,0,0,5.2,-7.2,-19.1,26.5],
				[-55.9,55.5,0,0,22.7,14.9,-60.3,-39.6]
			],
			showControls:false,
			allowToggle:false
		}).centerReg({add:false}).reg(-14,-38);
		const ghostRoll = ghost.clone();
		ghostRoll.color = pink;
		// Blob can be animated too 
		// see https://codepen.io/danzen/pen/WyKQYa

		const button = new Button({
					label:"GOO",
					backing:ghost,
					rollBacking:ghostRoll,
					shadowBlur:20,
					shadowColor:"rgba(0,0,0,.1)"
			})
					.centerReg()
					.animate({
							props:{path:squiggle, orient:false},
							time:10000,
							rewind:true,
							loop:true,
							ease:"sineInOut"
					})
					.wiggle("rotation", 0, 10, 20, 500, 1000);

    button.on("click", ()=>{zgo("https://zimjs.com/", "_blank")});

		// used to record the ghost blob shape
		// new Button({label:"RECORD"}).pos(30,30,null,true).on("click", ()=>{
		// 	ghost.recordPoints(true);
		// });


    const checkBox = new CheckBox({label:"see path", color:blue}).sca(.8).pos(30,30,null,true);
		checkBox.on("change", function () {
			squiggle.visible = checkBox.checked;
			stage.update();
		});

    new Label({
        text:"ZIM - Ghostly Button Challenge - you can change the path!",
        color:white
    }).sca(.7).alp(.5).pos(30,30);

    // save the path
    const transformManager = new TransformManager(squiggle, "CodePenButton");

    // provide a confirm button - note the behaviour
    const reset = new Button({
        width:250,
        corner:0,
        label:"RESET",
        backgroundColor:pink,
        rollBackgroundColor:blue,
        wait:"CONFIRM",
        waitTime:2500,
        waitBackgroundColor:red,
        rollWaitBackgroundColor:red
    })
        .sca(.6)
        .pos(40, 25, true);

    const resetEvent = reset.on("mousedown", ()=>{
        if (reset.waiting) {
            reset.clearWait();
            transformManager.clearPersist("CodePenButton");
            squiggle.points = path;
            squiggle.center();
            stage.update();
        }
    });


    stage.update(); // this is needed to show any changes

    // DOCS FOR ITEMS USED
    // https://zimjs.com/docs.html?item=Squiggle
    // https://zimjs.com/docs.html?item=Blob
    // https://zimjs.com/docs.html?item=Button
    // https://zimjs.com/docs.html?item=animate
    // https://zimjs.com/docs.html?item=wiggle
    // https://zimjs.com/docs.html?item=center
    // https://zimjs.com/docs.html?item=centerReg
    // https://zimjs.com/docs.html?item=TransformManager
    // https://zimjs.com/docs.html?item=CheckBox
    // https://zimjs.com/docs.html?item=Label
    // https://zimjs.com/docs.html?item=pos
    // https://zimjs.com/docs.html?item=frame

    // FOOTER
    // call remote script to make ZIM Foundation for Creative Coding icon
    createIcon(frame, 800, 620); 

}); // end of ready