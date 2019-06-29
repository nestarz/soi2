<template>
  <Layout class="add-ressources">
    <form name="contact" method="POST" ref="form">
      <label v-for="field in fields" :key="field.name" :class="field.name.toLowerCase()">
        <span>
          {{ field.name }}
          <span class="required" v-if="field.required">*</span>
        </span>
        <textarea v-if="field.type == 'textarea'" :name="field.name"/>
        <select v-else-if="field.type == 'select'" :name="field.name">
          <option :value="name" v-for="name in field.options" :key="name">{{name}}</option>
        </select>
        <input v-else v-bind="field">
      </label>
      <button @click="convertToObject">Générer</button>
    </form>
    <div v-if="yamlOutput">
      <textarea rows="20" class="yaml" v-model="yamlOutput"/>
      <a :href="link" target="_blank">{{ link }}</a>
    </div>
  </Layout>
</template>

<script>
const yaml = require("js-yaml");
const objectFromFormData = formData => {
  const values = {};
  for (let [key, value] of formData.entries()) {
    if (values[key]) {
      if (!(values[key] instanceof Array)) {
        values[key] = new Array(values[key]);
      }
      values[key].push(value);
    } else {
      values[key] = value;
    }
  }
  return values;
};
export default {
  metaInfo: {
    title: "Add Ressource"
  },
  data() {
    return {
      form: null,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          placeholder: "Name"
        },
        {
          name: "alias",
          type: "text"
        },
        {
          name: "url",
          type: "url",
          placeholder: "https://example.com",
          pattern: "https://.*",
          required: true
        },
        {
          name: "description",
          type: "textarea",
          required: true
        },
        {
          name: "category",
          type: "select",
          options: [
            "Collectives",
            "Datasets",
            "Festivals",
            "Laboratories",
            "Magazines",
            "People",
            "Places",
            "Posts",
            "Projects",
            "Residences",
            "Tutorials",
            "Utilities"
          ],
          required: true
        },
        {
          name: "authors",
          type: "text"
        },
        {
          name: "tags",
          type: "text",
          required: true
        },
        {
          name: "city",
          type: "text"
        },
        {
          name: "country",
          type: "text"
        }
      ]
    };
  },
  methods: {
    convertToObject() {
      const form = new FormData(this.$refs.form);
      this.form = objectFromFormData(form);
    }
  },
  computed: {
    link() {
      const category = this.form ? this.form.category : "";
      return `https://github.com/nestarz/soi/tree/master/content/ressources/${category}`;
    },
    yamlOutput() {
      return this.form ? yaml.safeDump(this.form) : null;
    }
  }
};
</script>

<style lang="scss" scoped>
.add-ressources {
  .yaml {
    width: 100%;
    height: 100%;
  }
  form {
    display: grid;
    grid-auto-rows: 1fr;
    grid-gap: 1rem;
    label {
      display: grid;
      grid-template-columns: 0.25fr 1fr;
      .required {
        color: red;
      }
      select {
        height: 100%;
      }
      &.description {
        grid-row: auto / span 2;
      }
    }
  }
}
</style>
