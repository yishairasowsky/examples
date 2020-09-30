# Pooled View Recipe

Inn this recipe we will show how "pooled" or "detached" views work.  When a view is "pooled" or "detached" it is hidden but not attached to any layout window.  Any layout that was captured with this view inside it can recall the "pooled" view instead of creating a new one.  Please note that you can recognize this happening as a new view will have a different color background.  

## The config

Take a look at `openfin.config.json`.

Notice that the views are initialized and/or created with the `detachOnClose` option set to `true`.  This means that when the view is "closed" by user action or via the platform API call `closeView` that it will join the view "pool" rather than being destroyed.

Please note that the "pooled" views will still take up memory and that having a large number of them can cause a degradation in performance.  By default, we limit the number of pooled views to 10 but this can be altered via the `maxViewPoolSize` option inside the top-level `platform` configuration (see that we set it to 15 inside `openfin.config.json` since these views are light and take up very little memory).

## Running it

Go ahead and run `npm start -- recipe_pooled_views` from the root directory.
This will launch the configuration defined by `openfin.config.json`. When it comes up please do the following:

1.) Note the colors of each view, this is how you will determine that a view is being re-created vs pooled.  
2.) Click `Save layout`
3.) Click `Close Other Views` on one of the views
4.) Add 2 more views by clicking `Add View`
5.) Note the colors of each view and click `Save layout`
6.) Click `Restore Layout #1` - Notice that it is the original Views that had been closed as well as the single view that was shared between the two layouts.
7.) Click `Restore Layout #2` - Notice that it is the saved Views that were closed when Layout #1 was restored, as well as the single view that was shared between the two layouts (feel free to switch back and forth a few more times).
8.) Click `Toggle detachOnClose` on one of the Views
9.) Click `Close Other Views` on one of the views not targeted in #8
10.) Click `Restore Layout #2` - Notice that the view where `detachOnClose` was set to false has been replaced by a new view with a different color.
11.) Click `Restore Layout #2` again - Notice that the same view has been replaced by a new view with a different color again, in spite of `detachOnClose` being set to true on the new view.  This is because Layout #2 was saved with the view name of the previously closed view.  The newly added view that has `detachOnClose` set to `true` but is not captured in either Layout #1 or #2 has been pooled but will not be retrieved by any saved layout.  This is not optimal as it will be a memory sink until it is closed.  Please see the paragraph below for a better way to add this option to ensure there are not views in the pool that cannot be accessed.

Rather than setting `detachOnClose` to true at creation or by pressing a button, `detachOnClose` could be set to true immediately prior to capturing a Layout config or snapshot.  This will ensure that any Views captured in that Layout or Snapshot will be detached instead of closed and can be called back by calling `Layout.replace` or `Platform.applySnapshot`.  See an example of this code at the bottom of the main.ts file.
