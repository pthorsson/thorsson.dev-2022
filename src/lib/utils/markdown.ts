import { marked } from 'marked';
import hljs from 'highlight.js';

marked.setOptions({
  highlight: function (code, language) {
    try {
      return hljs.highlight(code, { language }).value;
    } catch (error) {
      return code;
    }
  }
});

export default marked;
