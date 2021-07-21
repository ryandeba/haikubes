<template>
  <span class="font-weight-bold" :class="color" style="font-size: 52px;">
    {{ syllableCount }}
  </span>
</template>

<script>
export default {
    props: ["requiredSyllables", "syllableCount"],

    computed: {
        color() {
            if (this.syllableCount < this.requiredSyllables) {
                return 'grey--text text--lighten-3';
            } else if (this.syllableCount === this.requiredSyllables) {
                return 'green--text text--lighten-3';
            } else {
                return 'red--text text--lighten-3';
            }
        }
    }
};

</script>

<style>

</style>