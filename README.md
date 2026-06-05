# PS Systems

This is a [Next.js](https://nextjs.org/) and [Prismic](https://prismic.io/docs/nextjs) starter template for
Supermarket & Public Websites projects :)

Please follow the instructions carefully.

## Starting a site

### Creating a new repo with the template

To use this template, click on the 'Use this template' button from this github repo. Then:

1. Create a new repository using this repo as a template
3. Make sure you are logged into the Prismic account you want to use.
4. Install dependencies: npm install
5. Run slicemachine: npx @slicemachine/init@latest
5. Then follow the instructions in the terminal. Choose Create New Repository and give it a name (you can't change this
   later). Your local repo will now be linked to the new CMS repo.

### Add initial content to your new Prismic repo

Go to the Prismic repository you just created and add the below documents to your content types at a minimum using the
slice machine (see details below):

1. Create a homepage document
2. Add a hero or simple hero slice to the homepage document
2. Create a page document
3. Add a hero or simple hero slice to the page document
3. Create a layout document
4. Add the page document to the header menu in the layout document
5. Run locally with `npm run dev` and check that the content is showing up.
6. Push your changes to github as an initial commit.
7. Deploy your site on netlify
8. Set up live slice previews for your site by setting the url to `https://your-netlify-url.com/slice-simulator`. More
   info here: https://prismic.io/docs/nextjs#set-the-simulator-url-in-the-page-builder
9. Set up whole site previews by creating a production preview in Prismic settings following this step (all other steps
   are already completed in the template): https://prismic.io/docs/nextjs#create-a-preview
9. Create Prismic webhook to revalidate your content when Prismic content changes following this step (you already have
   the revalidate route in your template): https://prismic.io/docs/nextjs#create-a-webhook

### Setting up the first build

1. Set the fonts in the `src/app/Layout.tsx` file and then in the `src/styles/_variables.scss` file.
2. Update your fluid type variables in the `src/styles/_variables.scss` file.
2. Set the colors in the COLORS section of the `src/styles/_variables.scss` file. You may only add variation set
   variables. You may NOT add more than that.
3. In the `src/components/layout/Header/Header.module.scss` and `.../MobileHeader.module.scss` and
   `.../NavigationMobile.module.scss` files add the background color and text color for the header.
4. In those same files set the font family for the links if it is not what is currently set.
5. Set the color of the footer in the `src/components/layout/Footer/Footer.module.scss` file.
5. Change the default metadata in the `src/app/Layout.tsx` file.
6. Replace `assets/svg/logo.svg` with your logo. Keep it one colour and no background. If it has more than one color you
   will need to update styling in the header and footer.
7. Update the favicon at `src/app/favicon.ico` (use a favicon generator site to turn a png to ico)
8. Update the sharing image in `public/sharing-image.png`. Make it 1200x640.
9. Update all the fallback urls in metadata and robots.txt by searching the site for "fallbackUrl.com" and replacing
   with your proposed site url.

### Populating the homepage

For free builds we populate the homepage:

1. Find a batch of images from unsplash.com and add them to the media library.
2. Add a Hero slice to the homepage document. Use a snappy strapline and a beautiful, high res image.
3. Follow this up with a text slice. This is a good spot for a testimonial or a company description as well as a CTA to
   the about page.
4. After this you might add some information about services. This might use the cards slice OR a content list slice. If
   you use a content list you will need to create individual service pages and populate their preview card tab.
5. The image grid is a lovely module. So try and add this using some of the unsplash images you have built. Either make all the images the same ratio and width or mix it up.
6. After that you might use an accordion slice for FAQs.
7. Finally, add add a call to action. The text module with XL text and CTA button is a good place to start.

### Colour and type references

#### For google font pairings:

- https://www.fontpair.co

#### For colour pairs:

- https://coolors.co/
- https://colorhunt.co/

### Nice touches

1. To help the content editors change the names of you variations in the `src/utils/helpers.ts` file. If you do this,
   then you need to update your dropdown values for background color on ALL slices to have these new names as options.

## Adding to the site

### How to add another page type

1. Create the page type in slicemachine and add slices to it as well as preview card content (excerpt, preview_image,
   preview_vimeo, preview_video and video_poster_image).
2. Duplicate the `src/app/[uid]/page.tsx` file in the app directory like `src/app/posts/[uid]/page.tsx` and change the
   post type, remove the search.uid test and update the types.
3. Add the new type to the link resolver in `src/prismicio.ts`.
4. Add the new page type to the sitemap in the `src/app/sitemap.ts` file.
3. If you want it to be part of the content list then add it as an available content type in the items array.
4. Create a new page in Prismic of that content type and test that it renders locally.

### Adding Algolia search

1. Create a "page" with the uid of `search` in Prismic.
2. In the Supermarket Algolia account create a new application for you project. Then create two indexes: one for
   production and one for development (ie. dev_INDEXNAM, prod_INDEXNAME)
3. Add your Algolia credentials to your `.env.local` file. You will need: NEXT_PUBLIC_ALGOLIA_APP_ID,
   NEXT_PUBLIC_ALGOLIA_SEARCH_KEY, ALGOLIA_SEARCH_ADMIN_KEY and NEXT_PUBLIC_ALGOLIA_INDEX_NAME (make sure you use the
   dev_INDEX for your local development).
4. Uncomment the code in `src/app/api/algolia/route.ts` and `src/utils/mapPrismicToAlgolia` and add the post types and
   fields you want to sync to your index.
5. Add a "tag" to the posts in prismic. This is what you will use for filtering.
5. Open Postman and hit the algolia api route: `http://localhost:3000/api/algolia`
6. Now open Algolia and set up Facets and Facet Display. You need to add "tags" to attributesForFaceting and then if you
   want the filters to appear in a certain order then you need to add them to the facet display list.
7. Now when you go to your `/search` page you should see the search results.
8. Set up a webhook in prismic to sync your prod index when Prismic content changes. The webboook should hit the algolia
   api route: `https://your-netlify-url.com/api/algolia`

### Launching the site

1. If you have search you will need to run a webhook to hit the Algolia API on Prismic changes. You can set this up in
   Prismic.

## Working on the site

### Updating the slicemachine

To make changes to the content types available in your prismic, run the slicemachine from your terminal with

npm run slicemachine

and head to http://localhost:9999 to check it.

### Updating the slicemachine - work flow

This should never be done by more than one person. That person should be the senior on the project. It is therefore
fairly unlikely we will ever run into these issues. But in case please read below.

Unfortunately, it is easy to get merge conflicts when working as more than one person on a Prismic
project. Try to follow this workflow to minimize that please make slicemachine changes on the MAIN branch in a
non-destructive way. IE. Do not delete or change existing fields. Just add new ones for your feature and then once it is
approved and merged to main you can delete old ones you don't need.

### Run your project locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

### Steps once you have the project setup

1. Install the project on main branch
2. On a branch called “setup” do a full setup run installing all slices, adding dummy content. Do one big PR of this
   branch to main and wait for approval
3. On a branch called “variables” do all base variable updates. This includes type sizes & colours. Do a PR and wait for
   approval.
4. On various branches do first styling run on all slices. Do a PR for each and do not change anything above junior or
   mid levels. Wait for approval.
5. On various branches add any stying that is missing from the junior level variables. Do PRs for each and wait for
   approval

### Workflow for Juniors and mids working on this project

There are clear instructions on files to show what you can edit. Please do not edit any other files unless you have been
given permission.

If you see something in a design that needs some new variable then please collect that and any others in a list and
submit it to a senior. They will either approve them to be done or decline them to be done.

Seniors, please follow this guide for those requests.

- If it is in scope as a custom change to a module then please complete it.
- If it is something that seems useful for future clients then please do it on the ps-systems repo first and then
  reference the commit in an issue for yourself or a mid to replicate in the current project.
- If it is something that is not in scope then please decline it and pass on to a project manager to discuss with client
  or designer.

### Algolia Search

To setup an algolia search based on the provided example at `/search` route you need to follow these steps.

1. Create an account on Algolia and create an index
2. Add your Algolia credentials to your `.env.local` file
3. Update the `api/algolia/route.ts` file and the `helpers/algolia.ts` file to correctly map your Prismic data to
   Algolia
4. Send a post request to `http://localhost:3000/api/algolia` to test that your data is mapping correctly to Algolia
5. Add remove or style the elements in the SearchExample component to fit your design

### Notes:

- You need to think carefully about how to organise your Cards for a content type. If you don't want search highlighting
  then you can just use flexible cards to show content. If you want highlighting then you will need to mimic a flexible
  cards with a few changes to the prop structure.
- If you want your search state to persist across pages then you will need to put the elements in the layout file.

### Learn More

To learn more about Next.js / Prismic, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- And the [Prismic + Next docs](https://prismic.io/docs/nextjs)
- Also check out
  this [Next + prismic starter](https://github.com/prismicio-community/nextjs-starter-prismic-blog/blob/master/docs/README.md)

