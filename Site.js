var Site=function(){
  this.edges=[]; //edges are the edges of the site plan
  this.points=[];
  this.lastpoint;
  this.startpoint;
  this.toclose=false;
  this.closed=false;
  this.startframe;
  this.zones=[];
  this.marksi=100;
  this.scale=1;
  this.area=0;
  
  //addPoint
  this.addPoint=function(x,y){
    if(this.closed || x<0)return;
    if(this.toclose){this.closed=true;var nowpoint=this.startpoint;}
    else var nowpoint=createVector(x,y);
    if(this.lastpoint==undefined){
      this.lastpoint=nowpoint;
      this.startpoint=nowpoint;
      this.startframe=frameCount;
    }
    else{
      var newedge=new Edge(nowpoint,this.lastpoint);
      this.edges.push(newedge);
      this.lastpoint=nowpoint;
    }
    this.points.push(nowpoint);
  }
  
  //render
  this.render=function(){
    noStroke();
    if(this.closed && !mgr.site)mgr.site=this;
    if(this.lastpoint==undefined){
      textAlign(CENTER);
      var transp=frameCount%255<125?frameCount%255:255-frameCount%255;
      fill(255,transp);
      textFont("Poppins");textSize(25);
      text("Click anywhere to add the first corner of your site",width*0.5,height*0.5);
      return;}
    else for(var i=0;i<this.points.length;i++){
      var e=this.points[i];
      fill(255,0,0,180);
      ellipse(e.x,e.y,20,20);
      fill(255);
      ellipse(e.x,e.y,4,4);
    }
    stroke("#ff4242");strokeWeight(1);
    for(var i=0;i<this.edges.length;i++){
      var e=this.edges[i];
      line(e.point1.x,e.point1.y,e.point2.x,e.point2.y);
      fill(255);
      text(parseInt(e.len*100/this.scale)/100,(e.point1.x+e.point2.x)/2,(e.point1.y+e.point2.y)/2);
    }
    if(this.area!=0){
      fill(255,255,255,100);
      beginShape();
      var sumx=0,sumy=0;
      for(var i=0;i<this.points.length;i++){
      var e=this.points[i];
      vertex(e.x,e.y);
      sumx+=e.x;sumy+=e.y;
      
    }
    endShape();
    fill(0);textAlign(CENTER);noStroke();
    text("Site Area : "+this.area+ " sq units",sumx/this.points.length,sumy/this.points.length);
    if(mgr.site.centrale==undefined)mgr.site.centrale=createVector(sumx/this.points.length,sumy/this.points.length);
    }
  }
this.construction=function(){
     if(this.closed)return;
    if(this.lastpoint==undefined)return;
    strokeWeight(0.8);stroke(180);
    line(mouseX,mouseY,this.lastpoint.x,this.lastpoint.y);
    var len=parseInt(dist(this.lastpoint.x,this.lastpoint.y,mouseX,mouseY));
    text(parseInt(len*100/this.scale)/100,(this.lastpoint.x+mouseX)/2,(this.lastpoint.y+mouseY)/2);
    if(this.edges.length==1 && this.scale==1){
      var scale=Number(prompt('What is the real measurement of this edge in meters (You can use feet too, just be consistent)?'));
      this.scale=this.edges[0].len/scale;
    }
  
    if(this.edges.length>1 && dist(mouseX,mouseY,this.startpoint.x,this.startpoint.y)<10){
      //showclose
      noStroke();
      fill(255,0,0,100);
      beginShape();
      var sumx=0,sumy=0;
      for(var i=0;i<this.points.length;i++){
      var e=this.points[i];
      vertex(e.x,e.y);
      sumx+=e.x;sumy+=e.y;
      
    }
    endShape();
    fill(0);
    text("Click to Close",sumx/this.points.length,sumy/this.points.length);
    this.toclose=true;
    }
    else this.toclose=false;
  }



this.addZone=function(x,y){
  if(x<0)return;
this.zones.push({vec:createVector(x,y),rad:this.marksi});

}


this.rendera=function(){ //just renders the lines
stroke("#ff4242");strokeWeight(1);
    for(var i=0;i<this.edges.length;i++){
      var e=this.edges[i];
      line(e.point1.x,e.point1.y,e.point2.x,e.point2.y);
      fill(255);
      text(parseInt(e.len*100/this.scale)/100,(e.point1.x+e.point2.x)/2,(e.point1.y+e.point2.y)/2);
    }

for(var i=0;i<this.zones.length;i++){
      var z=this.zones[i];
      fill(255,0,0,100);
      ellipse(z.vec.x,z.vec.y,z.rad,z.rad);
      fill(255);
      text("Zone "+alphabets[i],z.vec.x,z.vec.y);
    }



}

var alphabets=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U"];

this.constructiona=function(){
  var transp=frameCount%255<125?frameCount%255:255-frameCount%255;
      fill(255,transp);noStroke();
      textFont("Poppins");textSize(25);textAlign(LEFT);
      textSize(14);
  switch(this.zones.length){
      case(0):text("Click anywhere on the site to add the first zone. Let's say it is the one closer to main entry",width*0.1,height*0.9);break;
      case(1):text("You have added Zone A. Similarly add the next zone. You can use UP or DOWN arrow to control the size",width*0.1,height*0.9);break;
      case(2):text("You have added Zone B.",width*0.1,height*0.9);break;
      case(3):text("You have added Zone C.",width*0.1,height*0.9);break;
      case(4):text("You have added Zone D.",width*0.1,height*0.9);break;
      case(5):text("You have added Zone E.",width*0.1,height*0.9);break;
      case(6):text("You have added Zone F.",width*0.1,height*0.9);break;
      case(7):text("Typical zone analysis have only 5-6 zones. Please ensure that you don't have too many zones.",width*0.1,height*0.9);break;
  }
  textSize(24);
  fill(255,255,0,100);
  ellipse(mouseX,mouseY,this.marksi,this.marksi);
  fill(0);
  textAlign(CENTER);
  text("Zone "+alphabets[this.zones.length],mouseX,mouseY);

}



this.reset=function(){
    this.edges=[]; //edges are the edges of the site plan
  this.points=[];
  this.lastpoint=undefined;
  this.startpoint=undefined;
  this.toclose=false;
  this.closed=false;
  this.startframe=0;
  this.zones=[];
  this.scale=1;
  this.area=0;
  this.marksi=100;
}


this.simulate=function(){
stroke("#ff4242");strokeWeight(1);
    for(var i=0;i<this.edges.length;i++){
      var e=this.edges[i];
      line(e.point1.x,e.point1.y,e.point2.x,e.point2.y);
    }
   
    for(var i=0;i<this.zones.length;i++){
      var z=this.zones[i];
      noStroke();
      fill(255,255,255,15);
      ellipse(z.vec.x,z.vec.y,z.rad,z.rad);
      fill(0);
      text("Zone "+alphabets[i],z.vec.x,z.vec.y);
    }


    for(var i=0;i<mgr.spaces.bubblesfit.length;i++){
    var e=mgr.spaces.bubblesfit[i];
    var r=Math.sqrt(e.ar*mgr.site.scale*mgr.site.scale/PI);
    var sqside=Math.sqrt(e.ar*mgr.site.scale*mgr.site.scale);
    var d=dist(mouseX,mouseY,e.loc.x,e.loc.y);

    if(mgr.mode==false){
    if(d<r){fill(80);noStroke();e.onit=true;}
    else {fill(255,0,0,100);noStroke();e.onit=false;}
  }
  else{
    //square mode
    if(d<sqside/2){stroke(80);noFill();e.onit=true;}
    else{strokeWeight(3);stroke(255,0,0,100);noFill();e.onit=false;}
  }


    e.update();
     if(mgr.mode==false){
    if(d<r){fill(80);noStroke();e.onit=true;}
    else {fill(255,0,0,100);noStroke();e.onit=false;}
  }
  else{
    //square mode
    if(d<sqside/2){stroke(80);noFill();e.onit=true;}
    else{strokeWeight(3);stroke(255,0,0,100);noFill();e.onit=false;}
  }


    rectMode(CENTER);
    if(mgr.mode==false){

    ellipse(e.loc.x,e.loc.y,2*r,2*r);
     }
    else{

      rect(e.loc.x,e.loc.y,sqside,sqside);
    }

    fill(255);
    textSize(12);
    text(e.nam,e.loc.x,e.loc.y);
    textSize(8);
    text("Area : "+e.ar+" sq units",e.loc.x,e.loc.y+r*0.4);
    textSize(12);noStroke();
    
  }







}






}
var Edge=function(point1,point2){
  console.log(point1,point2);
  this.point1=point1;
  this.point2=point2; 
  this.len=parseInt(dist(point1.x,point1.y,point2.x,point2.y));
}

