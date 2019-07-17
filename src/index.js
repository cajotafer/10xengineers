import App from "./App.svelte";
import {
  common as es_common,
  questions as es_questions,
  resultText as es_resultText,
  shareText as es_shareText
} from "./lang/es.js";
import {
  common as en_common,
  questions as en_questions,
  resultText as en_resultText,
  shareText as en_shareText
} from "./lang/en.js";

const lang = location.pathname;

let common = lang === "/es/" ? es_common : en_common;
let questions = lang === "/es/" ? es_questions : en_questions;
let resultText = lang === "/es/" ? es_resultText : en_resultText;
let shareText = lang === "/es/" ? es_shareText : en_shareText;

const app = new App({
  target: document.body,
  props: {
    texts: { common, questions, resultText, shareText }
  }
});

export default app;
