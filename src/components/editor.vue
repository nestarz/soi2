<template>
  <div class="editor">
    <codemirror v-model="current" :options="cmOptions" height="900"></codemirror>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";

// http://www.programmersought.com/article/8062245662/
import "codemirror/mode/javascript/javascript.js";

// active-line.js
import "codemirror/addon/selection/active-line.js";

// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/search/searchcursor.js";

// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";

// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";

// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";
export default {
  components: {
    codemirror
  },
  props: ['code'],
  data() {
    return {
      current: this.code,
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
        extraKeys: {
          Ctrl: "autocomplete",
          "Ctrl-S": () => {
            this.$emit('save', this.current);
          }
        },
        hintOptions: {
          completeSingle: false
        }
      }
    };
  },
  watch: {
    current() {
      this.$emit('change', this.current);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../node_modules/codemirror/lib/codemirror.css";
@import "../../node_modules/codemirror/addon/merge/merge.css";
@import "../../node_modules/codemirror/theme/monokai.css";

.editor {
  /deep/ .CodeMirror {
    height: 500px;
  }
}
</style>
