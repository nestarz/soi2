const jsYaml = require('js-yaml')
const axios = require(`axios`)

const {
  GraphQLString,
} = require('gridsome/graphql')

const SCREENSHOT_ENDPOINT = `https://h7iqvn4842.execute-api.us-east-2.amazonaws.com/prod/screenshot`

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
        screenshot: {
          type: GraphQLString,
          resolve: async (node) => {
            console.log("ok", node.fields, "fin");
            const url = node.fields.list[0].url;
            const screenshotResponse = await axios.post(SCREENSHOT_ENDPOINT, { url });
            return screenshotResponse.data.url;
          }
        }
      }
    }
  }
  
  module.exports = ScreenshotTransformer