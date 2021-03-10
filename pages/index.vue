<template>
<div>
  <input type="text" id="name" v-model="name" @input="convert_kana"><br />
  <input type="text" id="furigana" v-model="furigana">
</div>
</template>

<script>
let AutoKana
if (process.browser) {
   AutoKana = require('vanilla-autokana')
}
let autokana;

export default {
  data() {
    return {
      form: {
        name: "",
        furigana: ""
      }
    }
  },
  mounted() {
    autokana = AutoKana.bind("#name", "#furigana", { katakana: true })
  },
  methods: {
    convert_kana() {
      this.furigana = autokana.getFurigana()
    }
  }
}
</script>