const jsYaml = require('js-yaml')
const { imageType } = require("gridsome/lib/graphql/types/image");

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
          type: imageType.type,
          args: imageType.args,
          async resolve(node, args, context, info) {
            const value = path.join(screenshotFolder, `${node.slug}.png`);
    
            try {
              result = await context.queue.add(value, args);
            } catch (err) {
              return null;
            }
    
            if (result.isUrl) {
              return result.src;
            }
    
            return {
              type: result.type,
              mimeType: result.mimeType,
              src: result.src,
              size: result.size,
              sizes: result.sizes,
              srcset: result.srcset,
              dataUri: result.dataUri
            };
          }
        },
      }
    }
  }
  
  module.exports = ScreenshotTransformer