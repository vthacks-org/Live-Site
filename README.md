<p align="center">
  <a href="https://vt-hacks-live-site.netlify.app/" target="_blank" >
    <img alt="VTHacks" src="https://vt-hacks-live-site.netlify.app/Logo_Mountains.svg" width="180" />
  </a>
</p>

<h1 align="center">
  VTHacks Live Site
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/6ad1a547-3547-42e1-81f7-ce957bb2c23e/deploy-status)](https://app.netlify.com/sites/vt-hacks-live-site/deploys)

The Production Live Site can be found [here](https://vt-hacks-live-site.netlify.app/)


The Live Site is the website that we will be directing Hackers to on the day of the event

If you have any questions about the Live-Site, please contact anyone on the Web Dev team or Peter or Patrick

We hope you like it! - Jacob, Brian

## How to use the Netlify CMS to populate data on the Live Site

1. **Navigate to /admin on the Live Site!**
   Sign in with [github](https://github.com). If you aren't in the vthacks-org organization on github you'll have to request access.

2. **Browse Collections!**
   Select the collection you'd like to edit

3. **Create a new Item!**
   Or if you'd rather, edit an item
4. **Toggle Display on or off!**
   All items have the ability to be created, but not display themselves on the LiveSite. If you want to create info, but not have it yet displayed, make sure you disable the display toggle (It is turned on by default)

5. **Publish Changes!**
   Publishing your changes will tell netlify to deploy the website with the new information that was provided. The build and deploy process takes about 1 - 2 minutes

## How to start the development server

**Navigate to `/Live-Site`** Run `npm start`

## Collections

**Schedule.** The schedule selection creates items that then populate the workshops page, ux events page, and schedule view. 

**Markdown Collections** The other collections are markdown collections. Items in these collections take a title, which can be set to display as an h1 or hidden, and markdown content that can be used to put whatever information one would like on the page. These collections can suffice with just a single item populating all markdown content on the page or multiple items.
