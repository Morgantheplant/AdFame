
define(function(require, exports, module) {
  var Engine       = require('famous/core/Engine');
  var EventHandler = require('famous/core/EventHandler');
  var Surface      = require('famous/core/Surface');
  var StateModifier   = require('famous/modifiers/StateModifier');
  var Transform      = require("famous/core/Transform");
  var Transitionable = require("famous/transitions/Transitionable");
  var WallTransition = require("famous/transitions/WallTransition");
  var SpringTransition = require("famous/transitions/SpringTransition")
  var View = require('famous/core/View');
  var TransitionableTransform = require("famous/transitions/TransitionableTransform");
  var PhysicsEngine   = require('famous/physics/PhysicsEngine');
  var Body            = require('famous/physics/bodies/Body');
  var Circle          = require('famous/physics/bodies/Circle');
  var Wall       = require('famous/physics/constraints/Wall');
  var EventHandler    = require('famous/core/EventHandler'); 
  var Modifier   = require('famous/core/Modifier');

    var el = document.getElementById('famous-container');
    Engine.setOptions({ appMode: false });
    var context = Engine.createContext(el);

    var transitionableTransform = new TransitionableTransform();

 var handler = new EventHandler();

 var targetPosition = document.getElementById('famous-container').offsetTop;
 var startPositionDiv = document.getElementById('start-container').offsetTop;
 var startContainerHeight = parseFloat(document.getElementById('start-container').style.height); 
 var initPadding = 300;

 var startContainerWidth = 300;//parseFloat(document.getElementById('start-container').style.width);
 var distanceUp = targetPosition - startPositionDiv;
  
 var handler = new EventHandler();

 var physicsEngine = new PhysicsEngine();

 
  var logo = new Surface({
    content: '<img src="./pacifico.jpg">',
    origin: [0,0],
    align: [0.1,0]
  });

  var initLogoPosit = new StateModifier({
    transform: Transform.translate(0,-distanceUp,0)
  })

  
  var initRotate = new StateModifier({
    origin: [0,0]
  })

  var bannerMod = new StateModifier({
    align: [0, 0],
    origin: [0, 0],
    transform: Transform.translate(0,window.innerHeight + 500,0)
  });
  


  var banner = new Surface({
     content: '<img src="./PacificoBanner.png" />'
  });


var body = new Body();

var bannerMod2 = new Modifier({transform: function(){
    return this.getTransform();
   }.bind(body)

});

  physicsEngine.addBody(body);
  
  context.add(initRotate).add(initLogoPosit).add(logo);
  context.add(bannerMod).add(bannerMod2).add(banner);
  
  var topWall = new Wall({normal : [0,1,0],  distance: 0, restitution : 0.4});
  physicsEngine.attach( topWall,   [body]);

  topWall.on('collision', function(){
    console.log("yussssss")
  });


  var padding = window.innerHeight - 100;
  var maxHeight = window.innerHeight + padding - 300; 
  var containerHeight = parseFloat(document.getElementById('famous-container').style.height);
  var getContainerHeight = function(){ return parseFloat(document.getElementById('famous-container').style.height); }
  var distanceTravelled = function(){ return window.pageYOffset + padding - targetPosition }
  var getFirstDistanceTraveled = function() { return window.pageYOffset - startPositionDiv + initPadding; }
  var getWidthPercentage = function(){ return (225 - getFirstDistanceTraveled())/225}
  var getStartContainerHeight = function(){ return parseFloat(document.getElementById('start-container').style.height); }
  
  Transitionable.registerMethod('wall', WallTransition);
  
     var wall = {
        method: 'wall',
        period: 1500,
        dampingRatio : 0,
        velocity: 0,
        restitution : 0 
    };

  var transCalled = false;
  var transOutCalled = false
  
  window.onscroll = function(){
    


    console.log('startPositionDiv ',startPositionDiv,'offset ', window.pageYOffset -100)
    if(startPositionDiv > window.pageYOffset + 100){
      initRotate.setTransform([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      document.getElementById('start-container').style.width = startContainerWidth+'px';
     console.log('fire', document.getElementById('start-container').style.width = startContainerWidth+'px' )      
    }

    if(startPositionDiv < window.pageYOffset + initPadding) {
     initRotate.setTransform(Transform.rotate(getFirstDistanceTraveled()/150,-getFirstDistanceTraveled()/150,0))
      
      if(getWidthPercentage() > 0 && getWidthPercentage() < 100){
        console.log(document.getElementById('start-container').style.width, "this")
        document.getElementById('start-container').style.width = getWidthPercentage()*startContainerWidth +"px"; 
       console.log(document.getElementById('start-container').style.width, "that")
      }
    }
    
  
   

    if(getContainerHeight() > 200 && !transCalled) {
      bannerMod.halt();
      bannerMod.setTransform(Transform.translate(0,0,0), wall);
      
      transCalled = true;
      transOutCalled = false;
    }
    
    if(getContainerHeight() < 300 && !transOutCalled) {
      bannerMod.halt();
      bannerMod.setTransform(Transform.translate(0,window.innerHeight + 500,0), wall)
      

      transCalled = false;
      transOutCalled = true;
    }

    // bgmodifier.setTransform(Transform.translate(0,distanceTravelled()/4,-1)) 
    // bgmodifier2.setTransform(Transform.translate(0,-distanceTravelled()/4,-2)) 
    
        //if you have passed the target point(+ padding) and the container height and distance travelled is less than the max
    if(window.pageYOffset + padding > targetPosition && getContainerHeight() + distanceTravelled() < maxHeight) { 
     
     document.getElementById('start-container').style.width = '0px';

     //set height of container to current height + distance travelled past target point
     document.getElementById('famous-container').style.height = containerHeight + distanceTravelled() +"px";
      
    }
  } 
});
