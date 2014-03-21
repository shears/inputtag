/**
*	v1.0.0
* 	======================================================================
*	input some contents that will represent like tag.
* 	======================================================================
*	2014/3/19 mgwaqir@gmail.com
*   last modified by aqr
*/
(function ($) {
	$.fn.inputTag = function (options) {

		var defaults = {
			separativeSigns: [",", "，", ";", "；"], //default separative signs.
			multi: true,    //if true it can input multi tags, else it can input only one.
			readonly: false
		};

		var settings = $.extend(defaults, options || {});


		/**
		 * trigger function when tag or input focused
		 */
		if (!settings.readonly) {
			$(this).on("focus", ".tag,.input", function () {
				$(this).parent().addClass("input-tag-focus");
			});

			/**
			 * trigger function when tag or input blur
			 */
			$(this).on("blur", ".tag,.input", function () {
				$(this).parent().removeClass("input-tag-focus");
			});

			/**
			 * trigger function when tagInput key down.
			 */
			$(this).children(".input").keydown(function (event) {
				var code = event.keyCode;
				if (code === 8) {//back space
					if (this.selectionStart === 0) {
						var lastTag = $(this).parent().children(".tag:last");
						deleteTag(lastTag);
					}
				} else if (code === 37) {//prev
					if (this.selectionStart === 0 && $(this).parent().children(".tag:last").size() > 0) {
						$(this).parent().children(".tag:last")[0].focus();
					}
				} else if (code === 13) {//next
					addTag(this, $(this).val());
					$(this).val("");
				} else {
					var oldValue = $(this).val();
					$(this).one("keyup", function () {
						inputTagKeyup(this, oldValue);
					});
				}
			});

			/**
			 * trigger events or call functinons when tag keydown.
			 */
			$(this).on("keydown", ".tag", function (event) {
				var code = event.keyCode;
				if (code === 8) {//back space
					if ($(this).prev()[0]) {
						$(this).prev()[0].focus();
					} else {
						if ($(this).next()[0]) {
							$(this).next()[0].focus();
						} else {
							$(this).parent().children(".input")[0].focus();
						}
					}
					deleteTag(this);
				} else if (code === 46) {//Delete
					if ($(this).next()[0]) {
						$(this).next()[0].focus();
					} else {
						$(this).parent().children(".input")[0].focus();
					}
					deleteTag(this);
				} else if (code === 37) {//prev
					if ($(this).prev()[0]) {
						$(this).prev()[0].focus();
					}
				} else if (code === 39) {//next
					if (this === $(this).parent().children(".tag:last")[0]) {
						$(this).parent().children(".input")[0].focus();
					} else {
						$(this).next()[0].focus();
					}
				}
			});
		}else{
			$(this).children(".input").hide();
		}

		/**
		 * set tags if input has text.
		 */
		this.each(function () {
			var val = $.trim($(this).children(".input").val());
			if (val !== "") {
				var arr = [];
				arr.push(val);
				for (var i = 0, rtArr = []; i < settings.separativeSigns.length; i++, arr = rtArr) {
					rtArr = []
					var sign = settings.separativeSigns[i];
					for (var j in arr) {
						var spltArr = arr[j].split(sign);
						for (var k in spltArr) {
							rtArr.push(spltArr[k]);
						}
					}
				}
				for (var i in arr) {
					addTag($(this).children(".input"), arr[i]);
				}
				$(this).children(".input").val("");
			}

		});
		/**
		 * delete tag
		 * @param tag
		 */
		function deleteTag(tag) {
			tag.remove();
		}

		/**
		 * add tag
		 * @param obj : the object of tagInput
		 * @param text : text of new tag created
		 */
		function addTag(obj, text) {
			if (text && $.trim(text) !== "") {
				if (settings.multi || (!settings.multi && $(obj).parent().children(".tag").size() === 0)) {
					$("<span class='tag' tabindex='0'>" + text + "</span>").insertBefore($(obj).parent().children(".input"));
				}
			}
		}

		/**
		 * trigger event when tagInput keyboard
		 * @param obj : the object of tagInput
		 * @param oldValue : the value before keydown
		 */
		function inputTagKeyup(obj, oldValue) {
			var sign = $(obj).val().replace(oldValue, "");
			if (sign.length > 0) {
				sign = sign.substring(0, 1);
			}
			if (($.inArray(settings.separativeSigns, sign) > -1) || sign === " " || sign === " ") {
				addTag(obj, oldValue);
				$(obj).val("");
			}
		}
	};

	/**
	 * get array of tags.
	 * if one and just one tagInput ,the function return single dimensional array
	 * else return double dimensional array, first index as index of inputTag, second index as tag index of inputTag.
	 * @returns {Array}
	 */
	$.fn.getTagsArray = function () {
		var rtArr = [];
		if (this.size() === 1) {
			var $objs = $(this[0]).children(".tag");
			for (var j = 0; j < $objs.size(); j++) {
				rtArr.push($($objs[j]).text());
			}
		} else {
			for (var i = 0; i < this.size(); i++) {
				if ($(this[i]).hasClass("aqr-input")) {
					var $objs = $(this[i]).children(".tag");
					var tempArr = [];
					for (var j = 0; j < $objs.size(); j++) {
						tempArr.push($($objs[j]).text());
					}
					rtArr.push(tempArr);
				}
			}
		}
		return rtArr;
	}

	/**
	 * set the Tags
	 * @param arr
	 */
	$.fn.addTags = function (arr) {
		if (this.hasClass("aqr-input")) {
			if (arr && $.isArray(arr)) {
				for (var i in arr) {
					$("<span class='tag' tabindex='0'>" + arr[i] + "</span>").insertBefore((this.children(".input")));
				}
			}
		}
	}

	/**
	 *
	 */
	$.fn.resetTagInput = function () {
		if (this.hasClass("aqr-input")) {
			this.children(".tag").remove();
			this.children(".input").val("");
		}
	}

})(jQuery);
