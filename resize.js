(function () {

    let lastHeight = 0;
    let timer = null;

    function getHeight() {
        return Math.max(
            document.body ? document.body.scrollHeight : 0,
            document.documentElement
                ? document.documentElement.scrollHeight
                : 0
        );
    }

    function sendHeight() {

        clearTimeout(timer);

        timer = setTimeout(function () {

            const height = Math.ceil(getHeight());

            if (!height || height === lastHeight) {
                return;
            }

            lastHeight = height;

            console.log(
                "HOME OF CRUISE IBE HEIGHT:",
                height
            );

            window.parent.postMessage(
                {
                    action: "resize",
                    height: height
                },
                "*"
            );

        }, 100);
    }


    /*
     * Nach vollständigem Laden
     */
    window.addEventListener(
        "load",
        sendHeight
    );


    /*
     * Bei Größenänderungen
     */
    window.addEventListener(
        "resize",
        sendHeight
    );


    /*
     * DOM-Veränderungen beobachten
     */
    const observer =
        new MutationObserver(sendHeight);

    observer.observe(
        document.documentElement,
        {
            childList: true,
            subtree: true,
            attributes: true
        }
    );


    /*
     * Moderne Größenüberwachung
     */
    if ("ResizeObserver" in window) {

        const resizeObserver =
            new ResizeObserver(sendHeight);

        resizeObserver.observe(
            document.documentElement
        );

        if (document.body) {
            resizeObserver.observe(
                document.body
            );
        }
    }


    /*
     * Initial mehrfach messen,
     * weil Bilder/IBE-Inhalte nachladen
     */
    setTimeout(sendHeight, 100);
    setTimeout(sendHeight, 500);
    setTimeout(sendHeight, 1000);
    setTimeout(sendHeight, 2000);

})();
