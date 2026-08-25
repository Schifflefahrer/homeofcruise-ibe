(function () {

    var previousHeight = 0;

    function getContentElement() {
        return (
            document.querySelector("#xt-page-search") ||
            document.querySelector(".ibe-page")
        );
    }

    function sendHeight() {

        var content = getContentElement();

        if (!content) {
            return;
        }

        var height = Math.ceil(
            content.getBoundingClientRect().height
        );

        if (
            !Number.isFinite(height) ||
            height <= 0 ||
            height === previousHeight
        ) {
            return;
        }

        previousHeight = height;

        window.parent.postMessage(
            {
                action: "resize",
                height: height
            },
            "*"
        );
    }

    var content = getContentElement();

    if (
        content &&
        typeof ResizeObserver !== "undefined"
    ) {
        new ResizeObserver(sendHeight)
            .observe(content);
    }

    window.addEventListener("load", sendHeight);
    window.addEventListener("resize", sendHeight);

    setTimeout(sendHeight, 100);
    setTimeout(sendHeight, 500);
    setTimeout(sendHeight, 1000);
    setTimeout(sendHeight, 2000);

})();
