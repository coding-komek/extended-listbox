/* Extended Listbox 1.1.3; (c) 2016 Christian Kotzbauer; BSD-3-Clause License */ 
var __extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)},EL;!function(t){"use strict";var e=function(){function t(){this.text=null,this.id=null,this.index=null,this.disabled=!1,this.selected=!1,this.groupHeader=!1,this.parentGroupId=null,this.childItems=[]}return t}();t.ListboxItem=e}(EL||(EL={}));var EL;!function(t){"use strict";var e=function(){function t(){this.visible=!1,this.icon=null,this.onClick=null}return t}();t.ListboxSearchBarButtonOptions=e}(EL||(EL={}));var EL;!function(t){"use strict";var e=function(){function t(t,e,i){this.eventName=t,this.target=e,this.args=i}return t.VALUE_CHANGED="valueChanged",t.FILTER_CHANGED="filterChanged",t.ITEMS_CHANGED="itemsChanged",t.ITEM_ENTER_PRESSED="itemEnterPressed",t.ITEM_DOUBLE_CLICKED="itemDoubleClicked",t}();t.ListboxEvent=e}(EL||(EL={}));var EL;!function(t){"use strict";var e=function(){function e(){this.searchBar=!1,this.searchBarWatermark="Search...",this.searchBarButton=new t.ListboxSearchBarButtonOptions,this.multiple=!1,this.getItems=null,this.onValueChanged=null,this.onFilterChanged=null,this.onItemsChanged=null,this.onItemEnterPressed=null,this.onItemDoubleClicked=null}return e}();t.ListboxSettings=e}(EL||(EL={}));var EL;!function(t){"use strict";var e=function(){function e(t){this.listBox=t}return e.prototype.fire=function(e,i,n){if(i){var s=new t.ListboxEvent(e,this.listBox._target,n);i(s)}},e.prototype.fireValueChangedEvent=function(e){this.fire(t.ListboxEvent.VALUE_CHANGED,this.listBox._settings.onValueChanged,e)},e.prototype.fireItemsChangedEvent=function(e){this.fire(t.ListboxEvent.ITEMS_CHANGED,this.listBox._settings.onItemsChanged,e)},e.prototype.fireFilterChangedEvent=function(e){this.fire(t.ListboxEvent.FILTER_CHANGED,this.listBox._settings.onFilterChanged,e)},e.prototype.fireItemEnterPressedEvent=function(e){this.fire(t.ListboxEvent.ITEM_ENTER_PRESSED,this.listBox._settings.onItemEnterPressed,e)},e.prototype.fireItemDoubleClickedEvent=function(e){this.fire(t.ListboxEvent.ITEM_DOUBLE_CLICKED,this.listBox._settings.onItemDoubleClicked,e)},e}();t.ListboxEventHandler=e}(EL||(EL={}));var EL;!function(t){"use strict";var e=function(){function e(e,i){this._target=e,this._settings=i,this.eventHandler=new t.ListboxEventHandler(this),this._createListbox()}return e.prototype._createListbox=function(){this._target.addClass(e.MAIN_CLASS),this._settings.searchBar&&this._createSearchbar(),this._createList()},e.prototype._createSearchbar=function(){var t=$("<div>").addClass(e.SEARCHBAR_CLASS+"-wrapper").appendTo(this._target),i=$("<input>").addClass(e.SEARCHBAR_CLASS).appendTo(t).attr("placeholder",this._settings.searchBarWatermark),n=this;if(i.keyup(function(){var t=$(this).val().toLowerCase();""!==t?(n._list.find("."+e.LIST_ITEM_CLASS).each(function(){var i=$(this);if(!i.hasClass(e.LIST_ITEM_CLASS_GROUP)){var n=i.text().toLowerCase();-1!==n.search("^"+t)?(i.css("display","block"),i.parent().css("display","block")):i.css("display","none")}}),n._list.find("."+e.LIST_ITEM_CLASS_GROUP).each(function(){var t=$(this);0===t.children(":visible").length?t.css("display","none"):t.css("display","block")})):n._list.find("."+e.LIST_ITEM_CLASS).each(function(){$(this).css("display","block")}),n.onFilterChange&&n.onFilterChange()}),this._settings.searchBarButton.visible){var s=$("<button>").attr("id","searchBarButton").attr("tabindex","-1").addClass(e.SEARCHBAR_BUTTON_CLASS).appendTo(t);this._settings.searchBarButton.onClick&&s.click(this._settings.searchBarButton.onClick),$("<i>").addClass(this._settings.searchBarButton.icon).appendTo(s)}this._searchbarWrapper=t,this._searchbar=i},e.prototype._createList=function(){if(this._list=$("<div>").addClass(e.LIST_CLASS).appendTo(this._target),this._resizeListToListbox(),this._settings.getItems){var t=this._settings.getItems();if(t){var i;for(i in t)this.addItem(this._prepareDataItem(t[i]),!0)}}},e.prototype._generateItemId=function(){var t=parseInt(""+1e7*Math.random(),10);return"listboxitem"+t},e.prototype._prepareDataItem=function(e){var i=new t.ListboxItem;if(e.id||(i.id=this._generateItemId()),"string"==typeof e||"number"==typeof e)return i.text=e,i;i=$.extend(i,e);var n,s=[];for(n in i.childItems)s.push(this._prepareDataItem(i.childItems[n]));return i.childItems=s,i},e.prototype._addItem=function(t,i,n){var s=this,o=$("<div>").addClass(e.LIST_ITEM_CLASS).text(t.text).attr("id",t.id).attr("title",t.text).attr("tabindex","1").data("dataItem",t).keydown(function(t){var i=$(t.target);i.hasClass(e.LIST_ITEM_CLASS_GROUP)||2!==t.eventPhase||(13===t.which?s.onItemEnterPressed(i):38===t.which?(t.preventDefault(),s.onItemArrowUp(i)):40===t.which&&(t.preventDefault(),s.onItemArrowDown(i)))}).click(function(){s.onItemClick($(this))}).dblclick(function(){var t=$(this);t.hasClass(e.LIST_ITEM_CLASS_GROUP)||s.onItemDoubleClicked(t)});if(t.disabled&&o.addClass(e.LIST_ITEM_CLASS_DISABLED),t.groupHeader&&o.addClass(e.LIST_ITEM_CLASS_GROUP),t.selected&&this.onItemClick(o),t.parentGroupId){var r=this.locateItem(t.parentGroupId);r&&(n=r)}n&&o.addClass(e.LIST_ITEM_CLASS_CHILD);var a=n?n:this._list;if(void 0===t.index||null===t.index||i?o.appendTo(a):(a=a.children().eq(t.index),o.insertBefore(a)),t.childItems&&t.childItems.length>0){o.hasClass(e.LIST_ITEM_CLASS_GROUP)||o.addClass(e.LIST_ITEM_CLASS_GROUP);var l;for(l=0;l<t.childItems.length;l++){var h=t.childItems[l];this._addItem(h,i,o)}}return t.id},e.prototype.addItem=function(t,e){e||this._settings.multiple||!t.selected||this.clearSelection(e);var i=this._addItem(this._prepareDataItem(t),e,null);return e||this.eventHandler.fireItemsChangedEvent(this.getItems()),i},e.prototype.removeItem=function(t){var e=this.locateItem(t);e&&(this._clearItemSelection(e),e.remove(),this.eventHandler.fireItemsChangedEvent(this.getItems()))},e.prototype.destroy=function(){this._target.children().remove(),this._target.removeClass(e.MAIN_CLASS)},e.prototype._resizeListToListbox=function(){var t=this._target.height();this._settings.searchBar&&(t-=this._searchbarWrapper.outerHeight(!0)),this._list.height(t)},e.prototype.clearSelection=function(t){var i=this._list.find("."+e.LIST_ITEM_CLASS);i.removeClass(e.LIST_ITEM_CLASS_SELECTED);var n;for(n=0;n<i.length;n++)$(i[n]).data("dataItem").selected=!1;this._settings.multiple?this._target.val([]):this._target.val(null),t||this._target.trigger("change")},e.prototype._clearItemSelection=function(t){if(t.removeClass(e.LIST_ITEM_CLASS_SELECTED),t.data("dataItem").selected=!1,this._settings.multiple){var i=this._target.val();if(i){var n=i.indexOf(JSON.stringify(t.data("dataItem")));i.splice(n,1),this._target.val(i)}}else this._target.val(null);this._target.trigger("change")},e.prototype.getItem=function(t){var e=null,i=this.locateItem(t);return i&&(e=i.data("dataItem")),e},e.prototype.getItems=function(){var t,e=[],i=this._list.children();for(t=0;t<i.length;t++)e.push($(i[t]).data("dataItem"));return e},e.prototype.moveItemUp=function(t){var e=null,i=this.locateItem(t);return i&&(i.insertBefore(i.prev()),e=i.index(),i.data("dataItem").index=e),this.eventHandler.fireItemsChangedEvent(this.getItems()),e},e.prototype.moveItemDown=function(t){var e=null,i=this.locateItem(t);return i&&(i.insertAfter(i.next()),e=i.index(),i.data("dataItem").index=e),this.eventHandler.fireItemsChangedEvent(this.getItems()),e},e.prototype.moveItemToTop=function(t){var e=null,i=this.locateItem(t);return i&&(i.parent().prepend(i),e=i.index(),i.data("dataItem").index=e),this.eventHandler.fireItemsChangedEvent(this.getItems()),e},e.prototype.moveItemToBottom=function(t){var e=null,i=this.locateItem(t);return i&&(i.parent().append(i),e=i.index(),i.data("dataItem").index=e),this.eventHandler.fireItemsChangedEvent(this.getItems()),e},e.prototype.enable=function(t){t?this._target.removeClass(e.MAIN_DISABLED_CLASS):this._target.hasClass(e.MAIN_DISABLED_CLASS)||this._target.addClass(e.MAIN_DISABLED_CLASS)},e.prototype.locateItem=function(t){var e=$("#"+t,this._list);return 0===e.length&&(e=$('div[title="'+t+'"]')),0===e.length&&(e=null),e},e.prototype.onItemEnterPressed=function(t){this.eventHandler.fireItemEnterPressedEvent(t.data("dataItem"))},e.prototype.onItemDoubleClicked=function(t){this.eventHandler.fireItemDoubleClickedEvent(t.data("dataItem"))},e.prototype.onItemArrowUp=function(t){var e=this.findNextItem(t,"prev");e&&(this._clearItemSelection(t),this.onItemClick(e))},e.prototype.onItemArrowDown=function(t){var e=this.findNextItem(t,"next");e&&(this._clearItemSelection(t),this.onItemClick(e))},e.prototype.findNextItem=function(t,i){for(var n=t;;){if(n=n[i](),0===n.length){var s=t.parent();if(1!==s.length)return null;var o=s[i]().children();n=o.length>0?"next"===i?o.first():o.last():s}if(!n.hasClass(e.LIST_ITEM_CLASS_DISABLED))return n}},e.prototype.getSelection=function(){var t=this.getItems(),e=[].concat(t);return t.forEach(function(t){e=e.concat(t.childItems)}),e.filter(function(t){return t.selected})},e.MAIN_CLASS="listbox-root",e.MAIN_DISABLED_CLASS="listbox-disabled",e.LIST_CLASS="listbox",e.LIST_ITEM_CLASS="listbox-item",e.LIST_ITEM_CLASS_DISABLED="listbox-item-disabled",e.LIST_ITEM_CLASS_SELECTED="listbox-item-selected",e.LIST_ITEM_CLASS_GROUP="listbox-item-group",e.LIST_ITEM_CLASS_CHILD="listbox-item-child",e.SEARCHBAR_CLASS="listbox-searchbar",e.SEARCHBAR_BUTTON_CLASS="listbox-searchbar-button",e}();t.BaseListBox=e}(EL||(EL={}));var EL;!function(t){"use strict";var e=function(){function t(){}return t.createFrom=function(e,i){var n=new t;return n.listbox=e,n.target=i,n},t.prototype.addItem=function(t){return this.listbox.addItem(t,!1)},t.prototype.removeItem=function(t){this.listbox.removeItem(t)},t.prototype.destroy=function(){this.listbox.destroy()},t.prototype.clearSelection=function(){this.listbox.clearSelection(!1)},t.prototype.getItem=function(t){return this.listbox.getItem(t)},t.prototype.getItems=function(){return this.listbox.getItems()},t.prototype.getSelection=function(){return this.listbox.getSelection()},t.prototype.moveItemUp=function(t){return this.listbox.moveItemUp(t)},t.prototype.moveItemDown=function(t){return this.listbox.moveItemDown(t)},t.prototype.moveItemToTop=function(t){return this.listbox.moveItemToTop(t)},t.prototype.moveItemToBottom=function(t){return this.listbox.moveItemToBottom(t)},t.prototype.enable=function(t){this.listbox.enable(t)},t.prototype.onValueChanged=function(t){this.listbox._settings.onValueChanged=t},t.prototype.onItemsChanged=function(t){this.listbox._settings.onItemsChanged=t},t.prototype.onFilterChanged=function(t){this.listbox._settings.onFilterChanged=t},t.prototype.onItemEnterPressed=function(t){this.listbox._settings.onItemEnterPressed=t},t.prototype.onItemDoubleClicked=function(t){this.listbox._settings.onItemDoubleClicked=t},t}();t.ExtendedListboxInstance=e}(EL||(EL={}));var EL;!function(t){"use strict";var e=function(e){function i(t,i){e.call(this,t,i)}return __extends(i,e),i.prototype.onItemClick=function(e){if(!e.hasClass(t.BaseListBox.LIST_ITEM_CLASS_DISABLED)&&!e.hasClass(t.BaseListBox.LIST_ITEM_CLASS_GROUP)){var i=this._target.val();if(e.hasClass(t.BaseListBox.LIST_ITEM_CLASS_SELECTED)){e.removeClass(t.BaseListBox.LIST_ITEM_CLASS_SELECTED);var n=i.indexOf(JSON.stringify(e.data("dataItem")));i.splice(n,1),e.data("dataItem").selected=!1}else e.addClass(t.BaseListBox.LIST_ITEM_CLASS_SELECTED),e.data("dataItem").selected=!0,i||(i=[]),i.push(JSON.stringify(e.data("dataItem")));this._target.val(i),this._target.trigger("change"),this.eventHandler.fireValueChangedEvent(i)}},i.prototype.onFilterChange=function(){return void 0},i}(t.BaseListBox);t.MultiSelectListbox=e}(EL||(EL={}));var EL;!function(t){"use strict";var e=function(e){function i(t,i){e.call(this,t,i),this._selectedDomItem=null}return __extends(i,e),i.prototype.onItemClick=function(e){e.hasClass(t.BaseListBox.LIST_ITEM_CLASS_DISABLED)||e.hasClass(t.BaseListBox.LIST_ITEM_CLASS_GROUP)||(this._selectedDomItem&&(this.clearSelection(!0),this._selectedDomItem=null),e.toggleClass(t.BaseListBox.LIST_ITEM_CLASS_SELECTED),e.focus(),this._selectedDomItem=e,e.data("dataItem").selected=!0,this._target.val(e.data("dataItem")),this._target.trigger("change"),this.eventHandler.fireValueChangedEvent(e.data("dataItem")))},i.prototype.onFilterChange=function(){if(!this._selectedDomItem||!this._selectedDomItem.is(":visible")){var t=this._list.children(":visible").first();t&&t.length>0&&this.onItemClick(t)}this.eventHandler.fireFilterChangedEvent(this._searchbar.val())},i}(t.BaseListBox);t.SingleSelectListbox=e}(EL||(EL={}));var EL;!function(t){"use strict";var e=function(){function t(){}return t.deprecatedMethod=function(t,e,i){void 0===i&&(i=null);var n;n=i?"ExtendedListbox: Method "+t+" is deprecated and "+("will be replaced with "+i+" in "+e+"."):"ExtendedListbox: Method "+t+" is deprecated and will be removed in "+e+".",console.warn(n)},t}();t.Util=e}(EL||(EL={}));var EL;!function(t){"use strict";function e(e){var i=new t.ListboxSettings;i=$.extend(i,e);var n=[],s=null,o=this.length>1,r=function(t){o?n.push(t):s=t};return this.each(function(){var e,n,s=$(this);return s.data("listbox-instance")?void r(s.data("listbox-instance")):(e=i.multiple?new t.MultiSelectListbox(s,i):new t.SingleSelectListbox(s,i),n=t.ExtendedListboxInstance.createFrom(e,s),s.data("listbox",e),s.data("listbox-instance",n),void r(n))}),o?n:s}function i(e,i){var n=["addItem","removeItem","destroy","getItem","getItems","moveItemUp","moveItemDown","clearSelection","enable"],s=null;return this.each(function(){var o=$(this).data("listbox");if(t.Util.deprecatedMethod(e,"2.0.0","corresponding method in class ExtendedListboxInstance"),null==o&&window.console&&console.error)return void console.error("The listbox('"+e+"') method was called on an element that is not using ListBox.");if(-1===$.inArray(e,n))return void console.error(""+e+" is no public API function.");var r=Array.prototype.slice.call(i,1);s=o[e].apply(o,r)}),s}$.fn.listbox=function(t){return"object"!=typeof t&&t?"string"==typeof t?i.call(this,t,arguments):void 0:e.call(this,t)}}(EL||(EL={}));