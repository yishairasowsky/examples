# Overview
This repo contains some examples to help get started with OpenFin as well as some recipe examples for users that already have a basic understanding. 

# Getting Started
Please run through these in number order starting with 00_hello_world.

# Recipes
These are for users that already have a basic understanding of developing on OpenFin.  They are each meant to provide an informative example of an OpenFin feature and should each be able to stand alone.  

# A skeleton for sustainably using the app seed as a tutorial

Any directory (except build-utils and node_modules) will be built with openfin.config.json being replaced with the given variables and built as app.json and src/main.ts being bundled into bundle.js

## Disclaimer

This repo was created to help break down a platform into components each directory can contain a web page and/or an openfin manifest. Each directory should also have a readme explaining itself.

That said, this is not a production-ready webpack configuration.

## Choosing which example to launch

To change the launched app from the default simply pass the directory name containing the openfin config you wish to launch to `npm start` (after the `--`). For example:
```bash
npm start -- base
```