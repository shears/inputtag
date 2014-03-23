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
           $(".input-tag").inputTag();
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
