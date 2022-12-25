import sanityClient from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

const groq = String.raw || ((strings, ...keys) => {
  const lastIndex = strings.length - 1;
  return strings.slice(0, lastIndex).reduce(
    (query, currentString, index) => query + currentString + keys[index],
    ""
  ) + strings[lastIndex];
});
const client = sanityClient({
  projectId: "oeaj94ez",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-03-25"
});
const imageBuilder = ImageUrlBuilder(client);
const urlFor = (source) => imageBuilder.image(source);

export { client as c, groq as g, urlFor as u };
//# sourceMappingURL=client.7dbdc199.mjs.map
