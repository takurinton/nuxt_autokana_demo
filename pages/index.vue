<template>
<div>
  <div>
    <h2>1</h2>
    <input type="text" id="name" v-model="name" @input="convert_kana">
    <input type="text" id="furigana" v-model="furigana">
  </div>
  <div>
    <h2>2</h2>
    <input type="text" id="_name" v-model="_name" @input="convert_kana">
    <input type="text" id="_furigana" v-model="_furigana">
  </div>
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
        furigana: "", 
        _name: "", 
        _furigana: ""
      }
    }
  },
  mounted() {
    autokana = AutoKana.bind("#name", "#furigana", { katakana: true })
    autokana = AutoKana.bind("#_name", "#_furigana", { katakana: true })
  },
  methods: {
    convert_kana() {
      this.furigana = autokana.getFurigana()
      this._furigana = autokana.getFurigana()
    }
  }
}
</script>