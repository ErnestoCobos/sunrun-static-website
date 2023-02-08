(function($){Drupal.behaviors.sunrun_zeus_forms={attach:function(context,settings){var form=document.getElementById("zeus-quote-form");function validateForm(field,msg){var input=form.elements[field];input.addEventListener("input",function(e){e.target.setCustomValidity("");if(input.validity.valid){e.target.classList.remove("error");e.target.setCustomValidity("")}else{e.target.classList.add("error");e.target.setCustomValidity(msg)}},false)}if(form){validateForm("zip","Please enter a five digit zip code.");
validateForm("first_name","Please enter your first name.");validateForm("last_name","Please enter your last name.");validateForm("email","Please enter your email address.");validateForm("phone","Please enter your phone number.");if(form.addEventListener)form.addEventListener("submit",trackForm,false);else if(form.attachEvent)form.attachEvent("onsubmit",trackForm)}function trackForm(){var sunrunZipCode=new SunrunZipCode(document.getElementById("zip").value);sunrunZipCode.sr_oot($("#zip").val());if(window.location.pathname.indexOf("calculator")>
-1){ga("send","event","calculator","step 1","submit success");dataLayer.push({"event":"lead-form-submitted"})}window.dataLayer=window.dataLayer||[];dataLayer.push({"category":"quote form","action":"form submit","label":window.location.pathname})}var offer_promotion=$("meta[property=offer_promotion]").attr("content");if(offer_promotion!==undefined)document.getElementById("offerPromoCode").value=offer_promotion;if(typeof settings.sunrun_leadforms!="undefined"&&typeof settings.sunrun_leadforms.form!=
"undefined"&&settings.sunrun_leadforms.form==="standard-leadform-horizontal")if($(".panel-pane.pane-sunrun-leadform > .pane-title").length){$("#standard-leadform-horizontal-headline").text($(".panel-pane.pane-sunrun-leadform > .pane-title").text());$(".panel-pane.pane-sunrun-leadform > .pane-title").remove()}else $("#headline-container").remove()}}})(jQuery);
;/*})'"*/
;/*})'"*/
(function($){Drupal.ajax.prototype.commands.viewsLoadMoreAppend=function(ajax,response,status){var wrapper=response.selector?$(response.selector):$(ajax.wrapper);var method=response.method||ajax.method;var targetList=response.targetList||"";var effect=ajax.getEffect(response);var pager_selector=response.options.pager_selector?response.options.pager_selector:".pager-load-more";var new_content_wrapped=$("<div></div>").html(response.data);var new_content=new_content_wrapped.contents();if(new_content.length!=
1||new_content.get(0).nodeType!=1)new_content=new_content_wrapped;var settings=response.settings||ajax.settings||Drupal.settings;Drupal.detachBehaviors(wrapper,settings);if($.waypoints!=undefined)$.waypoints("refresh");var content_query=targetList&&!response.options.content?"> .view-content "+targetList:response.options.content||"> .view-content";if(effect.showEffect!="show")new_content.find(content_query).children().hide();wrapper.find(pager_selector).replaceWith(new_content.find(pager_selector));
wrapper.find(content_query)[method](new_content.find(content_query).children());wrapper.find(content_query).children().removeClass("views-row-first views-row-last views-row-odd views-row-even").filter(":first").addClass("views-row-first").end().filter(":last").addClass("views-row-last").end().filter(":even").addClass("views-row-odd").end().filter(":odd").addClass("views-row-even").end();if(effect.showEffect!="show")wrapper.find(content_query).children(":not(:visible)")[effect.showEffect](effect.showSpeed);
wrapper.trigger("views_load_more.new_content",new_content.clone());var classes=wrapper.attr("class");var onceClass=classes.match(/jquery-once-[0-9]*-[a-z]*/);wrapper.removeClass(onceClass[0]);settings=response.settings||ajax.settings||Drupal.settings;Drupal.attachBehaviors(wrapper,settings)};Drupal.behaviors.ViewsLoadMore={attach:function(context,settings){var default_opts={offset:"100%"};if(settings&&settings.viewsLoadMore&&settings.views&&settings.views.ajaxViews)$.each(settings.viewsLoadMore,function(i,
setting){var view=".view-id-"+setting.view_name+".view-display-id-"+setting.view_display_id+" .pager-next a",opts={};$.extend(opts,default_opts,settings.viewsLoadMore[i].opts);$(view).waypoint("destroy");$(view).waypoint(function(event,direction){$(view).click()},opts)})},detach:function(context,settings,trigger){if(settings&&settings.viewsLoadMore&&settings.views&&settings.views.ajaxViews)$.each(settings.viewsLoadMore,function(i,setting){var view=".view-id-"+setting.view_name+".view-display-id-"+
setting.view_display_id;if($(context).is(view))$(".pager-next a",view).waypoint("destroy");else $(view,context).waypoint("destroy")})}}})(jQuery);
;/*})'"*/
;/*})'"*/
(function($){Drupal.behaviors.ViewsAjaxView={};Drupal.behaviors.ViewsAjaxView.attach=function(){if(Drupal.settings&&Drupal.settings.views&&Drupal.settings.views.ajaxViews)$.each(Drupal.settings.views.ajaxViews,function(i,settings){Drupal.views.instances[i]=new Drupal.views.ajaxView(settings)})};Drupal.views={};Drupal.views.instances={};Drupal.views.ajaxView=function(settings){var selector=".view-dom-id-"+settings.view_dom_id;this.$view=$(selector);var ajax_path=Drupal.settings.views.ajax_path;if(ajax_path.constructor.toString().indexOf("Array")!=
-1)ajax_path=ajax_path[0];var queryString=window.location.search||"";if(queryString!==""){var queryString=queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/,"");if(queryString!=="")queryString=(/\?/.test(ajax_path)?"&":"?")+queryString}this.element_settings={url:ajax_path+queryString,submit:settings,setClick:true,event:"click",selector:selector,progress:{type:"throbber"}};this.settings=settings;this.$exposed_form=$("#views-exposed-form-"+settings.view_name.replace(/_/g,"-")+"-"+settings.view_display_id.replace(/_/g,
"-"));this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax,this));this.links=[];this.$view.once(jQuery.proxy(this.attachPagerAjax,this));var self_settings=this.element_settings;self_settings.event="RefreshView";var self=this;this.$view.once("refresh",function(){self.refreshViewAjax=new Drupal.ajax(self.selector,self.$view,self_settings)})};Drupal.views.ajaxView.prototype.attachExposedFormAjax=function(){var button=$("input[type=submit], button[type=submit], input[type=image]",this.$exposed_form);
button=button[0];$(button).click(function(){if(Drupal.autocompleteSubmit)Drupal.autocompleteSubmit()});this.exposedFormAjax=new Drupal.ajax($(button).attr("id"),button,this.element_settings)};Drupal.views.ajaxView.prototype.attachPagerAjax=function(){this.$view.find("ul.pager > li > a, ol.pager > li > a, th.views-field a, .attachment .views-summary a").each(jQuery.proxy(this.attachPagerLinkAjax,this))};Drupal.views.ajaxView.prototype.attachPagerLinkAjax=function(id,link){var $link=$(link);var viewData=
{};var href=$link.attr("href");if($link.closest(".view")[0]!==this.$view[0]&&$link.closest(".view").parent().hasClass("attachment")===false)return;if(typeof viewData.page==="undefined")viewData.page=0;$.extend(viewData,this.settings,Drupal.Views.parseQueryString(href),Drupal.Views.parseViewArgs(href,this.settings.view_base_path));$.extend(viewData,Drupal.Views.parseViewArgs(href,this.settings.view_base_path));this.element_settings.submit=viewData;this.pagerAjax=new Drupal.ajax(false,$link,this.element_settings);
this.links.push(this.pagerAjax)};Drupal.ajax.prototype.commands.viewsScrollTop=function(ajax,response,status){var offset=$(response.selector).offset();var scrollTarget=response.selector;while($(scrollTarget).scrollTop()==0&&$(scrollTarget).parent())scrollTarget=$(scrollTarget).parent();if(offset.top-10<$(scrollTarget).scrollTop())$(scrollTarget).animate({scrollTop:offset.top-10},500)}})(jQuery);
;/*})'"*/
;/*})'"*/
/**
 * @file
 * Integrate Sidr library with Responsive Menus.
 */
(function ($) {
  /**
   * Preparation for each element Sidr will affect.
   */
  function sidr_it(menuElement, ind, iteration, $windowWidth) {
    // Only apply if window size is correct.
    var $media_size = iteration.media_size || 768;
    // Call Sidr with our settings.
    $(menuElement).once('responsive-menus-sidr', function () {
      var $id = 'sidr-' + ind;
      var $wrapper_id = 'sidr-wrapper-' + ind;
      $(this).before(
        '<div id="' +
          $wrapper_id +
          '"><a title="menu button" id="' +
          $id +
          '-button" href="#' +
          $id +
          '">' +
          iteration.trigger_txt +
          '</a></div>'
      );
      $('#' + $wrapper_id).hide();
      if ($windowWidth <= $media_size) {
        $('#' + $wrapper_id).show();
        $(this).hide();
      }
      // Set 1/0 to true/false respectively.
      $.each(iteration, function (key, value) {
        if (value == 0) {
          iteration[key] = false;
        }
        if (value == 1) {
          iteration[key] = true;
        }
      });
      // Sidr power go.
      $('#' + $id + '-button').sidr({
        name: $id || 'sidr',
        speed: parseInt(iteration.speed) || 200,
        side: iteration.side || 'left',
        source: iteration.selectors[ind] || '#main-menu',
        displace: iteration.displace,
        renaming: iteration.renaming,
        onOpen:
          function () {
            eval(iteration.onOpen);
          } || function () {},
        onClose:
          function () {
            eval(iteration.onClose);
          } || function () {},
      });
    });
  }

  /**
   * Main loop.
   */
  Drupal.behaviors.responsive_menus_sidr = {
    attach: function (context, settings) {
      settings.responsive_menus = settings.responsive_menus || {};
      var $windowWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      $.each(settings.responsive_menus, function (ind, iteration) {
        if (iteration.responsive_menus_style != 'sidr') {
          return true;
        }
        if (!iteration.selectors.length) {
          return;
        }
        // Iterate each selector.
        $.each(iteration.selectors, function (index, value) {
          // Stop if there is no menu element.
          if ($(value).length < 1) {
            return true;
          }
          // Multi-level (selector hits multiple ul's).
          if ($(value).length > 1) {
            $(value).each(function (val_index) {
              if (!$(this).parents('ul').length) {
                sidr_it(this, index, iteration, $windowWidth);
              }
            });
          } else {
            // Single level.
            sidr_it(value, index, iteration, $windowWidth);
          }
        });
      });

      // Handle window resizing.
      $(window).resize(function () {
        // Window width with legacy browsers.
        $windowWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        $.each(settings.responsive_menus, function (ind, iteration) {
          if (iteration.responsive_menus_style != 'sidr') {
            return true;
          }
          if (!iteration.selectors.length) {
            return;
          }
          // Iterate each selector.
          $.each(iteration.selectors, function (index, value) {
            // Stop if there is no menu element.
            if ($(value).length < 1) {
              return true;
            }
            var $wrapper_id = 'sidr-wrapper-' + index;
            $media_size = iteration.media_size || 768;
            if ($windowWidth <= $media_size) {
              if (!$(value).hasClass('sidr-hidden')) {
                $('#' + $wrapper_id).show();
                $(value).hide().addClass('sidr-hidden');
              }
            } else {
              if ($(value).hasClass('sidr-hidden')) {
                $('#' + $wrapper_id).hide();
                $(value).show().removeClass('sidr-hidden');
              }
            }
          });
        });
      });
    },
  };
})(jQuery);

;/*})'"*/
;/*})'"*/
/*! sidr - v2.2.1 - 2016-02-17
 * http://www.berriart.com/sidr/
 * Copyright (c) 2013-2016 Alberto Varela; Licensed MIT */
!function(){"use strict";function a(a,b,c){var d=new o(b);switch(a){case"open":d.open(c);break;case"close":d.close(c);break;case"toggle":d.toggle(c);break;default:p.error("Method "+a+" does not exist on jQuery.sidr")}}function b(a){return"status"===a?h:s[a]?s[a].apply(this,Array.prototype.slice.call(arguments,1)):"function"!=typeof a&&"string"!=typeof a&&a?void q.error("Method "+a+" does not exist on jQuery.sidr"):s.toggle.apply(this,arguments)}function c(a,b){if("function"==typeof b.source){var c=b.source(name);a.html(c)}else if("string"==typeof b.source&&i.isUrl(b.source))u.get(b.source,function(b){a.html(b)});else if("string"==typeof b.source){var d="",e=b.source.split(",");if(u.each(e,function(a,b){d+='<ul class="sidr-inner">'+u(b).html()+"</ul>"}),b.renaming){var f=u("<div />").html(d);f.find("*").each(function(a,b){var c=u(b);i.addPrefixes(c)}),d=f.html()}a.html(d)}else null!==b.source&&u.error("Invalid Sidr Source");return a}function d(a){var d=i.transitions,e=u.extend({name:"sidr",speed:200,side:"left",source:null,renaming:!0,body:"body",displace:!0,timing:"ease",method:"toggle",bind:"touchstart click",onOpen:function(){},onClose:function(){},onOpenEnd:function(){},onCloseEnd:function(){}},a),f=e.name,g=u("#"+f);return 0===g.length&&(g=u("<div />").attr("id",f).appendTo(u("body"))),d.supported&&g.css(d.property,e.side+" "+e.speed/1e3+"s "+e.timing),g.addClass("sidr").addClass(e.side).data({speed:e.speed,side:e.side,body:e.body,displace:e.displace,timing:e.timing,method:e.method,onOpen:e.onOpen,onClose:e.onClose,onOpenEnd:e.onOpenEnd,onCloseEnd:e.onCloseEnd}),g=c(g,e),this.each(function(){var a=u(this),c=a.data("sidr"),d=!1;c||(h.moving=!1,h.opened=!1,a.data("sidr",f),a.bind(e.bind,function(a){a.preventDefault(),d||(d=!0,b(e.method,f),setTimeout(function(){d=!1},100))}))})}var e={};e.classCallCheck=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},e.createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();var f,g,h={moving:!1,opened:!1},i={isUrl:function(a){var b=new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i");return b.test(a)?!0:!1},addPrefixes:function(a){this.addPrefix(a,"id"),this.addPrefix(a,"class"),a.removeAttr("style")},addPrefix:function(a,b){var c=a.attr(b);"string"==typeof c&&""!==c&&"sidr-inner"!==c&&a.attr(b,c.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-"+b+"-$1"))},transitions:function(){var a=document.body||document.documentElement,b=a.style,c=!1,d="transition";return d in b?c=!0:!function(){var a=["moz","webkit","o","ms"],e=void 0,f=void 0;d=d.charAt(0).toUpperCase()+d.substr(1),c=function(){for(f=0;f<a.length;f++)if(e=a[f],e+d in b)return!0;return!1}(),d=c?"-"+e.toLowerCase()+"-"+d.toLowerCase():null}(),{supported:c,property:d}}()},j=jQuery,k="sidr-animating",l="open",m="close",n="webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",o=function(){function a(b){e.classCallCheck(this,a),this.name=b,this.item=j("#"+b),this.openClass="sidr"===b?"sidr-open":"sidr-open "+b+"-open",this.menuWidth=this.item.outerWidth(!0),this.speed=this.item.data("speed"),this.side=this.item.data("side"),this.displace=this.item.data("displace"),this.timing=this.item.data("timing"),this.method=this.item.data("method"),this.onOpenCallback=this.item.data("onOpen"),this.onCloseCallback=this.item.data("onClose"),this.onOpenEndCallback=this.item.data("onOpenEnd"),this.onCloseEndCallback=this.item.data("onCloseEnd"),this.body=j(this.item.data("body"))}return e.createClass(a,[{key:"getAnimation",value:function(a,b){var c={},d=this.side;return"open"===a&&"body"===b?c[d]=this.menuWidth+"px":"close"===a&&"menu"===b?c[d]="-"+this.menuWidth+"px":c[d]=0,c}},{key:"prepareBody",value:function(a){var b="open"===a?"hidden":"";if(this.body.is("body")){var c=j("html"),d=c.scrollTop();c.css("overflow-x",b).scrollTop(d)}}},{key:"openBody",value:function(){if(this.displace){var a=i.transitions,b=this.body;if(a.supported)b.css(a.property,this.side+" "+this.speed/1e3+"s "+this.timing).css(this.side,0).css({width:b.width(),position:"absolute"}),b.css(this.side,this.menuWidth+"px");else{var c=this.getAnimation(l,"body");b.css({width:b.width(),position:"absolute"}).animate(c,{queue:!1,duration:this.speed})}}}},{key:"onCloseBody",value:function(){var a=i.transitions,b={width:"",position:"",right:"",left:""};a.supported&&(b[a.property]=""),this.body.css(b).unbind(n)}},{key:"closeBody",value:function(){var a=this;if(this.displace)if(i.transitions.supported)this.body.css(this.side,0).one(n,function(){a.onCloseBody()});else{var b=this.getAnimation(m,"body");this.body.animate(b,{queue:!1,duration:this.speed,complete:function(){a.onCloseBody()}})}}},{key:"moveBody",value:function(a){a===l?this.openBody():this.closeBody()}},{key:"onOpenMenu",value:function(a){var b=this.name;h.moving=!1,h.opened=b,this.item.unbind(n),this.body.removeClass(k).addClass(this.openClass),this.onOpenEndCallback(),"function"==typeof a&&a(b)}},{key:"openMenu",value:function(a){var b=this,c=this.item;if(i.transitions.supported)c.css(this.side,0).one(n,function(){b.onOpenMenu(a)});else{var d=this.getAnimation(l,"menu");c.css("display","block").animate(d,{queue:!1,duration:this.speed,complete:function(){b.onOpenMenu(a)}})}}},{key:"onCloseMenu",value:function(a){this.item.css({left:"",right:""}).unbind(n),j("html").css("overflow-x",""),h.moving=!1,h.opened=!1,this.body.removeClass(k).removeClass(this.openClass),this.onCloseEndCallback(),"function"==typeof a&&a(name)}},{key:"closeMenu",value:function(a){var b=this,c=this.item;if(i.transitions.supported)c.css(this.side,"").one(n,function(){b.onCloseMenu(a)});else{var d=this.getAnimation(m,"menu");c.animate(d,{queue:!1,duration:this.speed,complete:function(){b.onCloseMenu()}})}}},{key:"moveMenu",value:function(a,b){this.body.addClass(k),a===l?this.openMenu(b):this.closeMenu(b)}},{key:"move",value:function(a,b){h.moving=!0,this.prepareBody(a),this.moveBody(a),this.moveMenu(a,b)}},{key:"open",value:function(b){var c=this;if(h.opened!==this.name&&!h.moving){if(h.opened!==!1){var d=new a(h.opened);return void d.close(function(){c.open(b)})}this.move("open",b),this.onOpenCallback()}}},{key:"close",value:function(a){h.opened!==this.name||h.moving||(this.move("close",a),this.onCloseCallback())}},{key:"toggle",value:function(a){h.opened===this.name?this.close(a):this.open(a)}}]),a}(),p=jQuery,q=jQuery,r=["open","close","toggle"],s={},t=function(b){return function(c,d){"function"==typeof c?(d=c,c="sidr"):c||(c="sidr"),a(b,c,d)}};for(f=0;f<r.length;f++)g=r[f],s[g]=t(g);var u=jQuery;jQuery.sidr=b,jQuery.fn.sidr=d}();

;/*})'"*/
;/*})'"*/
