<template>
  <span class="font-weight-bold" :class="[color, viewportSize]">
    {{ syllableCount }}
  </span>
</template>

<script>
export default {
    props: ["requiredSyllables", "syllableCount"],

    computed: {
        color() {
            if (this.syllableCount < this.requiredSyllables) {
                return 'grey--text';
            } else if (this.syllableCount === this.requiredSyllables) {
                return 'green--text';
            } else {
                return 'red--text';
            }
        },

        viewportSize() {
            return this.$vuetify.breakpoint.name;
        }
    }
};
</script>

<style scoped>
    .xs {
        font-size: 20px;
    }

    .md {
        font-size: 32px;
    }

    .lg {
        font-size: 50px;
    }
</style>