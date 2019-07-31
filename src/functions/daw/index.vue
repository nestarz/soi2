<template>
  <layout>
    <h1>DAW</h1>
    <p>Elias.</p>
    <div class="editor">
      <codemirror v-model="code" :options="cmOptions" height="900"></codemirror>
      <div class="save">Save</div>
    </div>
  </layout>
</template>

<script>
import { codemirror } from "vue-codemirror";

// http://www.programmersought.com/article/8062245662/
import "codemirror/mode/javascript/javascript.js";
 
// active-line.js
import 'codemirror/addon/selection/active-line.js'
 
// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'
 
// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/match-highlighter.js'
 
// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/sublime.js'
 
// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/xml-fold.js'
export default {
  metaInfo: {
    title: "DAW"
  },
  components: {
    codemirror
  },
  data() {
    return {
      code: [
        "var vol = new Tone.Volume(-19).toMaster();",
        "",
        "var clap2 = new Tone.Sampler({'C3': 'clap1.mp3'}).chain(vol);",
        "",
        "var c = new Tone.Loop(t => {",
        "  clap2.triggerAttackRelease('C1', '2n', `${t} + 0:0:0`),",
        "  clap2.triggerAttackRelease('C1', '2n', `${t} + 0:0:1`),",
        "  clap2.triggerAttackRelease('C1', '2n', `${t} + 0:0:2`),",
        "  clap2.triggerAttackRelease('C1', '2n', `${t} + 0:0:3`),",
        "  clap2.triggerAttackRelease('C1', '2n', `${t} + 0:0:4`),",
        "  clap2.triggerAttackRelease('C1', '2n', `${t} + 0:0:5`),",
        "  clap2.triggerAttackRelease('C1', '2n', `${t} + 0:0:6`),",
        "}, '0:2:0');",
        "",
        "var o = {",
        "  vars: [",
        "    ['vol', vol.volume, -100, 100],",
        "  ],",
        "}"
      ].join('\n'),
      cmOptions: {
        // codemirror options
        tabSize: 2,
        mode: "text/javascript",
        theme: "monokai",
        lineNumbers: true,
        line: true,
        // more codemirror options, 更多 codemirror 的高级配置...
        styleActiveLine: true,
        foldGutter: true,
        styleSelectedText: true,
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        extraKeys: { "Ctrl": "autocomplete" },
        hintOptions:{
          completeSingle: false
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/codemirror/lib/codemirror.css";
@import "../../../node_modules/codemirror/addon/merge/merge.css";
@import "../../../node_modules/codemirror/theme/monokai.css";

.editor {
  max-width: 60rem;

  /deep/ .CodeMirror {
    height: 500px;
  }
}
</style>
