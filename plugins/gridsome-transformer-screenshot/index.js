const jsYaml = require('js-yaml')
const fetch = require("node-fetch");
const { getMetadata, metadataRuleSets } = require('page-metadata-parser');
const domino = require('domino');

const {
  MetadataType,
} = require('./lib/types/MetadataType')

class ScreenshotTransformer {
    static mimeTypes () {
      return ['text/yaml']
    }

    parse (content) {
      const data = jsYaml.load(content)
      const fields = typeof data !== 'object' || Array.isArray(data)
        ? { data }
        : data
      return { fields }
    }
  
    extendNodeType ({ graphql }) {
      return {
        metadata: {
          type: MetadataType,
          resolve: async (node) => {
            try {
              const url = node.fields.url;
              const response = await fetch(url);
              const html = await response.text();
              const doc = domino.createWindow(html).document;
              const metadata = getMetadata(doc, url);
              console.log(metadata);
              return metadata;
            } catch (err) {
              return {
                image: '',
              };
            }
          },
        },
      }
    }
  }
  
  module.exports = ScreenshotTransformer