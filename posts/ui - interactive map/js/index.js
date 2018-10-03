$(document).ready(function() {
  var BstrapModal = function(title, body, buttons) {
    if (linkable) {
      var thisRoomsLink = '<a href="' + thisLink + '" target="_blank">' + thisRoom + '</a>';
    } else {
      var thisRoomsLink = thisRoom;
    }

    var title = title || thisRoom,
      body = body || thisRoomsLink + '<br>ID = ' + thisRoomsID,
      buttons = buttons || [{
        Value: "CLOSE",
        Css: "btn-primary",
        Callback: function(event) {
          BstrapModal.Close();
        }
      }];
    var GetModalStructure = function() {
      var that = this;
      that.Id = BstrapModal.Id = Math.random();
      var buttonshtml = "";
      for (var i = 0; i < buttons.length; i++) {
        buttonshtml += "<button type='button' class='btn " +
          (buttons[i].Css || "") + "' name='btn" + that.Id +
          "'>" + (buttons[i].Value || "CLOSE") +
          "</button>";
      }
      $("body").on("click", "button.close span", function() {
        BstrapModal.Close();
      });

      return "<div class='modal fade' id='" + that.Id + "'      tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close modal-white-close' onclick='BstrapModal.Close()'><span  aria-hidden='true'>&times; </span></button><h4 class='modal-title'>" + title + "</h4></div><div class='modal-body'><div class='row'><div class='col-xs-12 col-md-12 col-sm-12 col-lg-12'>" + body + "</div></div></div><div class='modal-footer bg-default'><div class='col-xs-12 col-sm-12 col-lg-12'>" + buttonshtml + "</div></div></div></div></div>";
    }();

    BstrapModal.Delete = function() {
      var modals = document.getElementsByClassName("modal");
      if (modals.length > 0) document.body.removeChild(modals[0]);
    };
    BstrapModal.Close = function() {
      $(document.getElementById(BstrapModal.Id)).modal('hide');
      BstrapModal.Delete();
    };

    this.Show = function() {
      BstrapModal.Delete();
      document.body.appendChild($(GetModalStructure)[0]);
      var btns = document.querySelectorAll("button[name='btn" + BstrapModal.Id + "']");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", buttons[i].Callback || BstrapModal.Close);
      }
      $(document.getElementById(BstrapModal.Id)).modal('show');
    };
  };

  $('.allRooms').click(function() {

    thisRoomsID = ($(this).attr('id'));
    console.log(thisRoomsID);

    if ($(this).hasClass('ttRoom')) {
      linkable = true;
      thisLinkWithSpaces = 'http://MLE/rooms/timetable/' + thisRoom;
      thisLink = thisLinkWithSpaces.replace(/ /g, "%20");
    } else {
      linkable = false;
    }

    $('.popover').remove();
    new BstrapModal().Show();

    var bs_timetable = "<div><a href='https://s.codepen.io/MitchES/debug/ggzvrp/PNkvYNoNbORA' target=_blank>Brock Shop Timetable</a></div>"

    if (thisRoomsID === "brock_shop") {
      $(".modal-body").append(bs_timetable);
    }
  });

  /*Popover*/
  $(".popHover, .bg").popover({
    container: 'body',
    placement: 'top',
    trigger: 'hover'
  });

  // 3D Toggle Switch
  $('.threeDswitch').change(function() {
    $(".bgWrapper, .blockBG").toggleClass("threeDtoggle");
  });

  // Minimise Full map - Function
  function fullMapMinimiser() {
    $('.popover').remove();
    $(".bgWrapper").addClass("minimise").removeClass("threeD");
    $(".bgWrapper").delay(700).queue(function() {
      $(this).addClass("minimised").clearQueue();
    });
  };

  // Maximise Full map - Function
  function fullMapMaximiser() {
    if ($('.bgWrapper').hasClass('minimised')) {
      $('.popover').remove();
      $(".bgWrapper").addClass("threeD").removeClass("minimise minimised");
      $('.blockNameDisplay, .floorNameDisplay, .upDownArrows').addClass("hidethis")
      $(".blockBG").removeClass("activate activeFloor inactive");
      $('#dd1 option').eq(0).prop('selected', true);
    };
  };

  $('.threeDswitch').click(function() {
    $('body').append(customModal);
  });

  // Map Clickable when minimised
  $(".bgWrapper").click(function() {
    fullMapMaximiser();
  });

  // Display Selected Floor - Function
  function displaySelectedFloor() {
    $('.blockNameDisplay, .floorNameDisplay').removeClass("hidethis");
    $(currentFloor).addClass("activate");
    $(currentFloor).delay(500).queue(function() {
      $(currentFloor).addClass("activeFloor").clearQueue();
    });
    if ($(currentFloor).hasClass('multiFloor')) {
      $(".upDownArrows").delay(500).queue(function() {
        $(".upDownArrows").removeClass("hidethis").clearQueue();
      });
    };
    floorName();
  };

  // Display lower floors - Function
  function displayLowerFloors(e) {
    if ($("#" + e + "GF").hasClass('activate')) {
      $("#" + e + "GF").removeClass('inactive');
    }
    if ($("#" + e + "FF").hasClass('activate')) {
      $("#" + e + "GF").addClass('inactive');
    }
    if ($("#" + e + "SF").hasClass('activate')) {
      $("#" + e + "GF, #" + e + "FF").addClass('inactive');
    }
  };

  // On Room hover-bring to front
  $(".allRooms").on('mouseenter', function() {
    /*this.parentElement.appendChild(this);*/
    thisRoom = $(this).attr('data-content');
    thisOptionsRoomName = $(this).attr('id');
  });

  // Set floors - Function
  function blockFloors() {
    thisBlocksGF = "#" + thisBlock + "GF";
    thisBlocksFF = "#" + thisBlock + "FF";
    thisBlocksSF = "#" + thisBlock + "SF";
  }
  // Change floor - Function
  function changingFloors() {
    $('.popover').remove();
    $(currentFloor).removeClass("activate activeFloor");
    $(nextFloor).addClass("activate").removeClass("inactive");
    $(nextFloor).delay(500).queue(function() {
      $(nextFloor).addClass("activeFloor").clearQueue();
    });
    if (currentFloor == thisBlocksGF) {
      $(currentFloor).addClass("inactive");
    }
    if ((thisBlock == 'sBlock') && (nextFloor == thisBlocksSF)) {
      $(currentFloor).addClass("inactive");
    }
    floorName();
  };

  // ----------------------------------- //

  // Map block Selector
  $("path[id$='Block']").click(function() {
    $('.popover').remove();
    thisBlock = $(this).attr('id');
    blockFloors();
    currentFloor = thisBlocksGF;
    nextFloor = thisBlocksFF;
    fullMapMinimiser();
    displaySelectedFloor();
  });

  /* Make Arrows work */
  $(".upDownArrows a#up").click(function() {
    if ($(thisBlocksGF).hasClass("activeFloor")) {
      currentFloor = thisBlocksGF;
      nextFloor = thisBlocksFF;
      changingFloors();
    } else if ($(thisBlocksFF).hasClass("activeFloor")) {
      currentFloor = thisBlocksFF;
      nextFloor = thisBlocksSF;
      if ($(thisBlocksSF).length) {
        changingFloors();
      };
    } else if ($(thisBlocksSF).hasClass("activeFloor")) {
      currentFloor = thisBlocksSF;
      /*Do nothing*/
    };
  });

  $(".upDownArrows a#down").click(function() {
    if ($(thisBlocksGF).hasClass("activeFloor")) {
      currentFloor = thisBlocksGF;
      /*Do nothing*/
    } else if ($(thisBlocksFF).hasClass("activeFloor")) {
      currentFloor = thisBlocksFF;
      nextFloor = thisBlocksGF;
      changingFloors();
    } else if ($(thisBlocksSF).hasClass("activeFloor")) {
      currentFloor = thisBlocksSF;
      nextFloor = thisBlocksFF;
      changingFloors();
    };
  });

  /* Toggle floor names in top corner*/
  function floorName() {
    if (thisBlock === "mBlock") {
      var blockNameDisplay = "M Block";
    } else if (thisBlock === "highwoodBlock") {
      var blockNameDisplay = "Highwood Nursery";
    } else if (thisBlock === "sporthallBlock") {
      var blockNameDisplay = "Sports Hall";
    } else if (thisBlock === "lrcBlock") {
      var blockNameDisplay = "LRC";
    } else if (thisBlock === "hbcBlock") {
      var blockNameDisplay = "Hard Brock Cafe";
    } else if (thisBlock === "aBlock") {
      var blockNameDisplay = "A Block";
    } else if (thisBlock === "sBlock") {
      var blockNameDisplay = "S Block";
    } else if (thisBlock === "tBlock") {
      var blockNameDisplay = "T Block";
    } else if (thisBlock === "eBlock") {
      var blockNameDisplay = "E Block";
    } else if (thisBlock === "bBlock") {
      var blockNameDisplay = "B Block";
    } else if (thisBlock === "hallBlock") {
      var blockNameDisplay = "Main Hall & Corridor";
    }
    $('.blockNameDisplay').html(blockNameDisplay);

    if ($(thisBlocksGF).hasClass("activate")) {
      var thisFloor = "Ground Floor";
      $('.floorNameDisplay').html(thisFloor);
    } else if ($(thisBlocksFF).hasClass("activate")) {
      var thisFloor = "First Floor";
      $('.floorNameDisplay').html(thisFloor);
    } else if ($(thisBlocksSF).hasClass("activate")) {
      var thisFloor = "Second Floor";
      $('.floorNameDisplay').html(thisFloor);
    }
  };

  // Create Room Selector Array
  var roomArray = [];
  $('.classRoom').each(function(index, value) {
    thisRoom = $(this).attr('data-content');
    thisRoomsBlock = $(this).parent().parent().attr('id');
    roomArray.push(thisRoom + "+" + thisRoomsBlock.toUpperCase());
  });

  // Add rooms to selector from above 'roomArray'
  for (var i = 0; i < roomArray.length; i++) {
    roomArray.sort();

    function getFirstPart(str) {
      return str.split('+')[0];
    }

    function getSecondPart(str) {
      return str.split('+')[1];
    }

    function getNameBeforeBLOCK(str) {
      return str.split('BLOCK')[0];
    }

    function getNameBeforeHALL(str) {
      return str.split('HALL')[0];
    }

    function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toUpperCase() : letter.toLowerCase();
      }).replace(/\s+/g, '');
    }

    var roomStrStart = (getSecondPart(roomArray[i]).charAt(0));

    if (getSecondPart(roomArray[i]).charAt(1) === 'B' && getSecondPart(roomArray[i]).charAt(2) == 'L') {
      $('<option/>').val(roomArray[i]).html(getFirstPart(roomArray[i])).appendTo('#dd1 optgroup[label="' + roomStrStart + ' Block"]');
    } else if (getSecondPart(getNameBeforeBLOCK(roomArray[i])) === 'HALL') {
      $('<option/>').val(roomArray[i]).html(getFirstPart(roomArray[i])).appendTo('#dd1 optgroup[label="Main Hall"]');
    } else if (getSecondPart(getNameBeforeHALL(roomArray[i])) === 'SPORT') {
      $('<option/>').val(roomArray[i]).html(getFirstPart(roomArray[i])).appendTo('#dd1 optgroup[label="Sports Hall"]');
    } else if (getSecondPart(getNameBeforeBLOCK(roomArray[i])) === 'LRC') {
      $('<option/>').val(roomArray[i]).html(getFirstPart(roomArray[i])).appendTo('#dd1 optgroup[label="LRC"]');
    } else if (getSecondPart(getNameBeforeBLOCK(roomArray[i])) === 'HBC') {
      $('<option/>').val(roomArray[i]).html(getFirstPart(roomArray[i])).appendTo('#dd1 optgroup[label="Hard Brock Café"]');
    } else {
      console.log("MISSING ==== " + camelize(roomArray[i]))
    }
  };

  // Rooms per floor, per block
  function setRoomsPerFloor(thisOptionsParentBlockandFloor) {

    if (thisOptionsParentBlockandFloor.match("GF$")) {
      currentFloor = '#' + thisBlock + "GF";
      nextFloor = '#' + thisBlock + "FF";
    }
    if (thisOptionsParentBlockandFloor.match("FF$")) {
      currentFloor = '#' + thisBlock + "FF";
      nextFloor = '#' + thisBlock + "SF";
    }
    if (thisOptionsParentBlockandFloor.match("SF$")) {
      currentFloor = '#' + thisBlock + "SF";
    };
  }

  // When selector registers a change of choice
  $('#dd1').change(function() {
    $('.popover').remove();
    // Choice
    var optionName = $("option:selected", this).text();
    // If option 1 is selected
    if (optionName == "Room Select…") {
      // display full map
      fullMapMaximiser();
    } else {
      // minimise full map
      fullMapMinimiser();

      var thisOptionsParentBlockandFloor = $('[data-content="' + optionName + '"]').parent().parent().attr('id');

      var thisOptionsParentBlock = thisOptionsParentBlockandFloor.slice(0, -2);

      var thisBlocksInitial = thisOptionsParentBlock.charAt(0).toUpperCase();

      // Now lowercase it and add "Block"
      thisBlock = thisOptionsParentBlock;
      // Get selected path ID
      var thisOptionsRoomName = $('[data-content="' + optionName + '"]').attr('id');
      // Create selected room's path ID
      var thisRoomNumber = thisOptionsRoomName.replace(/[^0-9]/g, '');
      var thisOptionsRoomID = "#" + thisOptionsRoomName;

      setRoomsPerFloor(thisOptionsParentBlockandFloor);

      if (!$('.bgWrapper').hasClass('minimised')) {
        blockFloors();
        displaySelectedFloor();
        displayLowerFloors(thisBlock);
        floorName();
        $(thisOptionsRoomID).delay(1200).queue(function() {
          $(thisOptionsRoomID).trigger('mouseover').clearQueue();
        });
        setFloor = currentFloor;
      } else if ($('.bgWrapper').hasClass('minimised') && ($(currentFloor).hasClass('activeFloor'))) {
        $(thisOptionsRoomID).trigger('mouseover');

      } else if ($('.bgWrapper').hasClass('minimised') && (!$(currentFloor).hasClass('activeFloor'))) {
        if ($('.blockBG').hasClass('activate')) {
          $('.blockBG').removeClass('activate activeFloor inactive');
        };
        displaySelectedFloor();
        displayLowerFloors(thisBlock);
        $(thisOptionsRoomID).delay(1200).queue(function() {
          $(thisOptionsRoomID).trigger('mouseover').clearQueue();
        });
        floorName();
        setFloor = currentFloor;
        blockFloors()
      }
    }
  });
  
  /*
  //SQL Table Creation on id
  var arrId = [];
 
  $("path").each(function(index){
    roomClass = $(this).attr("class");
    roomId = $(this).attr("id");
    
    if($(this).hasClass("allRooms" || "Corridor")){
      arrId.push(roomId);
    }
  });
  
  for(var k = 0; k < arrId.length; k++){
    var lower = arrId[k].toLowerCase();
    $("body").append("CREATE TABLE " + lower + " (id INT(4) NOT NULL auto_increment, `Equipment` TEXT, `Amounts` INTEGER, `Details` TEXT, `Model Info` TEXT, PRIMARY KEY(id));" + "<br>");
  }
*/
  
  
});