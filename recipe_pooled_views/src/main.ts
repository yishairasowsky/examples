const platform: any = fin.Platform.getCurrentSync();

const createButton = (label, onClick, node?) => {
    const span = document.createElement("span");
    const button = document.createElement("button");
    button.innerHTML = label;
    button.style.color = 'black';
    span.appendChild(button);
    const targetElement = node ? node : document.body;
    targetElement.appendChild(span);

    button.addEventListener ("click", onClick);

    return button;
};


// This code is running in both the window context and the view context as they both have script tags pointing at bundle.js
if (fin.me.isWindow) {
    // Code that will run ONLY in the window
    window.addEventListener('DOMContentLoaded', () => {
        const buttonsContainer = document.getElementById('buttons-container');
        const addView = async () => {
            const url = document.location.href.replace('window', 'example-view');
            const viewOptions = { url, detachOnClose: true };
            platform.createView(viewOptions, fin.me.identity);
        };
        
        let count = 0;
        
        const saveCurrentLayout = async (e) => {
            const layout = fin.Platform.Layout.wrapSync(fin.me.identity);
            const layoutConfig = await layout.getConfig();
            const restoreLayout = () => layout.replace(layoutConfig);
            count++;
            createButton(`Restore Layout #${count}`, restoreLayout, e.target.parentNode);
            if(fin.me.isWindow) {
                fin.me.resizeBy(1,0, 'top-left');
            }
        }
        createButton('Add View', addView, buttonsContainer);
        createButton('Save Layout', saveCurrentLayout, buttonsContainer);
    });
} else if (fin.me.isView) {
    // Code that will run ONLY in the views

    const showDetachOnCloseSetting = (bool) => {
        const string = `Detach on close set to: <p style="color:red"><strong>${ bool }</strong></p>`;
        const div = document.getElementById('current-detach-on-close-setting');
        div.innerHTML = string;
    };
    
    const toggleDetachOnClose = async (bool:boolean) => {
        if(fin.me.isView) {
            const { detachOnClose } = await fin.me.getOptions();
            fin.me.updateOptions({
                detachOnClose: !detachOnClose
            });            
        }
    };
    
    // Any time the detachOnClose option is updated, update the DOM to reflect the change
    fin.me.on('options-changed', payload => {
        if(payload.diff?.detachOnClose) {
            showDetachOnCloseSetting(payload.diff?.detachOnClose.newVal);
        }
    });

    const closeOtherViews = async () => {
        if(fin.me.isView) {
            const target = await fin.me.getCurrentWindow();
            const views = await target.getCurrentViews();
            views.forEach(v => {
                if (v.identity.name !== fin.me.identity.name) {
                    platform.closeView(v.identity);
                }
            })
        }
    }
    createButton('Close Other Views', closeOtherViews);
    createButton('Toggle detachOnClose Option', toggleDetachOnClose);
    
    fin.me.getOptions().then(({detachOnClose}) => {
        showDetachOnCloseSetting(detachOnClose);
    });

    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            // arbitrarily make loading take a while for example purposes
            const [r,g,b] = [
                Math.floor(Math.random() * 256),
                Math.floor(Math.random() * 256),
                Math.floor(Math.random() * 256)
            ];
            // set the background of the view to a random color
            document.body.style.background = "rgb(" + r + "," + g + "," + b + ")";

            document.getElementById('title').innerHTML = 'Example View';
            
        }, 2000)
    })
}

// Example of function to set the `detachOnClose` option in all views in a window to true 
// prior to calling Layout.getConfig (function takes a window identity):

const getLayoutConfigAndKeepViewsOpen = async (identity: OpenFin.Identity) => {
    const ofWin = fin.Window.wrapSync(identity);
    // get an array of view attached to the window
    const views = await ofWin.getCurrentViews();
    // map over each view in the window and update the detachOnClose option
    const updateOptionsPromises = views.map(async (view) => {
        return view.updateOptions({detachOnClose: true});
    });
    // after all the options have been updated, attempting to close the views in this layout
    // will instead cause them to be detached and join the view pool
    await Promise.all(updateOptionsPromises);

    const windowLayout = fin.Platform.Layout.wrapSync(identity);
    // get the layout configuration
    const layoutConfig = await windowLayout.getConfig();
    // Calling Layout.replace with this layoutConfig will use the views currently in it
    // even if the user had subsequently attempted to close those views
    return layoutConfig;
};
