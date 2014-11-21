
define(function(require, exports, module) {
    var Engine       = require('famous/core/Engine');
    var EventHandler = require('famous/core/EventHandler');
    var Surface      = require('famous/core/Surface');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var Transform      = require("famous/core/Transform");
    var Transitionable = require("famous/transitions/Transitionable");
    var WallTransition = require("famous/transitions/WallTransition");
    var SpringTransition = require("famous/transitions/SpringTransition")
    var Transform       = require('famous/core/Transform');

    var View = require('famous/core/View');


  var el = document.getElementById('famous-container');
  Engine.setOptions({ appMode: false });
  var context = Engine.createContext(el);


  var targetPosition = document.getElementById('famous-container').offsetTop;

  var shutter1 = new Surface({
    size: [100,50],
    properties: {
      backgroundColor: 'gray',
      border: "2px solid black"
    }
  });

  var shutter2 = new Surface({
    size: [100,50],
    properties: {
      backgroundColor: 'gray',
      border: "2px solid black"
    }
  });

  var shutter3 = new Surface({
    size: [50,100],
    properties: {
      backgroundColor: 'gray',
      border: "2px solid black"
    }
  });

  var shutter4 = new Surface({
    size: [100,50],
    properties: {
      backgroundColor: 'gray',
      border: "2px solid black"
    }
  });

  var shutter5 = new Surface({
    size: [100,50],
    properties: {
      backgroundColor: 'gray',
      border: "2px solid black"
    }
  });

  var shutter6 = new Surface({
    size: [100,50],
    properties: {
      backgroundColor: 'gray',
      border: "2px solid black"
    }
  });

  var modifier1 = new StateModifier({
    align:[0.5,0],
  //  origin:[0.5,0.5]
  });
  
  var modifier2 = new StateModifier({
    align:[0.5,0],
//    origin:[0.5,0.5],
    transform: Transform.rotate(0,0,2*Math.PI/3)
  });

  var modifier3 = new StateModifier({
    align:[1,0],
    transform: Transform.rotate(0,0,2*Math.PI/3)
  });

  var modifier4 = new StateModifier({
    align:[0,1],
    //origin:[0.5,0.5]
  });

  var modifier5 = new StateModifier({
    align:[0,1],
    //origin:[0.5,0.5],
    transform: Transform.rotate(0,0,-2*Math.PI/3)
  });

  var modifier6 = new StateModifier({
    align:[0,1],
    //origin:[0.5,0.5],
    transform: Transform.rotate(0,0,2*Math.PI/3)
  });


  context.add(modifier1).add(shutter1)
  context.add(modifier2).add(shutter2)
  context.add(modifier3).add(shutter3)
  context.add(modifier4).add(shutter4)
  context.add(modifier5).add(shutter5)
  context.add(modifier6).add(shutter6)


  var padding = window.innerHeight - 100;
  var maxHeight = window.innerHeight + padding - 300; 
  var containerHeight = parseFloat(document.getElementById('famous-container').style.height);
  var getContainerHeight = function(){ return parseFloat(document.getElementById('famous-container').style.height); }
  var distanceTravelled = function(){ return window.pageYOffset + padding - targetPosition }
  var transCalled = false;
  var transOutCalled = false
   window.onscroll = function(){
    
    if(getContainerHeight() > 10 && !transCalled) {
      
      transCalled = true;
       transOutCalled = false;
    }
    
    if(getContainerHeight() < 85 && !transOutCalled) {
     
      transCalled = false;
      transOutCalled = true;
    }

    // bgmodifier.setTransform(Transform.translate(0,distanceTravelled()/4,-1)) 
    // bgmodifier2.setTransform(Transform.translate(0,-distanceTravelled()/4,-2)) 
    
        //if you have passed the target point(+ padding) and the container height and distance travelled is less than the max
    if(window.pageYOffset + padding > targetPosition && getContainerHeight() + distanceTravelled() < maxHeight) { 
     
     //set height of container to current height + distance travelled past target point
     document.getElementById('famous-container').style.height = containerHeight + distanceTravelled() +"px";
    
    }
  } 
});
