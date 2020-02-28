//menuBtn
function MenuFilter(target, parent, chName) {
	this.parent = parent;
  //channelname of the current menu-btn-video
  this.channelName = chName;
	Filter.call(this, target, parent);
}

MenuFilter.prototype = Object.create(Filter.prototype);

MenuFilter.prototype.constructor = MenuFilter;

//clickHandler for the menu-btn
this.menuClickHandler = function(){
  //public variable for the menu in controller.js
  curChanelName = this.channelName;
}

MenuFilter.prototype.onFound = function(child){
  //get the menu-btn and add an blickListener. bind this, so the channelName is in scope
  child.getElementsByClassName("dropdown-trigger style-scope ytd-menu-renderer")[0].addEventListener("click", menuClickHandler.bind(this));
}
