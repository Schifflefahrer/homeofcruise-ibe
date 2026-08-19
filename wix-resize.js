(function () {
    var container = document.documentElement;
    var previousHeight = 0;

    function sendHeight() {
        var newHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body ? document.body.scrollHeight : 0,
            document.documentElement.offsetHeight
        );

        if (previousHeight !== newHeight) {
            previousHeight = newHeight;

            window.parent.postMessage(
                JSON.stringify({
                    src: window.location.toString(),
                    context: "iframe.resize",
                    height: newHeight
                }),
                "*"
            );
        }
    }

    new ResizeObserver(function () {
        sendHeight();
    }).observe(container);

    window.addEventListener("load", sendHeight);
    window.addEventListener("resize", sendHeight);

    setTimeout(sendHeight, 250);
    setTimeout(sendHeight, 1000);
})();
