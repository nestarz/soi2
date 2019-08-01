<template>
  <layout>
    <template slot="sidebar">
      <div v-for="(section, key) in sections" :key="key" class="resume">
        <h2>{{ section.title }}</h2>
        <ul class="block">
          <li class="item" v-for="(item, index) in section.list" :key="index">
            <span v-if="item.name">{{ item.name }}</span>
            <span v-if="item.score">{{ item.score }}</span>
            <h2 v-if="item.title">{{ item.title }}</h2>
            <ul class="block" v-if="item.list">
              <li v-for="(subitem, index) in item.list" :key="index">
                <span>{{ subitem.name }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </template>
    <grid>
      <div v-for="(section, key) in records.records" :key="key" class="resume">
        <h2>{{ section.title }}</h2>
        <ul class="block">
          <li class="item block" v-for="(item, index) in section.list" :key="index">
            <h2 v-if="item.title">{{ item.title }}</h2>
            <div v-if="item.etablishment">{{ item.etablishment }}</div>
            <div v-if="item.location">{{ item.location }}</div>
            <div class="date">
              <span v-if="item.from">{{ item.from }}</span>
              <span v-if="item.from && item.to">-</span>
              <span v-if="item.to">{{ item.to }}</span>
            </div>
            <div v-if="item.description" class="description">{{ item.description }}</div>
          </li>
        </ul>
      </div>
      <div class="resume description">
        <div class="block">
          <div>{{ resume.shortBio }}</div>
        </div>
        <grid>
          <ul class="block">
            <h2>Contact</h2>
            <a :href="`tel:${phoneNumber}`">{{ phoneNumber }}</a>
          </ul>
          <ul class="block">
            <h2>Réseaux</h2>
            <ul>
              <li v-for="network in $page.metaData.network" :key="network.url">
                <a :href="network.url">{{ network.title }}</a>
              </li>
            </ul>
          </ul>
        </grid>
      </div>
    </grid>
  </layout>
</template>

<script>
import Grid from "~/components/grid.vue";

const iterate = (obj, langs) =>
  Object.keys(obj).reduce((prev, key) => {
    if (obj[key] && langs.some(lang => obj[key].hasOwnProperty(lang))) {
      const index = langs.findIndex(
        lang => obj[key].hasOwnProperty(lang) && obj[key][lang]
      );
      prev[key] = obj[key][langs[index]];
    } else if (obj[key] && Array.isArray(obj[key])) {
      prev[key] = obj[key].map(item => iterate(item, langs));
    } else if (obj[key] && typeof obj[key] === "object") {
      prev[key] = iterate(obj[key], langs);
    } else {
      prev[key] = obj[key];
    }
    return prev;
  }, {});

export default {
  components: {
    Grid
  },
  computed: {
    phoneNumber() {
      const { code, number } = this.$page.metaData.phone;
      return `+${code}${number}`;
    },
    resume() {
      return iterate(this.$page.resume, ["fr", "all"]);
    },
    sections() {
      return {
        languages: { ...this.resume.languages },
        skills: { ...this.resume.skills },
        publications: { ...this.resume.publications }
      };
    },
    records() {
      return {
        records: { ...this.resume.records }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.resume {
  h1,
  h2 {
    font-weight: 600;
  }

  ul {
    li {
      list-style: none;
    }
  }

  .description {
    display: none;
    margin-top: 0.1rem;
  }
}

.description {
  grid-column: span 2;
}

.block {
  margin-bottom: 1rem;
}

.item {
  span + span {
    margin-left: 7px;
  }
}
</style>


<page-query>
query Resume($id: String!) {
  metaData {
    siteName
    phone {
      code
      number
    }
    network {
      title
      url
    }
  }
  resume(id: $id) {
    shortBio {
      fr
      en
    }
    languages {
      title {
        fr
        en
      }
      list {
        name {
          fr
          en
        }
        score {
          fr
          en
        }
      }
    }
    skills {
      title {
        fr
        en
      }
      list {
        title {
          fr
          en
        }
        list {
          name {
            fr
            en
            all # Only if fr/en isn't useful
          }
        }
      }
    }
    publications {
      title {
        fr
        en
      }
      list {
        title {
          fr
          en
        }
        url
      }
    }
    records {
      title {
        fr
        en
      }
      list {
        from
        to
        title {
          fr
          en
        }
        etablishment
        location
        description {
          fr
          en
        }
      }
    }
  }
}
</page-query>