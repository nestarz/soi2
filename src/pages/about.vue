<template>
  <layout>
    <template slot="sidebar">
      <div v-for="section in sections" :key="section.id">
        <h2>{{ section.title }}</h2>
        <ul>
          <li v-for="item in section.items" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
    </template>
    <h1>About us</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum odit fugit assumenda rem dolores inventore iste reprehenderit maxime! Iusto.</p>
  </layout>
</template>

<script>
export default {
  metaInfo: {
    title: "About us"
  }
};
</script>
