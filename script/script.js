$(document).ready(function(){
	
	var startDate = new Date();
		startDate.setFullYear(2017,5,1);	
	var startDateParse = Date.parse(startDate);
	
	var endDate = new Date();
		endDate.setFullYear(2017,5,30);
	var endDateParse = Date.parse(endDate);
	
	var today = new Date();
		today.setFullYear(2017,5,10);
	var todayParse = Date.parse(today);
	
	var timeLineWidth = $(".timeLine").width();

	var windowWith = $(window).width();
	
	var events = [	["02.06.2017", 
					"LOREM IPSUM DOLOR SIT AMET", 
					"svg/heart.svg"], 
					["11.06.2017", 
					"LOREM IPSUM DOLOR SIT AMET",
					"svg/flask.svg"],
					["15.06.2017", 
					"LOREM IPSUM DOLOR SIT AMET",
					"svg/legal.svg"],
					["22.06.2017",
					"LOREM IPSUM DOLOR SIT AMET",
					"svg/graduation-cap.svg"],
					["30.06.2017", 
					"LOREM IPSUM DOLOR SIT AMET",
					"svg/trophy.svg"],
					];

	// progress bar width
	function progressBar(){
		var progressValue = Math.round(((Date.parse($(".currentDateInp").val())-Date.parse($(".startDateInp").val()))*100)/(Date.parse($(".endDateInp").val())-Date.parse($(".startDateInp").val())));
		
		$(".progressBar").css("width", progressValue+"%");
	}	
  
  // twoNum day and month
  
  function twoNum(num){
    if (num < 10){
      return "0" + num;
    }else {
      return num;
    }
  }
	
	// get correct format date from event
	function getDateFromEvents(date){
		var placeOfDots = [];
			placeOfDots.push(date.indexOf('.'));
			placeOfDots.push(date.lastIndexOf('.'));

		var eventDate = new Date();
			eventDate.setDate(date.substring(0,placeOfDots[0]));
			eventDate.setMonth(date.substring(placeOfDots[0]+1,placeOfDots[1])-1);
			eventDate.setYear(date.substring((placeOfDots[1])+1,date.length));
		
		//var eventDateParse = Date.parse(eventDate);
		
		return eventDate;
	}
	
	// create html - time line
	function createTimeLine(){
		var timeLine = '<div class="timeLineContainer"><div class="timeLine"><div class="progressBar"></div><div class="eventsLine"></div></div></div>';
		
		$("body").prepend(timeLine);
	}
	
	// create hmtl - event point, date and name
	function createEventPoint(){
		var eventPoint = '<div class="eventPoint"></div>';
		var timePoint = '<div class="colTimePoint"><div class="timePoint"><div class="timePointBtn"><div class="timePointIcon"></div></div></div></div>';
		var dateAndName = '<div class="colDateAndName"><div class="date"></div><div class="name"></div></div>';
		
		$(".eventsLine").append(eventPoint);
		$(".eventPoint:last").append(timePoint);
		$(".eventPoint:last").append(dateAndName);
	}
	
	// set place of event point
	function setTimePointPlace(date){
		
		var dateMinusStart = Date.parse(date)-Date.parse($(".startDateInp").val());
		var endMinusStart = Date.parse($(".endDateInp").val())-Date.parse($(".startDateInp").val());
		var timePointPlace = ((dateMinusStart*100)/endMinusStart);
      
		return Math.round(timePointPlace);
	}
		
	// create events points
	createTimeLine();
	//progressBar();
    eventsLoop();

	// events loop
  function eventsLoop(){
	for (i=0;i<events.length;i++){
		createEventPoint();
		
		// add date and name
		$(".date:last").html("<p>" + events[i][0] + "</p>");
		$(".name:last").html("<p>" + events[i][1] + "</p>");
		
		// add done class for past events - CHANGE FOR DONECLASS WHEN EVENTDATE AND CURRENT DATE IS EQUAL
		if (Date.parse(getDateFromEvents(events[i][0])) < todayParse){
			$(".timePoint:last").addClass("done");
		}
		
		// add icon
		$(".timePointIcon:last").load(events[i][2]);
	}
  }
  
  function doneClass(){
    for(i=0;i<events.length;i++){
      if(Date.parse($(".eventInp:eq("+i+")").val()) < Date.parse($(".currentDateInp").val())){
        $(".timePoint:eq("+i+")").addClass("done");
      } else {
        $(".timePoint:eq("+i+")").removeClass("done");
      }
    }
  }
	
  function changeData(){
    $(".eventInp").each(function(i){
      $(".date:eq("+i+") p" ).text(chageDataFromInputToText($(this).val()))
    })
  }
  
  function chageDataFromInputToText(date){
    var d = new Date(date);
    var y = d.getFullYear();
    var m = d.getMonth();
    var day = d.getDate();
    return (twoNum(day) + "." + twoNum(m+1) + "." + y);
    console.log(eventDate);
    
  }
	// set place of time points icon 
	function setIconsPlace(){

		// media query
		var mediaQuery = window.matchMedia('only screen and (max-width: 768px), only screen and (max-device-width: 768px)').matches;

		if (mediaQuery){
		// mobile version
		
			// set event buttons to left:0
			$(".eventPoint").css("left", 0);
			
			// unbind hover tooltip
			$(".timePointBtn").unbind('mouseenter mouseleave');
			
		} else {
		//desktop version
		
			// set events buttons place in time line
			for (i=0;i<events.length;i++){
			$(".eventPoint:eq("+i+")").css("left", setTimePointPlace($(".eventInp:eq("+i+")").val()) + "%");
                                           
           /* setTimePointPlace((getDateFromEvents(events[i][0]))) + "%");	
           */
			}
			
			// hover tool tip
			$(".timePointBtn").hover(function(){
				$(this).parent().parent().next().children(".date, .name").addClass("hoverEvent");
			}, function(){
				$(this).parent().parent().next().children(".date, .name").removeClass("hoverEvent");
			});
		}
		
	}
	
	// set icons place
	//setIconsPlace();
		
	// set icons when window is resize
	$(window).resize(setIconsPlace);
  
  // set date for inputs
  
  function dateForInputs(date){
    return date.getFullYear() + "-" + twoNum(date.getMonth()+1) + "-" + twoNum(date.getDate())
  }
  

  
  // set date in inputs
  $(".startDateInp").val(dateForInputs(startDate));
  
  $(".endDateInp").val(dateForInputs(endDate));
  
  $(".currentDateInp").val(dateForInputs(today));
  
  $(".eventInp").each(function(i){$(this).val(dateForInputs(getDateFromEvents(events[i][0]))); i++});
  
  $(".startDateInp").change(function(){
    if ($(".startDateInp").val() > $(".currentDateInp").val() || $(".startDateInp").val() > $(".endDateInp").val() || Date.parse($(".startDateInp").val()) > smallestDate ){
      $(".message").text("error start date");
     
      $(this).prev().addClass("error");
    } else {   
      $(this).prev().removeClass("error")
      if ($(".error").length == 0){
      $(".message").empty();
      refreshTimeLine();
      }
    }
      
    
    
  })  
  
  $(".endDateInp").change(function(){
    if ($(".endDateInp").val() < $(".currentDateInp").val() || $(".endDateInp").val() < $(".startDateInp").val() || Date.parse($(".endDateInp").val()) < biggestDate){
      $(".message").text("error end date");
      //$(".endDateInp").val(dateForInputs(endDate));
      $(this).prev().addClass("error");
    } else {   
      $(this).prev().removeClass("error")
      if ($(".error").length == 0){
      $(".message").empty();
        refreshTimeLine();
      }
      }
    
  })
  
  $(".currentDateInp").change(function(){
    if ($(".currentDateInp").val() < $(".startDateInp").val() || $(".currentDateInp").val() > $(".endDateInp").val()){
      $(".message").text("error current date");
      $(this).prev().addClass("error")
      //$(".currentDateInp").val(dateForInputs(today));
    } else {   
      $(this).prev().removeClass("error")
      if ($(".error").length == 0){
      $(".message").empty();
      //today = new Date($(this).val());
        refreshTimeLine();
      }
      }
      
    
  })  
  
  $(".eventInp").each(function(){$(this).change(function(){
    var $this = $(this)
    if ($this.val() < $(".startDateInp").val() || $this.val() > $(".endDateInp").val()){
      $(".message").text("error event date");
      $this.prev().addClass("error")
      //$(".currentDateInp").val(dateForInputs(today));
    } else {   
      $this.prev().removeClass("error")

      //today = new Date($(this).val());
      }
    if ($(".error").length == 0){
            $(".message").empty();
          refreshTimeLine();
          changeData();
      
    }

  })
  })
  
  var biggestDate = "";
  var smallestDate = Date.parse($(".currentDateInp").val());
  
  function biggestDateFunc(){
    $(".eventInp").each(function(){
      if(Date.parse($(this).val()) > biggestDate){
        biggestDate = Date.parse($(this).val());
      }
    })
   }
  
  function smallestDateFunc(){
    $(".eventInp").each(function(){
      if(Date.parse($(this).val()) < smallestDate){
        smallestDate = Date.parse($(this).val());
      }
    })
    
  }
      
  function setOrder(){
    $(".eventPoint").each(function(i){
      $(this).css("order", i+1); i++
      })
  }
  
  
  
  function refreshTimeLine(){
    setIconsPlace();
    progressBar();
    doneClass();
    setOrder();
    biggestDateFunc();
    smallestDateFunc();

  }
  refreshTimeLine()
  
});