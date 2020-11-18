<template>
  <div class="item">
    <div class="card" v-for="item in items" v-bind:key="item._id">
      <h2>{{ item.header }}</h2>
      <h4>{{ item.quick_text }}</h4>
      <p>{{ item.description }}</p>
      <p>
        Item created:
        <span class="date">{{ formatDate(item.created_at) }}</span>
      </p>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="media in item.fe_media" v-bind:key="media.id">
          <img :src="media.file" alt="featured-image" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ItemCard extends Vue {
  /**  Simple function to conver epoch time to human time. Used slice to only use
   *   YY-MM-DD as my format
   *   @param date the raw date in epoch format */
  private formatDate(date: number) {
    return new Date(date * 1000).toISOString().slice(0, 10);
  }

  /**This fetches the items stored in the vue store */
  private get items() {
    return this.$store.state.data;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./ItemCard.scss">
</style>
