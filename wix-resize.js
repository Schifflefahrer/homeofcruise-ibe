(function () {

    var previousHeight = 0;

    function getHeight() {

        var htmlScroll =
            document.documentElement.scrollHeight;

        var htmlOffset =
            document.documentElement.offsetHeight;

        var bodyScroll =
            document.body
                ? document.body.scrollHeight
                : 0;

        var bodyOffset =
            document.body
                ? document.body.offsetHeight
                : 0;

        var viewport =
            window.innerHeight;

        console.log(
            "XTIBE Höhen-Debug:",
            {
                htmlScrollHeight: htmlScroll,
                htmlOffsetHeight: htmlOffset,
                bodyScrollHeight: bodyScroll,
                bodyOffsetHeight: bodyOffset,
                viewportHeight: viewport
            }
        );

        return Math.max(
            htmlScroll,
            htmlOffset,
            bodyScroll,
            bodyOffset
        );
    }

    function sendHeight() {

        var height = Math.ceil(getHeight());

        if (
            !Number.isFinite(height) ||
            height <= 0 ||
            height === previousHeight
        ) {
            return;
        }

        previousHeight = height;

        console.log(
            "XTIBE Template sendet Höhe:",
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

    var observer =
        new ResizeObserver(function () {
            sendHeight();
        });

    observer.observe(
        document.documentElement
    );

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
