(function($){Drupal.FieldGroup=Drupal.FieldGroup||{};Drupal.FieldGroup.Effects=Drupal.FieldGroup.Effects||{};Drupal.FieldGroup.groupWithfocus=null;Drupal.FieldGroup.setGroupWithfocus=function(element){element.css({display:"block"});Drupal.FieldGroup.groupWithfocus=element};Drupal.FieldGroup.Effects.processFieldset={execute:function(context,settings,type){if(type=="form")$("fieldset.fieldset",context).once("fieldgroup-effects",function(i){if($(this).is(".required-fields")&&$(this).find(".form-required").length>
0)$("legend span.fieldset-legend",$(this)).eq(0).append(" ").append($(".form-required").eq(0).clone());if($(".error",$(this)).length){$("legend span.fieldset-legend",$(this)).eq(0).addClass("error");Drupal.FieldGroup.setGroupWithfocus($(this))}})}};Drupal.FieldGroup.Effects.processAccordion={execute:function(context,settings,type){$("div.field-group-accordion-wrapper",context).once("fieldgroup-effects",function(){var wrapper=$(this);var active_index=false;wrapper.find(".accordion-item").each(function(i){if($(this).hasClass("field-group-accordion-active"))active_index=
i});wrapper.accordion({heightStyle:"content",active:active_index,collapsible:true,changestart:function(event,ui){if($(this).hasClass("effect-none"))ui.options.animated=false;else ui.options.animated="slide"}});if(type=="form"){var $firstErrorItem=false;wrapper.find("div.field-group-accordion-item").each(function(i){if($(this).is(".required-fields")&&$(this).find(".form-required").length>0)$("h3.ui-accordion-header a").eq(i).append(" ").append($(".form-required").eq(0).clone());if($(".error",$(this)).length){if(!$firstErrorItem)$firstErrorItem=
$(this).parent().accordion("activate",i);$("h3.ui-accordion-header").eq(i).addClass("error")}});if(!$firstErrorItem)$(".ui-accordion-content-active",$firstErrorItem).css({height:"auto",width:"auto",display:"block"})}})}};Drupal.FieldGroup.Effects.processHtabs={execute:function(context,settings,type){if(type=="form")$("fieldset.horizontal-tabs-pane",context).once("fieldgroup-effects",function(i){if($(this).is(".required-fields")&&$(this).find(".form-required").length>0)$(this).data("horizontalTab").link.find("strong:first").after($(".form-required").eq(0).clone()).after(" ");
if($(".error",$(this)).length){$(this).data("horizontalTab").link.parent().addClass("error");Drupal.FieldGroup.setGroupWithfocus($(this));$(this).data("horizontalTab").focus()}})}};Drupal.FieldGroup.Effects.processTabs={execute:function(context,settings,type){if(type=="form"){var errorFocussed=false;$("fieldset.vertical-tabs-pane",context).once("fieldgroup-effects",function(i){if($(this).is(".required-fields")&&$(this).find(".form-required").length>0)$(this).data("verticalTab").link.find("strong:first").after($(".form-required").eq(0).clone()).after(" ");
if($(".error",$(this)).length){$(this).data("verticalTab").link.parent().addClass("error");if(!errorFocussed){Drupal.FieldGroup.setGroupWithfocus($(this));$(this).data("verticalTab").focus();errorFocussed=true}}})}}};Drupal.FieldGroup.Effects.processDiv={execute:function(context,settings,type){$("div.collapsible",context).once("fieldgroup-effects",function(){var $wrapper=$(this);var $toggler=$("span.field-group-format-toggler:first",$wrapper);var $link=$('<a class="field-group-format-title" href="#"></a>');
$link.prepend($toggler.contents());if($(this).is(".required-fields")&&$(this).find(".form-required").length>0)$link.append(" ").append($(".form-required").eq(0).clone());$link.appendTo($toggler);$link.click(function(){var wrapper=$wrapper.get(0);if(!wrapper.animating){wrapper.animating=true;var speed=$wrapper.hasClass("speed-fast")?300:1E3;if($wrapper.hasClass("effect-none")&&$wrapper.hasClass("speed-none"))$("> .field-group-format-wrapper",wrapper).toggle();else if($wrapper.hasClass("effect-blind"))$("> .field-group-format-wrapper",
wrapper).toggle("blind",{},speed);else $("> .field-group-format-wrapper",wrapper).toggle(speed);wrapper.animating=false}$wrapper.toggleClass("collapsed");return false})})}};Drupal.behaviors.fieldGroup={attach:function(context,settings){settings.field_group=settings.field_group||Drupal.settings.field_group;if(settings.field_group==undefined)return;$.each(Drupal.FieldGroup.Effects,function(func){var type=func.toLowerCase().replace("process","");if(settings.field_group[type]!=undefined&&$.isFunction(this.execute))this.execute(context,
settings,settings.field_group[type])});$(".fieldset-wrapper .fieldset > legend").css({display:"block"});$(".vertical-tabs fieldset.fieldset").addClass("default-fallback");$(".group-wrapper .horizontal-tabs-panes > fieldset",context).once("group-wrapper-panes-processed",function(){var fieldgroupID="field_group-"+$(this).attr("id");$(this).attr("id",fieldgroupID)});$(".group-wrapper ul li").once("group-wrapper-ul-processed",function(){var fieldGroupNavigationListIndex=$(this).index();$(this).children("a").click(function(){var fieldset=
$(".group-wrapper fieldset").get(fieldGroupNavigationListIndex);var hashUrl=$(fieldset).attr("id").replace(/^field_group-/,"").split(" ")[0];window.location.hash=hashUrl})})}}})(jQuery);
;/*})'"*/
;/*})'"*/
