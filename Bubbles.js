var Bumblebee=function(){
	this.bubbles=[];
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






Bumblebee.prototype.addBubble=function(ar,nam){
	i=0;
	while(i<6000){
	var vecca=createVector(random(width),random(height));
    if (inside(vecca,mgr.site.points)){this.bubbles.push(new Bubble(vecca,ar,nam,this.bubbles.length+1));break;}
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

Bumblebee.prototype.update=function(){
	
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
	this.id="Space "+ i;
	this.nam=nam;
}


