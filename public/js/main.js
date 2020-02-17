// uncomment line below to register offline cache service worker
// navigator.serviceWorker.register('../serviceworker.js');
//import the client module

if (typeof fin !== "undefined") {
    init();
} else {
    document.querySelector("#of-version").innerText =
        "The fin API is not available - you are probably running in a browser.";
}

//once the DOM has loaded and the OpenFin API is ready
async function init() {
    //get a reference to the current Application.
    const app = await fin.Application.getCurrent();
    const win = await fin.Window.getCurrent();

    const ofVersion = document.querySelector("#of-version");
    ofVersion.innerText = await fin.System.getVersion();

    //Only launch new windows from the main window.
    // if (win.identity.name === app.identity.uuid) {
    //     subscribing to the run-requested events will allow us to react to secondary launches, clicking on the icon once the Application is running for example.
    //     for this app we will  launch a child window the first the user clicks on the desktop.
    //     app.once("run-requested", async () => {
    //         await fin.Window.create({
    //             name: "test1",
    //             url: location.href,
    //             defaultWidth: 320,
    //             defaultHeight: 320,
    //             autoShow: true
    //         });
    //     });
    // }
}

/* Define a function that will launch a window */
async function launchWindow(url) {
    /* Use the await keyword. The function will wait for the 
        window object to instantiate before resuming execution */
    const win = await fin.Window.create({
        /* Provide initialization options to the new window */
        name: "test2",
        url: url,
        defaultWidth: 600,
        defaultHeight: 400,
        resizable: false,
        autoShow: true
    });
}

async function unDock() {
    const window = await fin.Window.getCurrent();

    // await layouts.snapAndDock.undockWindow();

    await layouts.snapAndDock.undockWindow({
        uuid: window.identity.uuid,
        name: window.identity.name
    });
}
