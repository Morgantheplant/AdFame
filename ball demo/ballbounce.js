define(function(require, exports, module) {
  var Engine          = require('../node_modules/famous/src/core/Engine');
var Surface         = require('../node_modules/famous/src/core/Surface');
var EventHandler    = require('../node_modules/famous/src/core/EventHandler');
var View            = require('../node_modules/famous/src/core/View');
var Transform       = require('../node_modules/famous/src/core/Transform');

var StateModifier   = require('../node_modules/famous/src/modifiers/StateModifier');
var Modifier   = require('../node_modules/famous/src/core/Modifier');

var PhysicsEngine   = require('../node_modules/famous/src/physics/PhysicsEngine');
var Body            = require('../node_modules/famous/src/physics/bodies/Body');
var Circle          = require('../node_modules/famous/src/physics/bodies/Circle');
var Wall            = require('../node_modules/famous/src/physics/constraints/Wall');
var ImageSurface = require('../node_modules/famous/src/surfaces/ImageSurface');
var Transitionable = require('../node_modules/famous/src/transitions/Transitionable');
var SpringTransition = require('../node_modules/famous/src/transitions/SpringTransition');
Transitionable.registerMethod('spring', SpringTransition);


var el = document.getElementById('famous-container');
Engine.setOptions({ appMode: false });
var context = Engine.createContext(el);

var handler = new EventHandler();

var physicsEngine = new PhysicsEngine();

var colorScheme = "hsl(" + (Math.random() * 3600 / 4) + ", 100%, 50%)";

var ball = new Surface ({
  size: [35,35],
  properties: {
    backgroundColor: colorScheme,  
    borderRadius: "17.5px"
  }
})


var shine = new Surface({
  size: [31,31],
  properties: {
    backgroundColor: '#dddddd',
    borderRadius: '16px'
  }
});

var shine2 = new Surface({
  size:[13,8],
  properties: {
    backgroundColor: '#dddddd',
    borderRadius: '5px'
  }
});

var opacity = new Modifier({
    opacity: .5
})

var opacity3 = new Modifier({
    opacity: 0.5
})

var opacity2 = new Modifier({
    opacity: .5,
   
})


var mod = new Modifier({
    size: [undefined,undefined]
})





//modifiers can pass in functions and you don't need to bind to prerender,
//modifiers if you pass in a function act on every tick


var circle = new Circle({radius:15});

var ballState = new Modifier({origin:[0.5,0.5], align:[0.5,-.2], transform: function(){
    return this.getTransform();
   }.bind(circle)

});

physicsEngine.addBody(circle);

var called = false;

window.onscroll = function(){
   var colorScheme = "hsl(" + (window.pageYOffset / 5) + ", 100%, 50%)";  
    
   ball.setProperties({backgroundColor:colorScheme});
   banner.setProperties({backgroundColor:colorScheme});
  if(window.pageYOffset > 0 && !called){
    called = true;
    circle.setVelocity([Math.random(),Math.random(),Math.random()]);
 
  } 


}



var banner = new Surface({
    size:[200,75],
    content: 'Your Ad Here',
    properties: {
    backgroundColor: colorScheme,
    borderRadius: "15px",
    textAlign: "center"
    }
});


var spring = {
  method: 'spring',
  period: 1500,
  dampingRatio: 0.4
};


var bannerInit = new StateModifier({
  align:[0.5,1],
  origin:[0.5,0],
  opacity: .5
});

banner.on('click', function(){
  bannerInit.setTransform(Transform.rotate(0, .5, 0), spring, function(){
    bannerInit.setTransform(Transform.rotate(0,0,0.1),spring)
  });
});

shine.on("click",function(){
 
  circle.setVelocity([0,0.5,0])
  bottomWall.setOptions({restitution:0});
  bottomWall.on('collision', function(){
    circle.setVelocity[0,0,0]
    bannerInit.setTransform(Transform.translate(0,-200, 0), spring);
    //topWall({normal})
  });
});

//add a functional modfier(apply trnasform ) or add a particle 

context.add(bannerInit).add(banner);

var node = context.add(ballState)
node.add(opacity).add(shine)
node.add(opacity2).add(shine2)
node.add(opacity3).add(ball)

var topWall     = new Wall({normal : [0,1,0],  distance: 1, restitution : 0.4});
var bottomWall  = new Wall({normal : [0,-1,0], distance: window.innerHeight, restitution : 0.4});
var leftWall    = new Wall({normal : [1,0,0],  distance: window.innerWidth*.5, restitution : 0.4});
var rightWall   = new Wall({normal : [-1,0,0], distance: window.innerWidth*.5, restitution : 0.4});



physicsEngine.attach( leftWall,  [circle]);
physicsEngine.attach( rightWall, [circle]);
physicsEngine.attach( topWall,   [circle]);
physicsEngine.attach( bottomWall,[circle]);


});
