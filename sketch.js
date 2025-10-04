
//Project global variables
//main triangle effect and switches to activate
//different effect 'phases'
//coordinates and variables to alter hue

//coded by gabriel antonio hernandez-zepeda 2025
//sfx & music from freesound_community 
//sounds _are_ working!

var cnv;

let trText;
let triwidth = 100;

let triheight;
let yheight = 0.3;

let x1, x2, x3, y1, y2, y3;
let hue = 180;
let sW = 2;

let phase1  = 1;
let phase2  = 0;
let phase3  = 0;
let phase0 = 0;

let switch1 = 1;
let switch2 = 1;
let switch3 = 1;
let theta;


let fade;



let hoff = 2;


// disp font
let oeFont;
let clearFont;
let coralFont; 

//sound
//establish variables for lute mp3 tracks
var lute1;
var lute2;
var lute3;
//var lute4;
//var lute5;
//var lute6;
//var lute7;
let newtune;
let cointoss;
let diceroll;


//make arrays for dice values (tbd) maybe use for string messages?
let D4  = [1, 2, 3, 4];
let D6  = ['lute2', 'lute3', 'lute4', 'lute5', 'lute6', 'lute7'];
let D10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let D20 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

//extra dice variable (tbd) 
let D4roll = 0;
let D6roll = 0;
let D10roll = 0;
let D20roll = 0;

//hover variables
let hoverD = false;
let hoverFill4 = 'blue';
let hoverFill6 = 'blue';
let hoverFill10 = 'blue';
let hoverFill20 = 'blue';

// vars for bg animation
let cx, cy, cs;
let speedx = 2.3;
let speedy = 2.33;


function preload() {
  
//load custom font
// from google fonts
  oeFont = loadFont('Jacquard12Charted-Regular.ttf');
  clearFont = loadFont('CoralPixels-Regular.ttf');
  coralFont = loadFont('Jacquard24-Regular.ttf');

//load sounds
 soundFormats('mp3');
 lute1 = loadSound("lute-music1.mp3");
 lute2 = loadSound("lute-music2.mp3");
 lute3 = loadSound("lute-music3.mp3");
 //lute4 = loadSound("lute-music4.mp3");
 //lute5 = loadSound("lute-music5.mp3");
 //lute6 = loadSound("lute-music6.mp3");
 //lute7 = loadSound("lute-music7.mp3");
 cointoss = loadSound("coin_toss.mp3");
 diceroll = loadSound("dice_roll.mp3");
}

function setup() {
  
  cnv = createCanvas(500, 600);

cnv.parent('portrait');

  centerCanvas();
  //sound
 

  colorMode(HSB, 360, 100, 100, 100);
  frameRate(18);
  cursor(CROSS);
  rectMode(CENTER);
  
  //triwave initilizeds
  //create p5. graphics object
  trText = createGraphics(120, 40);
  trText.background(60,50,0, 90);
  
  //fade out graphic
  fade = createGraphics(windowWidth, windowHeight);
  fade.background(0, 0, 0, 1);
  
  //initialize triangle values
   x1 = width/2;
   x2 = width/2+125;
   x3 = 80;
   y1= 200;
   y2= height/2+125;
   y3= height/2+125;
  
  //apply loaded font
  textFont(oeFont, 55);
  
  cx = windowWidth / 2;
  cy = windowHeight / 2;


}

function draw() {


  // check if key is pressed, if song is not playing
  // yet play song (lute1), if lute1 IS playing
  //choose from array of lute songs 2-7 with D6 die 
  //variable to choose new song to play.
  if(keyIsPressed === true){

  if (keyCode === 32 && D6roll === 0){
            cointoss.play();

            lute1.setVolume(0);
            lute1.play();
            D6roll = 1;
            console.log('sound lute1 file played');
            lute1.setVolume(1, 10); //ramp vol to 1
                              //over x sec
  } 
  // R is pressed
  else if(keyCode === 82 && D6roll == 1){
    if(lute1.isPlaying() ||
       lute2.isPlaying() ||
       lute3.isPlaying() 
       /*||
       lute4.isPlaying() ||
       lute5.isPlaying() ||
       lute6.isPlaying() ||
       lute7.isPlaying()*/
) {
  lute1.stop();
lute2.stop();
lute3.stop();
cointoss.play();
/*lute4.stop();
lute5.stop();
lute6.stop();
lute7.stop();*/

      newtune = 2+round(random(5));
      console.log('rolled for bard a '+newtune);
      console.log('options is: '+D6);
      if(newtune === 2){
     lute2.setVolume(0);
     lute2.play();
     lute2.setVolume(1, 5); //ramp vol
      } else if(newtune === 3){
     lute3.setVolume(0);
     lute3.play();
     lute3.setVolume(1, 5); //ramp vol
      } else if(newtune === 4){
     lute2.setVolume(0);
     lute2.play();
     lute2.setVolume(1, 5); //ramp vol
      }else if(newtune === 5){
     lute1.setVolume(0);
     lute1.play();
     lute1.setVolume(1, 5); //ramp vol
      }else if(newtune === 6){
     lute2.setVolume(0);
     lute2.play();
     lute2.setVolume(1, 5); //ramp vol
      }else if(newtune === 7){
     lute3.setVolume(0);
     lute3.play();
     lute3.setVolume(1, 5); //ramp vol
      }
   }
  }
}
  noFill();
  strokeWeight(4);
  
  //frame~~~~~
  stroke('paleturquoise');
  //rect(width/2, height/2, width-30, height-30);
  
  //fX ~~~~~triwave
  //sin wave oscillating prototypes

  let s = sin(frameCount*0.01);
  triwidth= map(s, -1, 1, 0, width/2);
  
  strokeWeight(sW);
  stroke(hue, 100, 75, 69);
  hue++;

  //cycles through hue of color
  if ( hue >=360){hue=0;}
  fill(map(mouseX, 0, width, 0, 100), 100, 20, 1);
  
  triheight = frameCount%height;
  
  triangle(width/2-triwidth, height/hoff+height/2, width/2,    triheight, width/2+triwidth, height/hoff+height/2);
  
  //todo: create a rotating triangle
  //multi-color triangle, rotating
  background(0, 0, 0, 2);
  theta = frameCount*0.02;
  image(trText, 75, 25);
  image(trText, 25, 25);
  stroke(hue, 100, 100, 100);
  //text("x3: " + round(x3, 1), 50, 50);
  strokeWeight(3);
  fill(255, 25, 25, 5);
  
  text(switch1, width-50, height-80);
  text(switch2, width-50, height-50);
  text(switch3, width-50, height-20)

  //PHASE 1
  if (phase1 == 1){
   if(switch1 == 1){
   x1 = x1 + 2;
    if(x1 >= width/2+width/4){
     switch1=0;
   }
  }
  if(switch2 == 1){
      x2 = x2 -2;
    if(x2 <= width/2-width/4){
      switch2=0;
   }
  }
  if(switch3 == 1){
      y3 = y3-2; 
  if(y3 <= height/2-height/5){
      switch3 = 0;
    }
   }
    if (switch1 == 0 && switch2 == 0 && switch3 == 0){
      phase1 = 0;
      phase2 = 1;
    }
  }
  
  //PHASE 2
  if(phase1 == 0 && phase2 == 1){
   
    if(switch1 == 0){
        y1 =  y1 + 2;
      if(y1 >= height/2+height/5){
        switch1 = 1;
      }
    }
    if(switch2 == 0){
        y2 =  y2-2;
      if(y2 <= 200){
        switch2 = 1;
      }
    }
    if(switch3 == 0){
        x3 =  x3+2;
      if(x3 >= width/2+width/4){
        switch3 = 1;
      }
    }
        if (switch1 == 1 && switch2 == 1 && switch3 == 1){

          phase2 = 0;
          phase3 = 1;
    }
  }
  
  // PHASE 3
  if (phase1 == 0 && phase2 == 0 && phase3 == 1){
     if(switch1==1){
     x1 = x1-2;
    if(x1 <= width/2-width/4){
    switch1 = 0;
   }
  }
  if(switch2 == 1){
    x2 = x2+2;
    if(x2 >= width/2+width/4){
     switch2 = 0;
   }
  }
  if(switch3 == 1){
    y3 = y3+2;
  if(y3 >= height/2+height/5){
    switch3 = 0
    }
   }
     if (switch1 == 0 && switch2 == 0 && switch3 == 0){
          phase3=0;
          phase0=1;
    }
    
  }
  
  //phase ZERO
  if( phase3 == 0 && phase0 == 1){
    if(switch1 == 0){
      y1 = y1-2;
    if(y1 <= height/2-height/5){
      switch1 = 1;
   }
  }
    
   if(switch2 == 0){
    y2 = y2+2;
   if(y2 >= height/2+height/5){
     switch2 = 1;
   }
  }
    
   if(switch3 == 0){
    x3 = x3-1;
     if(x1 <= width/2){
       x1 = x1+2;
       x3 = x3-1;
     }
   if(x3 <= width/2-width/4){
    switch3 = 1
    }
   }
         if (switch1==1 && switch2 == 1 && switch3 == 1){

          phase0=0;
          phase1=1;
    }
  }
  
  stroke(hue, 100, 25, 75);
  triangle(x1, y1, x2, y2, x3, y3);
  stroke(0, 77, 100, 77);
  point(x1, y1);
  point(x2, y2);
  point( x3, y3);
  
  
  
  
 
  
  //INCREMENT OSCILLATING TRIANGLE HEIGHT RELATIVE TO HEIGHT
if(frameCount%120==0){
  hoff= hoff + random(0.2, 0.6);
  if(hoff>=10) {
  hoff=0.2;
  }
}
  //box containing text;
  image(trText, width-60, height-40);
  //display text
  textSize(30)
  stroke(360, 0, 100, 1);
  fill(360, 0, 100, 1);
  text(round(triwidth), width-55, height-10);
  
  line(width/2-width/4, 0, width/2-width/4, height);
  line(width/2+width/4, 0, width/2+width/4, height);
  
  
  //DICE BUTTONS
  for(i=0; i<4; i++){
    
    let x = 30;
    let y = height/3+height/6*i;
    let s = 55;
    
    //text
    stroke('lavender');
    fill('firebrick')
    textSize(30)
    
    //for prototyping
    //text('x-loc: '+x+' y-loc: '+y, 70, y)
    textFont(clearFont);
    noFill();
    stroke(255);
    strokeWeight(0.5);
    text('mouse-X= '+mouseX+'.', 300, height-100);
    text('mouse-Y= '+mouseY+'.', 300, height-80);
strokeWeight(2);
    stroke('firebrick');
   
    let d;
    
    //hover feedback
     if(mouseX >= 5 && mouseX <= 56 && mouseY >= 174 && mouseY <= 222){
      
      hoverFill4 = 'Burlywood';

        } else {
        hoverFill4 = 'blue';
      }
         if(mouseX >= 5 && mouseX <= 56 && mouseY >= 274 && mouseY <= 322){
        hoverFill6 = 'Burlywood';
         


        } else {
        hoverFill6 = 'blue';
      }
         if(mouseX >= 5 && mouseX <= 56 && mouseY >= 374 && mouseY <= 422){
        hoverFill10 = 'Burlywood';


        } else {
        hoverFill10 = 'blue';
      }
         if(mouseX >= 5 && mouseX <= 56 && mouseY >= 474 && mouseY <= 522){
        hoverFill20 = 'Burlywood';


        } else {
        hoverFill20 = 'blue';
      }
    
    if (i==0) {
        fill(hoverFill4);
        square(x, y, s, 10);
        fill('mediumslateblue');
        d = 4;
    } else if( i == 1) {
          fill(hoverFill6);
          square(x, y, s, 10);
         fill('mediumslateblue')
         d = 6;
    } else if (i ==2) {
          fill(hoverFill10);
          square(x, y, s, 10);
         fill('mediumslateblue');
         d = 10;
    } else if ( i ==3) {
          fill(hoverFill20);
          square(x, y, s, 10);
        fill('mediumslateblue');
        d = 20;
    }
    textFont(coralFont);
    textSize(35)
    text('D'+d, 9, y+10)
    textSize(55);
  }
  
  
  //bg effect
  strokeWeight(0.1);
  hue = millis()/100%360;
  fill(hue,100,50,1);
  cs = 777 * noise(millis()%300);
  circle(width/2, height/2, cs);
  
  //end bgeffect

  stroke(0);
  fill('paleturquoise');
  textFont(oeFont);
  text('Welcome to the Dice', width/2-width/3-64, height/10+1);
    text('Rollers\' Dungeon!', width/2-width/4-20, height/5);
  textFont(coralFont);
   textSize(26);
  text('Press space bar to throw a coin to the bard,', 42, height-25);
  text('"R" key asks for a different tune !', width/2-120, height-6);

  //... TBD
 
}


function mousePressed(){
//display num when mouse clicked at certain coordinates for dice options on left
textSize(40);
textFont(coralFont);
  //D4
     if(mouseX >= 5 && mouseX <= 56 && mouseY >= 174      && mouseY <= 222){
       fill('DarkSlateGray');
        square(33, 198, 77, 20);
       fill('MidnightBlue');
        rect(width/2+width/4, 195, 190, 30);
       fill('white');
       diceroll.rate(random(0.98, 1.04));
       diceroll.play();
        text("You rolled a "+(round(random(3))+1)+" !!", width/2+20, 200);
      }
  //D6
      if(mouseX >= 5 && mouseX <= 56 && mouseY >= 274       && mouseY <= 322){
       fill('DarkSlateGray');
        square(33, 298, 77, 20);
      fill('MidnightBlue');
       rect(width/2+width/4, height/2-height/12, 190, 30);
      fill('white');
       diceroll.rate(random(0.96, 1.03));
       diceroll.play();
       text("You rolled a "+(round(random(5))+1)+" !!", width/2+20,         height/2-height/12);
      }
  //D10
      if(mouseX >= 5 && mouseX <= 56 && mouseY >= 374       && mouseY <= 422){
       fill('DarkSlateGray');
        square(33, 398, 77, 20);
       fill('MidnightBlue');
        rect(width/2+width/4, height/2+height/12, 190, 30);
       fill('white');
        diceroll.rate(random(0.96, 1.03));
       diceroll.play();
        text("You rolled a "+(round(random(9))+1)+" !!", width/2+20, height/2+height/12);
      }
  //D20
      if(mouseX >= 5 && mouseX <= 56 && mouseY >=           474 && mouseY <= 522){
      fill('DarkSlateGray');
        square(33, 498, 77, 20);
      fill('MidnightBlue');
       rect(width/2+width/4, height/2+height/5, 200, 30);
      fill('white');
       diceroll.rate(random(0.97, 1.025));
       diceroll.play();
       text("You rolled a "+(round(random(19))+1)+" !!", width/2+20, height/2+height/5);
      }
}

function centerCanvas(){
  var q = (windowWidth - width) / 2;
  var z = (windowHeight - height) / 2;

  cnv.position(q,z);
}

function windowResized(){
  centerCanvas();
}