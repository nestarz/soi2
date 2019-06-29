<template>
  <Layout>
    <h1>{{ $page.author.title }}</h1>
    <ul>
      <li v-for="edge in $page.author.belongsTo.edges" :key="edge.node.id">
        {{ edge.node.full_text }}
      </li>
    </ul>
  </Layout>
</template>

<page-query>
query Author($id: String!) {
  author(id: $id) {
    title
    belongsTo {
      edges {
        node {
          ... on Tweets {
            id
            full_text
            user {
              name
              screen_name
              location
              profile_image_url_https
              profile_banner_url
            }
            created_at
            parent_created_at
            extended_entities {
              media {
                media_url_https
              }
            }
            entities {
              media {
                media_url_https
              }
            }
          }
        }
      }
    }
  }
}
</page-query>