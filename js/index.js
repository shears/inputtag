(function($){
    /* document ready
    ============================================================================== */
    $(function(){
        initComponents();
        addEventListener();
    });

    /* init all components
    ============================================================================== */
    function initComponents(){
        initInputTag();
    }

    /* add event listener to elements.
    ============================================================================== */
    function addEventListener(){
        $(".toggle-active-ul>li").click(toggleActiveChildrenClicked);
        $("#google").submit(googleSubmit);
    }

    /* define all functions in initComponents.
    ============================================================================== */
    function initInputTag(){
        $(".default-input-tag.input-tag").inputTag();
	$(".advanced-input-tag.input-tag").inputTag({
        	separativeSigns: [",", "，", ";", "；",".","。"],
                multi: true,
                readonly: false,
		repeatable: false
	});
    }

    /* define all functions in addEventListener.
    ============================================================================== */
    function toggleActiveChildrenClicked(event){
        var $li = $(this);
        $(".toggle-active-ul>li").removeClass("active");
        $li.addClass("active");
    }
    function googleSubmit(event){
        event.preventDefault();
        var q = $(this).find("input[name=q]").val();
        window.open("http://www.google.com#q="+q+"&safe=strict","_blank")
    }

})(jQuery);
