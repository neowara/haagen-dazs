<template>
  <div id="app">
    <Nav />
    <main>
      <ItemCard />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Nav from "./components/Nav/Nav.vue";
import ItemCard from "./components/ItemCard/ItemCard.vue";

@Component({
  components: {
    Nav,
    ItemCard,
  },
})
export default class App extends Vue {
  private getData() {
    return this.$store.dispatch("getData");
  }

  created() {
    this.getData();
  }
}
</script>

<style lang="scss">
@import "assets/scss/_base.scss";
</style>
