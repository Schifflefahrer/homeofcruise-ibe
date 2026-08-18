(function () {
    var container = document.documentElement;
    var previousHeight = 0;

    new ResizeObserver(function () {
        var newHeight = container.offsetHeight;

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
    }).observe(container);
})();
