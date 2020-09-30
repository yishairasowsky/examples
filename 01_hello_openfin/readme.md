# Hello OpenFin!

This subfolder contains an `app.json`. This is a configuration that specifies which version of openfin to use as well as specifying what app to launch.

Under `runtime` we specify `stable` which means the latest stable version of openfin will be used.

Under `startup_app` we provide a uuid, which is what openfin will use to identify our app and what other apps will use to communicate with us.
We also specify our `startup_app` to point to the web app from tutorial `00`



## What You should do.

Go ahead and run `npm start -- 01_hello_openfin` from the root directory.

You should see the app start in openfin.

If you didn't peek at the code in `00_hello_world` do so now.

You will see that when running in OpenFin, the `fin` variable is defined which causes our app to say "Hello OpenFin" rather than "Hello World".

## Next steps.

Feel free to right click in the openfin window and click 'Inspect Element' to open the console.
You should be able to interact with the `fin` object.

Try running `fin.desktop.getVersion()`. That number is the current stable version of openfin.
The first number is current major version of openfin.
The second number is the version of Chromium this openfin version ships with
The third number is the version of the OpenFin Api
Last is the build number for this particular release

## A note on openfin configs

For simplicity going forward, tutorials will contain an `openfin.config.json` rather than an `app.json`. The only difference between the two is that this particular webpack config will go ahead and replace the variables `${OF_VER}` and `${BASE_URL}`. This is just so that we can run these tutorials more easily on different environments and is not necessary for building your own OpenFin app.