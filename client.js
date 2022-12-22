import sanityClient from "@sanity/client";
import ImageUrlBuilder from '@sanity/image-url'
export const client = sanityClient({
    projectId: "oeaj94ez", // find this at manage.sanity.io or in your sanity.json
    dataset: "production", // this is from those question during 'sanity init'
    useCdn: true,
    apiVersion: "2021-03-25"
});

const imageBuilder = ImageUrlBuilder(client)
export const urlFor = (source) => imageBuilder.image(source)