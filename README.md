# Get current Google doodle

Do you ever want to see the [Google Doodle](https://www.google.com/doodles) but you just can't be bothered to go to the Google home page? Are you sequestered behind a Great Firewall, unable to access the wonders of Google? Then this webtask is for you!

## How do you use it?

Simple, go to the [webtask url](https://webtask.it.auth0.com/api/run/wt-mike-craveytrain_com-0/get-doodle?webtask_no_cache=1) to see the latest Google Doodle.

## How does it work?

When you go to the page, a request is made to the Google Doodle page, the latest image path is parsed from the DOM, that image is requested, base64 encoded into a data-uri and served up to the user. The alt text is also returned, in case the doodle is so creative, it's not obvious what it's about.

## What's next?

This this is just a POC, it was done quickly with primary concern on proving viability (though, it has been successfully user-tested with an audience behind a Great Firewall). In order to make this production ready, it would like require some more thought around the implementation.

### Resilience

If the URL of the Google Doodle were to change, or if the markup of the latest doodle were to change, the script would break. Ideally this would be served via an API, but an obvious one wasn't found in the quick research for this project.

Also, since this is a serialized list of functions, simple error may have a compounding issue. All of the functions that have any logic should be broken out into their modules and have tests around the I/O of them, to prevent unintended consequences.

### Performance

Currently, every request goes back to the origin to fetch the image. The images could be cached to reduce the number of requests and response time. Considering the images are all unique assets and the pages they reside on are explicitly set to not be cached, we cannot infer how long to cache the lookup for the latest doodle. If we were to set a cache time, it would be arbitrary based on expectations of users' tolerance for stale doodles.

However, the encoded images could be cached with the key of the url of the image and use the expiry information on the images header for cache settings of the image. Currently, the images are cached in the browser for 1 year.

### Extensibility

Right now, only the latest doodle comes back. However, the ability to get the latest image on a certain date seems like it would be a good feature for users. Also, just a general archive of images would be a nice feature for users who cannot access the archive themselves.

So, here it is. Hope you enjoy.
