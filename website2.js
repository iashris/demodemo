var mgr;
   function addroom(){
    var spnam=$('#spnam').val();
    var spar=$('#spar').val();
    if(spnam=="" || spar==""){alert('Empty fields not allowed.');return;}
    mgr.spaces.addBubbleToScreen(spar,spnam);
    $('#lastone').before('<tr><td>'+spnam+'</td><td>'+spar+'</td><td><span onclick="removeroom(this);">Remove</span></td></tr>');
    $('#spnam').text("");$('#spar').text("");

   }
   function removeroom(a){
    var yewala=$(a);
    var child=$(a).parent().parent();
    var idchild=$('myTable').index(child)-1;
    mgr.spaces.bubbles.splice(idchild,1);
    child.remove();
   }
function zonex(){ //create a data structure which is rendered by zonex a Z x S matrix
  $('.selbol').removeClass('selbol');
  $('#zonex').addClass('selbol');
var alphabets=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U"];
  //start composing tables
  var magicf="<table><tr><th></th>";
  var thpart="";var rowpart="";var jig="";
  for(var i=0;i<mgr.site.zones.length;i++)thpart+="<th>"+alphabets[i]+"</th>";
  magicf+=thpart+"</tr>";
  for(var i=0;i<mgr.spaces.bubbles.length;i++){
    var e=mgr.spaces.bubbles[i].nam;
    jig+="<tr><td>"+e+"</td>";
    for(var j=0;j<mgr.site.zones.length;j++){
      jig+="<td><input class='numcounter szcow' data-space="+i+" data-zone="+j+" type='number' value='"+mgr.spacezone[i][j]+"'></td>";
    }
    jig+="</tr>";
  }
  $('#magic').html(magicf+jig);

  $(".szcow").bind('keyup mouseup', function () {
    var i=$(this).data("space");
    var j=$(this).data("zone");
    var v=$(this).val();
    mgr.spacezone[i][j]=v;       
});

}





function spacex(){

 $('.selbol').removeClass('selbol');
  $('#spacex').addClass('selbol');
  var magicf="<table><tr><th></th>";
  var thpart="";var rowpart="";var jig="";
  for(var i=0;i<mgr.spaces.bubbles.length;i++)thpart+="<th>"+mgr.spaces.bubbles[i].nam+"</th>";
  magicf+=thpart+"</tr>";
  for(var i=0;i<mgr.spaces.bubbles.length;i++){
    var e=mgr.spaces.bubbles[i].nam;
    jig+="<tr><td>"+e+"</td>";
    for(var j=0;j<mgr.spaces.bubbles.length;j++){
      if(j>=i)jig+="<td></td>";
      else jig+="<td><input class='numcounter sscow' data-spacerow="+i+" data-spacecol="+j+" type='number' value='"+mgr.spacespace[i][j]+"'></td>";
    }
    jig+="</tr>";
  }
  $('#magic').html(magicf+jig);

  $(".sscow").bind('keyup mouseup', function () {
    var i=$(this).data("spacerow");
    var j=$(this).data("spacecol");
    var v=$(this).val();
    mgr.spacespace[i][j]=v;
    mgr.spacespace[j][i]=v;
});

$("th").each(function(){$(this).height($(this).width())})



}
function setup()
{
    var mycanvas=createCanvas(document.getElementById("maincancas").offsetWidth,innerHeight);
  mycanvas.parent('#maincancas');

    mgr = new SceneManager();

    // Preload scenes. Preloading is normally optional
    // ... but needed if showNextScene() is used.
    mgr.addScene ( Animation1 );
    mgr.addScene ( Animation2 );
    mgr.addScene ( Animation3 );
    mgr.addScene ( Animation4 );
    mgr.addScene ( Animation5 );

    mgr.showNextScene();
}

function draw()
{
    mgr.draw();
}
function mouseClicked(){
    mgr.mouseClicked();
}
function keyPressed(){
    mgr.keyPressed();
}
function next()
{
    console.log('nextcalled');
    mgr.showNextScene();
}

function reset(){
  mgr.site.reset();
}


// =============================================================
// =                         BEGIN SCENES                      = 
// =============================================================

function Animation1()
{


    
    // enter() will be executed each time the SceneManager switches
    // to this animation
    // Note: Animation1() doesn't have setup() or draw()
    var boxes=[];

    this.setup=function(){
        for(var i=0;i<10;i++){
            var s=createVector(random(width),random(height));
            boxes.push(s);
        }

    }

    this.draw = function()
    {

        background("#000");
        if(frameCount%80==0){
            boxes=[];
            for(var i=0;i<10;i++){
            var s=createVector(random(width),random(height));
            boxes.push(s);
        }
        }
        
        
        var sp=["Bedroom","Bathroom","Kitchen","Dining","Drawing","Guest","Lobby","Parking","Bedroom","Storage","Lift","Terrace","Garden"];
        stroke("#ff4242");strokeWeight(2);rectMode(CENTER);
        for(var i=0;i<boxes.length;i++){
            fill("#000");
            rect(boxes[i].x,boxes[i].y,500,500);
            textAlign(CENTER);
            textSize(80);fill("#ff4242");
            text(sp[i],boxes[i].x,boxes[i].y);
        }
        
        

        //for(var i=0;i<80;i++){var s=random(30,100);rect(random(width),random(height),s,s);}

    }



    this.next = function()
    {
        console.log('Booo1');
        this.sceneManager.showNextScene();
    }
}


function Animation2()
{
  
    this.setup=function() {
  
  cursor(CROSS);
  mgr.site=new Site();
  smooth();
  document.getElementById('hdtxt').innerHTML = "Step #1 :<br> Draw the site";
  document.getElementById('cntxt').innerHTML = "Draw the site by clicking successive points. The precision doesn't matter, try to get a rough shape of the site in consideration. Also, don't worry about the units, you will be prompted to add a suitable measurement after adding the first edge of the site.";
  document.getElementById('reset').style.display="none";
  document.getElementById('proceed').style.display="none";

}

this.draw=function() {
  background(0);
  mgr.site.construction();
  mgr.site.render();
  if(mgr.site.closed){
    document.getElementById('proceed').style.display="inline-block";
    document.getElementById('reset').style.display="inline-block";
    var areaofsite=calcPolygonArea(mgr.site.points)/(mgr.site.scale*mgr.site.scale);
    mgr.site.area=parseInt(areaofsite*100)/100;
  }
  //render points
  //render lines
}

var calcPolygonArea=function (vertices) {
    var total = 0;

    for (var i = 0, l = vertices.length; i < l; i++) {
      var addX = vertices[i].x;
      var addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
      var subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
      var subY = vertices[i].y;

      total += (addX * addY * 0.5);
      total -= (subX * subY * 0.5);
    }

    return Math.abs(total);
}




    this.mouseClicked=function(){
        console.log('Funciona callad')
        mgr.site.addPoint(mouseX,mouseY);
        return;
}

    this.next = function()
    {
        this.sceneManager.showNextScene();
    }
}


// When defining scenes, you can also 
// put the setup, draw, etc. methods on prototype
function Animation4()
{





    this.setup=function() {
      mgr.spaces=new Bumblebee();
   
  document.getElementById('hdtxt').innerHTML = "Step #3 :<br> Add Spaces";
  document.getElementById('cntxt').innerHTML = "Perfect. Now that we have our site, we need to add the spaces that will be placed here. <br><br><table id='myTable' class='table'>\
    <thead><tr><th>Space</th><th>Area</th><th></th></tr></thead><tbody><tr id='lastone'><td><input id='spnam' type='text' value='Space Name'></td><td><input id='spar' type='number' value='20'></td><td><button onclick='addroom();'>+</button></td></tr>\
    </tbody></table><br><button onclick='next();'>Proceed</button>";
  document.getElementById('reset').style.display="none";
  document.getElementById('proceed').style.display="none";
  cursor(CROSS);
  smooth();

}

this.draw=function() {
  background(0);
  //mgr.spaces.update();
  mgr.spaces.render();
 // mgr.site.rendera();
  //render points
  //render lines
}
    this.mouseClicked=function(){
        console.log('Funciona callad')
  //mgr.site.addZone(mouseX,mouseY);
  return;
}

    this.next = function()
    {
        this.sceneManager.showNextScene();
    }
    this.keyPressed=function(){
      if(keyCode==UP_ARROW)
        mgr.site.marksi+=10;
      if(keyCode==DOWN_ARROW)
        mgr.site.marksi-=10;
    }
}

function Animation5()
{





    this.setup=function() {
   
  document.getElementById('hdtxt').innerHTML = "Step #4 :<br> God Mode";
  document.getElementById('cntxt').innerHTML = "<div class='centah'><button id='zonex' onclick='zonex();'>Zone Grid</button> <button id='spacex' onclick='spacex();'>Space Grid</button></div>";
  document.getElementById('reset').style.display="none";
  document.getElementById('proceed').style.display="none";
  cursor(CROSS);
  smooth();
  mgr.spacezone=[];
  for(var i=0;i<mgr.spaces.bubbles.length;i++){
    var tempArr=[];
    for(var j=0;j<mgr.site.zones.length;j++){
      tempArr.push(0);
    }
    mgr.spacezone.push(tempArr);
  }

  mgr.spacespace=[];
  for(var i=0;i<mgr.spaces.bubbles.length;i++){
    var tempArr=[];
    for(var j=0;j<mgr.spaces.bubbles.length;j++){
      tempArr.push(0);
    }
    mgr.spacespace.push(tempArr);
  }
  

  for(var i=0;i<mgr.spaces.bubbles.length;i++){
    var e=mgr.spaces.bubbles[i];
    mgr.spaces.addBubble(e.ar,e.nam,e.id);
  }

zonex();


}

this.draw=function() {
  background(0);
  //mgr.spaces.update();
  //mgr.spaces.render();
  mgr.site.simulate();
  
  //render points
  //render lines
}
    this.mouseClicked=function(){
        console.log('Funciona callad')
  //mgr.site.addZone(mouseX,mouseY);

}

    this.next = function()
    {
        this.sceneManager.showNextScene();
    }

}

function Animation3()
{


    this.setup=function() {
   
  document.getElementById('hdtxt').innerHTML = "Step #2 :<br> Add Zones";
  document.getElementById('cntxt').innerHTML = "To make sense of this site, lets add zones so sub divide the site into fragments. Zones are portions of site with common characteristics. On the basis of accessibility, viewability, wind and solar analysis, topography analysis, let's split the site into 5-6 zones. Use UP and DOWN arrow keys to change the size of the zone marker.";
  document.getElementById('reset').style.display="none";
  document.getElementById('proceed').style.display="inline-block";
  cursor(CROSS);
  smooth();

}

this.draw=function() {
  background(0);
  //mgr.spaces.update();
  //mgr.spaces.render();
  mgr.site.rendera();
  mgr.site.constructiona();
  //render points
  //render lines
}
    this.mouseClicked=function(){
        console.log('Funciona callad')
  mgr.site.addZone(mouseX,mouseY);
  return;
}

    this.next = function()
    {
        this.sceneManager.showNextScene();
    }
    this.keyPressed=function(){
      if(keyCode==UP_ARROW)
        mgr.site.marksi+=10;
      if(keyCode==DOWN_ARROW)
        mgr.site.marksi-=10;
    }
}