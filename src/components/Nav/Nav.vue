<template>
  <div class="content">
    <header>
      <div class="logo">
        <h1>
          <img src="../../assets/media/logo.png" alt="Haagen-Dazs logo" />
          Erbjudander
        </h1>
      </div>

      <div class="search">
        <label class="visually-hidden" for="search-bar">Sök</label>
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          placeholder="ex: Upptäck"
          v-model="query"
          v-on:keyup.enter="searchData()"
        />
        <button @click="searchData()">Sök</button>
      </div>
    </header>

    <div class="filter-sort">
      <section class="filters">
        <el-collapse accordion>
          <el-collapse-item title="Filter" name="1">
            <div class="card-content">
              <el-radio-group v-model="selectedTag" @change="filterData()">
                <el-radio-button label="Upptäck"></el-radio-button>
                <el-radio-button label="Nyhet"></el-radio-button>
                <el-radio-button label="Tävling"></el-radio-button>
              </el-radio-group>
            </div>
          </el-collapse-item>
        </el-collapse>
      </section>

      <section class="sorting">
        <el-select v-model="value" placeholder="Sortera" @change="sortData()">
          <el-option
            v-for="item in sorting"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Nav extends Vue {
  @Prop() private msg!: string;

  sorting: Array<Object> = [
    { label: "Äldst stigande", value: "asc" },
    { label: "Senaste inkomna", value: "desc" },
  ];

  value: string = "";
  selectedTag: string = "";
  query: string = "";

  /**
   * Uses the v-model query to perform a PUT request using @param
   * this will dispatch an action in the vue store
   * which searches for assets on the "header" OR "description" field of the assets
   * @param param defines the data that will be sent in the Body
   */
  private async searchData(param: {}) {
    this.value = "";
    this.selectedTag = "";
    this.$store.dispatch("emptyData");
    await this.$store.dispatch("getData", {
      query: this.query,
    });
  }

  /**
   * Uses the v-model selectedTag to perform a PUT request using @param
   * this will dispatch an action in the vue store
   * which searches for "tag" on assets
   * @var selectedtag a list of radio buttons with different tag values to search for
   * @param param defines the data that will be sent in the Body
   */
  private async filterData(param: {}) {
    this.value = "";
    this.$store.dispatch("emptyData");
    await this.$store.dispatch("getData", {
      tag: this.selectedTag.toLowerCase(),
    });
  }

  /**
   * Uses the v-model value to perform a PUT request using @param
   * this will dispatch an action in the vue store
   *  which, depening on the value selected, orders the returning assets, default is "desc"
   * @var sorting is an array of objects with different values, it changes the v-model value depending on which one is selected
   * @param param defines the data that will be sent in the Body
   */
  private async sortData(param: {}) {
    this.selectedTag = "";
    this.$store.dispatch("emptyData");
    await this.$store.dispatch("getData", { sort: this.value });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Nav.scss"></style>
