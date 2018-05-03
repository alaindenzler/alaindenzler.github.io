var tinygpses=[],count=0,watchwi=0,watchfont=14,watchx=3,watchy=5,descfont=12,deffont=14,colors=["red","blue","green","#9400D3","#800000"],buttonwi=30,buttonhe=16;function addgpssbit(b,a){var c=new tinygps;c.canvas=b;tinygpses[count]=c;tinygpses[count].init(a,count);count++}
function tinygps(){this.map=this.datafile=this.canvas="undef";this.tracks=[];this.speed=10;this.desc="";this.firsttime=!0;this.startprogression=this.startwatchtime=this.starttime=this.duration=this.progression=0;this.isrunning=!1;this.drawinterval=50;this.color="red";this.index=0;this.ready=!1;this.init=init;this.addtrackpoint=addtrackpoint}function track(b){this.def=b;this.pointcount=0;this.trackpoints=[];this.mapytodraw=this.mapxtodraw=-1E4;this.getmapxy=getmapxy}
function trackpoint(b,a,c){this.time=b;this.x=a;this.y=c}function play(b){var a=tinygpses[b];0.9999<a.progression&&(a.progression=0);var c=new Date;a.firsttime=!1;a.starttime=c.getTime();a.startprogression=a.progression;a.isrunning=!0;setTimeout(function(){watchticking(b)},a.drawinterval)}function pause(b){tinygpses[b].isrunning=!1}
function forward(b,a){var c=tinygpses[b],e=c.progression+a;1<e?(c.progression=1,c.isrunning=!1):(c.progression=0>e?0:e,c.isrunning&&(e=new Date,c.starttime=e.getTime(),c.startprogression=c.progression));draw(c.index)}function watchticking(b){var a=tinygpses[b];if(a.isrunning){var c=a.startprogression+((new Date).getTime()-a.starttime)/1E3/a.duration*a.speed;1<c?(a.progression=1,a.isrunning=!1,draw(a.index)):(a.progression=c,draw(a.index),setTimeout(function(){watchticking(b)},a.drawinterval))}}
function init(b,a){this.index=a;xmlhttp=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");xmlhttp.open("GET",b,!1);xmlhttp.send();restext=xmlhttp.responseText;var c=restext.split("\n"),e=!1,f="undef";for(i=0;i<c.length;i++){var d=c[i].split(":");"MAP"==d[0]?f=d[1]:"SPEED"==d[0]?this.speed=1*d[1]:"TIME"==d[0]?this.startwatchtime=1*d[1]:"DESC"==d[0]?this.desc=d[1]:"DATA"==d[0]?(this.tracks[this.tracks.length]=new track(d[1]),e=!0):e&&this.addtrackpoint(this.tracks.length-
1,c[i])}this.map=new Image;this.map.src=f;this.map.onload=function(){setready(a);draw(a)}}function addtrackpoint(b,a){var c=a.split("|");3>c.length||(this.tracks[b].trackpoints[this.tracks[b].pointcount]=new trackpoint(0.1*c[0],0.1*c[1],0.1*c[2]),this.tracks[b].pointcount++,0.1*c[0]>this.duration&&(this.duration=0.1*c[0]))}function setready(b){tgps=tinygpses[b];tgps.ready=!0;draw(b);document.getElementById(tgps.canvas).onclick=function(a){clicked(b,a)}}
function clicked(b,a){tgps=tinygpses[b];isr=tgps.isrunning;var c=0,e=0,f=0,d=0,f=document.getElementById(tgps.canvas);do c+=f.offsetLeft,e+=f.offsetTop;while(f=f.offsetParent);f=a.pageX-c;d=a.pageY-e;if(d>watchy-1&&d<watchy+watchfont+5&&f>watchx+watchwi+9&&f<watchx+watchwi+10+4*buttonwi+1)switch(Math.floor((f-(watchx+watchwi+10))/buttonwi)){case 0:forward(b,-1);break;case 1:forward(b,-0.1);break;case 2:forward(b,0.1);break;case 3:forward(b,1)}else isr?pause(b):play(b)}
function gettimestring(b){var a=0>b;a&&(b*=-1);var c=Math.floor(b%86400/3600),e=Math.floor((b%86400-3600*c)/60),b=Math.floor(b%86400-3600*c-60*e);return(a?"-":"")+(10>c?"0":"")+c+":"+(10>e?"0":"")+e+":"+(10>b?"0":"")+b}
function draw(b){tgps=tinygpses[b];var a=document.getElementById(tgps.canvas),b=a.width,c=a.height,a=a.getContext("2d");a.drawImage(tgps.map,0,0);var e=tgps.progression*tgps.duration,f=tgps.startwatchtime+e;for(it=0;it<tgps.tracks.length;it++){var d=tgps.tracks[it];a.globalAlpha=0.7;var l=0;if(0<d.pointcount){a.strokeStyle=colors[it%5];a.lineWidth=5;for(var g=d.pointcount-1;0<g&&d.trackpoints[g-1].time>e;)g--;var h=d.getmapxy(e,!0,g),k=d.getmapxy(e,!1,g);d.mapxtodraw=h;d.mapytodraw=k;a.beginPath();
a.moveTo(h,k);for(j=g-1;-1<j;j--)h=d.trackpoints[j].x,k=d.trackpoints[j].y,a.lineTo(h,k),l++,500<l&&(a.lineJoin="round",a.stroke(),l=0,a.beginPath(),a.moveTo(h,k));a.lineJoin="round";a.stroke();a.globalAlpha=1}}a.font="Bold "+deffont+"px Verdana";a.lineWidth=1;a.strokeStyle="#000";for(it=0;it<tgps.tracks.length;it++)d=tgps.tracks[it],0<d.pointcount&&0<d.def.length&&(a.arc(d.mapxtodraw,d.mapytodraw,5,0,2*Math.PI,!0),a.fillStyle=colors[it%5],a.fillText(d.def,d.mapxtodraw+5,d.mapytodraw-5),a.strokeText(d.def,
d.mapxtodraw+5,d.mapytodraw-5));for(it=0;it<tgps.tracks.length;it++)d=tgps.tracks[it],0<d.pointcount&&(a.beginPath(),a.arc(d.mapxtodraw,d.mapytodraw,5,0,2*Math.PI,!0),a.closePath(),a.strokeStyle="black",a.lineWidth=2,a.fillStyle=colors[it%5],a.fill(),a.stroke());0==watchwi&&(a.font="Bold "+watchfont+"px Verdana",watchwi=a.measureText(" 88:88:88 ").width);a.fillStyle="#fff";a.globalAlpha=0.5;fillRoundedRect(a,watchx+watchwi+10,watchy,4*buttonwi,watchfont+4,5);a.globalAlpha=1;a.strokeStyle="#000";strokeRoundedRect(a,
watchx+watchwi+10,watchy,4*buttonwi,watchfont+4,5);a.fillStyle="#000";a.beginPath();a.moveTo(watchx+watchwi+10+1.3*buttonwi,watchy+(watchfont+4)/2);a.lineTo(watchx+watchwi+10+1.7*buttonwi,watchy+0.2*(watchfont+4));a.lineTo(watchx+watchwi+10+1.7*buttonwi,watchy+0.8*(watchfont+4));a.closePath();a.stroke();a.beginPath();a.moveTo(watchx+watchwi+10+2.7*buttonwi,watchy+(watchfont+4)/2);a.lineTo(watchx+watchwi+10+2.3*buttonwi,watchy+0.2*(watchfont+4));a.lineTo(watchx+watchwi+10+2.3*buttonwi,watchy+0.8*(watchfont+
4));a.closePath();a.stroke();a.fillStyle="#000";a.beginPath();a.moveTo(watchx+watchwi+10+0.25*buttonwi,watchy+(watchfont+4)/2);a.lineTo(watchx+watchwi+10+0.65*buttonwi,watchy+0.2*(watchfont+4));a.lineTo(watchx+watchwi+10+0.65*buttonwi,watchy+0.8*(watchfont+4));a.fill();a.rect(watchx+watchwi+10+0.7*buttonwi,watchy+0.2*(watchfont+4),0.1*buttonwi,0.6*(watchfont+4));a.fill();a.fillStyle="#000";a.beginPath();a.moveTo(watchx+watchwi+10+3.75*buttonwi,watchy+(watchfont+4)/2);a.lineTo(watchx+watchwi+10+3.35*
buttonwi,watchy+0.2*(watchfont+4));a.lineTo(watchx+watchwi+10+3.35*buttonwi,watchy+0.8*(watchfont+4));a.fill();a.rect(watchx+watchwi+10+3.2*buttonwi,watchy+0.2*(watchfont+4),0.1*buttonwi,0.6*(watchfont+4));a.fill();a.font="Bold "+watchfont+"px Verdana";e=gettimestring(f);f=a.measureText(e).width;a.globalAlpha=1;a.fillStyle="#fff";a.strokeStyle="#000";a.lineWidth=2;fillRoundedRect(a,watchx,watchy,watchwi,watchfont+4,5);strokeRoundedRect(a,watchx,watchy,watchwi,watchfont+4,5);a.fillStyle="#000";a.fillText(e,
watchx+watchwi/2-f/2,watchy+watchfont);e=tgps.progression*b;a.fillStyle="#000";a.beginPath();a.rect(0,0,e,watchy-2);a.fill();tgps.firsttime&&(a.fillStyle="#fff",a.globalAlpha=0.7,a.rect(0,0,b,c),a.fill(),a.globalAlpha=1);tgps.firsttime&&(a.font="Bold 30px Verdana",a.fillStyle="#000",a.globalAlpha=1,e=a.measureText("CLICK TO PLAY").width,a.shadowColor="#999",a.shadowOffsetX=3,a.shadowOffsetY=3,a.fillText("CLICK TO PLAY",b/2-e/2,c/2),a.globalAlpha=1,a.font="900 25px Arial",a.fillStyle="#fff",a.shadowColor=
"#000",a.shadowOffsetX=0,a.shadowOffsetY=0,a.shadowBlur=5,a.lineWidth=1,e=a.measureText("gps").width,a.fillText("gps",b/2-e/2,c/2+42),e=a.measureText("seuranta").width,a.fillText("seuranta",b/2-e/2,c/2+66),e=a.measureText(".net").width,a.fillText(".net",b/2-e/2,c/2+90),a.shadowOffsetX=0,a.shadowOffsetY=0,a.shadowBlur=0);0<tgps.desc.length&&(a.font="Bold "+descfont+"px Verdana",a.globalAlpha=0.7,a.fillStyle="#fff",a.beginPath(),a.rect(0,c-descfont-6,b,descfont+6),a.fill(),e=a.measureText(tgps.desc).width,
a.globalAlpha=1,a.fillStyle="#000",a.fillText(tgps.desc,b/2-e/2,c-5))}
function getmapxy(b,a,c){var e=-1E5;return b<=this.trackpoints[0].time?a?this.trackpoints[0].x:this.trackpoints[0].y:b>this.trackpoints[this.pointcount-1].time?a?this.trackpoints[this.pointcount-1].x:this.trackpoints[this.pointcount-1].y:e=a?(b-this.trackpoints[c-1].time)/(this.trackpoints[c].time-this.trackpoints[c-1].time)*(this.trackpoints[c].x-this.trackpoints[c-1].x)+this.trackpoints[c-1].x:(b-this.trackpoints[c-1].time)/(this.trackpoints[c].time-this.trackpoints[c-1].time)*(this.trackpoints[c].y-
this.trackpoints[c-1].y)+this.trackpoints[c-1].y}function fillRoundedRect(b,a,c,e,f,d){b.beginPath();b.moveTo(a+d,c);b.lineTo(a+e-d,c);b.quadraticCurveTo(a+e,c,a+e,c+d);b.lineTo(a+e,c+f-d);b.quadraticCurveTo(a+e,c+f,a+e-d,c+f);b.lineTo(a+d,c+f);b.quadraticCurveTo(a,c+f,a,c+f-d);b.lineTo(a,c+d);b.quadraticCurveTo(a,c,a+d,c);b.fill()}
function strokeRoundedRect(b,a,c,e,f,d){b.beginPath();b.moveTo(a+d,c);b.lineTo(a+e-d,c);b.quadraticCurveTo(a+e,c,a+e,c+d);b.lineTo(a+e,c+f-d);b.quadraticCurveTo(a+e,c+f,a+e-d,c+f);b.lineTo(a+d,c+f);b.quadraticCurveTo(a,c+f,a,c+f-d);b.lineTo(a,c+d);b.quadraticCurveTo(a,c,a+d,c);b.stroke()}
function gettimestring(b){var a=0>b;a&&(b*=-1);var c=Math.floor(b%86400/3600),e=Math.floor((b%86400-3600*c)/60),b=Math.floor(b%86400-3600*c-60*e);return(a?"-":"")+(10>c?"0":"")+c+":"+(10>e?"0":"")+e+":"+(10>b?"0":"")+b};