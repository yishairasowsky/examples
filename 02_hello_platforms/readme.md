# Hello Platforms

In 01, we ran the hello world app from 00 in an openfin window.

You should have had a very boring app in a very boring window.

In this tutorial we will enhance the 00 app without any code.


## The config
Take a look at `openfin.config.json`

You may see we no longer have a `startup_app`. We have a `platform` key instead. This tells openfin we will be running under the new "Platforms" architecture.

We also have a "snapshot". The structure is intimidating, but you won't be writing these, don't worry! What you should see is that within the snapshot we have a "windows" array of length 1.

Within the window object of that array we have a "layout" some structure and finally an object with `"type": "component"`.
Under that objects `component_state` we have a "url" set to our app from 00_hello_world.

## Running it
Go ahead and run `npm start -- 02_hello_platforms` from the root directory.
This will launch the configuration defined by `openfin.config.json`.

You should see our app from `00` running in a tab. It's actually a different type of entity within OpenFin called a `View`. A View is a web page which can be rendered on top of other windows (Like an Iframe but better). The tab and custom window you see are actually html.

## Next steps

In the following tutorials we will show you how you can customize the window drawn around your content..

