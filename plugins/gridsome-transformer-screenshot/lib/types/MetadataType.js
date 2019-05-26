const {
  GraphQLString,
  GraphQLObjectType,
} = require('gridsome/graphql');

const MetadataType = new GraphQLObjectType({
  name: 'Metadata',
  fields: {
    image: { type: GraphQLString },
    title: { type: GraphQLString },
    keywords: { type: GraphQLString },
    description: { type: GraphQLString },
    url: { type: GraphQLString },
  },
});

module.exports = {
  MetadataType,
};
