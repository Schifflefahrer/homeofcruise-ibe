(function () {

    var previousHeight = 0;

    function getHeight() {

        return Math.max(
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight,
            document.body ? document.body.scrollHeight : 0,
            document.body ? document.body.offsetHeight : 0
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


    /* Änderungen der Seitenhöhe beobachten */
    var observer = new ResizeObserver(function () {
        sendHeight();
    });

    observer.observe(document.documentElement);


    /* Beim Laden */
    window.addEventListener(
        "load",
        sendHeight
    );


    /* Bei Änderung der Fenstergröße */
    window.addEventListener(
        "resize",
        sendHeight
    );


    /*
     * Zusätzliche Messungen:
     * wichtig für Bilder und dynamische COMPASS-Inhalte
     */
    setTimeout(sendHeight, 100);
    setTimeout(sendHeight, 500);
    setTimeout(sendHeight, 1000);
    setTimeout(sendHeight, 2000);

})();
