var Bumblebee=function(){
	this.bubbles=[];
	this.bubblesfit=[];
}

Bumblebee.prototype.addBubbleToScreen=function(ar,nam){
	var numberofbubbles=this.bubbles.length;
	var r=Math.sqrt(ar*mgr.site.scale*mgr.site.scale/PI);
	if(numberofbubbles==0)this.bubbles.push(new Bubble(createVector(random(r,width-r),random(r,height-r)),ar,nam,this.bubbles.length));
	else{
		var co=0;

		while(true){
			co++;
			var vecca=createVector(random(r,width-r),random(r,height-r));
			var score=1;
			for(var j=0;j<numberofbubbles;j++){
				var sel=this.bubbles[j];
				var selr=Math.sqrt(sel.ar*mgr.site.scale*mgr.site.scale/PI);
				if(dist(sel.loc.x,sel.loc.y,vecca.x,vecca.y)<selr+r)score=0;
			}

			if(score==1){
				this.bubbles.push(new Bubble(vecca,ar,nam,this.bubbles.length));
				break;
			}

			if(co>10000){alert('Overflow error. Program terminated. Reduce number of spaces or adjust area.');
			break;}
		}
	
	}



	// i=0;
	// while(i<6000){
	// var vecca=createVector(random(width),random(height));
 //    if (inside(vecca,mgr.site.points)){this.bubbles.push(new Bubble(vecca,ar,nam,this.bubbles.length+1));break;}
 //    i++;
}






Bumblebee.prototype.addBubble=function(ar,nam,nnn){
	i=0;
	while(i<6000){
	var vecca=createVector(random(width),random(height));
    if (inside(vecca,mgr.site.points)){this.bubblesfit.push(new Bubble(vecca,ar,nam,this.bubblesfit.length));break;}
    i++;
}

}

Bumblebee.prototype.render=function(){
	noStroke();
	for(var i=0;i<this.bubbles.length;i++){
		var e=this.bubbles[i];
		var r=Math.sqrt(e.ar*mgr.site.scale*mgr.site.scale/PI);
		var distfromcen=dist(mouseX,mouseY,e.loc.x,e.loc.y);
		distfromcen<r?fill(255,255,255,80):fill(255,0,0,100);
		ellipse(e.loc.x,e.loc.y,2*r,2*r);
		fill(255);
		textSize(18);
		text(e.nam,e.loc.x,e.loc.y);
		textSize(14);
		text("Area : "+e.ar+" sq units",e.loc.x,e.loc.y+r*0.4);
	}
}



var inside=function(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point.x, y = point.y;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x, yi = vs[i].y;
        var xj = vs[j].x, yj = vs[j].y;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};


var Bubble=function(loc,ar,nam,i){
	this.loc=loc;
	this.ar=ar;
	this.id=i;
	this.nam=nam;
	this.r=Math.sqrt(ar*mgr.site.scale*mgr.site.scale/PI);
	this.onit=false;
	this.sqside=Math.sqrt(ar*mgr.site.scale*mgr.site.scale);
}

Bubble.prototype.update=function(){
	var force=createVector(0,0);
	if(this.onit && mouseIsPressed){

		this.loc.x=mouseX;
		this.loc.y=mouseY;
	
	}



	for(var i=0;i<mgr.spaces.bubblesfit.length;i++){
		var f;
		if(i!=this.id){
			var bro=mgr.spaces.bubblesfit[i];
			var distt=dist(bro.loc.x,bro.loc.y,this.loc.x,this.loc.y);
			//var f=createVector(0,0);

			
			if((distt<bro.r+this.r && !mgr.mode) || (distt<bro.sqside/2+this.sqside/2 && mgr.mode)) {
				f=p5.Vector.sub(bro.loc,this.loc);
				f.setMag(-2.8);
				force.add(f);
			}
			
			f=p5.Vector.sub(bro.loc,this.loc);
			f.setMag(mgr.spacespace[this.id][i]/10);
			force.add(f);

			if(mgr.xray){
				var ss=mgr.spacespace[this.id][i];
				if(ss<0)stroke(0,0,255,50);
				if(ss>0)stroke(255,255,0,50);
				strokeWeight(Math.abs(ss));
				if(ss!=0)line(bro.loc.x,bro.loc.y,this.loc.x,this.loc.y);

			}

		}

	}

for(var i=0;i<mgr.site.zones.length;i++){
	var f;
	var intensity=mgr.spacezone[this.id][i];
	var thiszone=mgr.site.zones[i];
	var distt=dist(thiszone.vec.x,thiszone.vec.y,this.loc.x,this.loc.y);
	f=p5.Vector.sub(thiszone.vec,this.loc);
	var sizeint=map(thiszone.rad,50,150,0.75,1.25);
	f.setMag(intensity*sizeint/20);
	force.add(f);
}


this.loc.add(force);


if(inside(this.loc,mgr.site.points)==false){
	var distt=dist(this.loc.x,this.loc.y,mgr.site.centrale.x,mgr.site.centrale.y);
	var uni=map(distt,0,width,0,5);
	var dir=p5.Vector.sub(mgr.site.centrale,this.loc).setMag(uni);
	this.loc.add(dir);
}




}


