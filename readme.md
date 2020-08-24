# A skeleton for sustainably using the app seed as a tutorial

Any directory (except build-utils and node_modules) will be built with openfin.config.json being replaced with the given variables and built as app.json and src/main.ts being bundled into bundle.js

## Disclaimer

This repo was created to help break down a platform into components each directory can contain a web page and/or an openfin manifest. Each directory should also have a readme explaining itself.

That said, this is not a production-ready webpack configuration.


## Note on structure

Currently the same config exists in `provider` and `current-app-seed`

This is to determine if it is easier to have these configs live with the code or separately.

## Platform manifest cli arg 

In the constructor of the openfin plugin is a property that sets the value of the `--platform-url` argument replacing the `manifestUrl` with the specified project to launch.

current values that exist: `base`, `provider`, `current-app-seed`

Since `provider` & `current-app-seed` are the same, the best way to see the differences right now is adding the argument `--platform-url=base` to the npm start script in the `package.json`. 