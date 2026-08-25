(function () {

    var previousHeight = 0;

    function getContentElement() {

        return (
            document.querySelector("#xt-page-search") ||
            document.querySelector(".ibe-page")
        );
    }

    function getHeight() {

        var content = getContentElement();

        if (!content) {
            return 0;
        }

        var rect = content.getBoundingClientRect();

        var height = Math.ceil(
            rect.height
        );

        console.log(
            "XTIBE Content-Höhe:",
            height
        );

        return height;
    }

    function sendHeight() {

        var height = getHeight();

        if (
            !Number.isFinite(height) ||
            height <= 0 ||
            height === previousHeight
        ) {
            return;
        }

        previousHeight = height;

        console.log(
            "XTIBE Template sendet echte Inhaltshöhe:",
            height
        );

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

        var observer =
            new ResizeObserver(function () {
                sendHeight();
            });

        observer.observe(content);
    }

    window.addEventListener(
        "load",
        sendHeight
    );

    window.addEventListener(
        "resize",
        sendHeight
    );

    setTimeout(sendHeight, 100);
    setTimeout(sendHeight, 500);
    setTimeout(sendHeight, 1000);
    setTimeout(sendHeight, 2000);

})();
