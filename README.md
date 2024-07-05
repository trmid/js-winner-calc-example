![SSS Logo](docs/favicon.svg)

# Did I Win?

This is a mostly pointless tool for manually checking PoolTogether wins before they are claimed. It's for the truly impatient people who just must know if they won before they win.

## Configure

Change app options in `sss.config.json`.

## Development

Run `npm run dev` to start the development server. Edit the svelte and typescript files in the `src` folder to make changes to your app. Change the `docs/index.html` file directly to make changes to your app's metadata and to add additional stylesheets or resource links.

## Build

When your app is production ready, run the following command to output the static site bundle to the `docs/bundle` directory:

### Linux

`npm run build`

### Windows

`npm run build-win`

## Publish

After building your bundle, publish the static files in the `docs` directory on the platform of your choice, or if your build directory is named `docs`, you can host them directly on github by enabling github pages to serve directly from the `docs` folder in your repository.