<script>
  import { landing, questions } from "./texts.js";
  export let name;
  let count = 0;
  let total = 0;
  let started = false;
  let finished = false;
  let result = "";
  let share = "";

  function handleStart() {
    started = true;
  }

  function showResult(total) {
    const MAX = 45;
    let lvl = 9;

    if (total === MAX) lvl = 10;
    else {
      const STEP = 3;
      let reduc = MAX - STEP;
      for (let i = 9; i > 0; i--)
        if (total >= reduc) {
          lvl = i;
          break;
        } else reduc -= STEP;
    }
    switch (lvl) {
      case 10: {
        result = `You are a ${lvl}x Engineer! Apple must hire you!`;
        share = `I'm a ${lvl}x Engineer! I'm preparing my CV! Do the quiz here ->`;
      }
      case 0: {
        result =
          "I'm not sure you are an engineer, you have to effort... trust me";
        share =
          "I think my professional life needs some change. Maybe I am not an engineer. Do the quiz here ->";
      }
      default: {
        result = `You are a ${lvl}x Engineer! That is not enough.`;
        share = `I'm a ${lvl}x Engineer! What a shame. Do the quiz here ->`;
      }
    }

    finished = true;
  }

  function handleClick(e) {
    e.target.blur();
    count += 1;
    total += parseInt(e.target.dataset.value);
    if (count === questions.length) showResult(total);
  }
</script>

<style>
  .spacing {
    margin: 2em 0;
  }
  .btn-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
  }
  button {
    cursor: pointer;
  }
</style>

<main>
  {#if started === false}
  <p>
    <q cite="https://twitter.com/skirani/status/1149302828420067328">
      If you have a 10x engineer as part of your first few engineers, you
      increase the odds of your startup success significantly.
    </q>
    <br />
    Shekhar Kirani
  </p>
  <h1>{landing.title}</h1>
  <div class="btn-container spacing">
    <button on:click="{handleStart}">{landing.button}</button>
  </div>
  {:else if finished === false}
  <h2>{questions[count].q}</h2>
  <div class="btn-container spacing">
    {#each questions[count].r as option, i}
    <button
      on:click="{handleClick}"
      data-value="{option.value}"
      data-validate="{option.robot}"
    >
      {option.text}
    </button>
    {/each}
  </div>
  {:else if finished === true}
  <h1>{result}</h1>
  <a
    class="twitter-share-button"
    href="https://twitter.com/intent/tweet"
    data-size="large"
    data-text="{share}"
    data-url="https://10xengineers.netlify.com/"
    data-hashtags="10xEngineer"
    data-related="skirani, cajotafer, cvander, dhh, addyosmani"
  >
    Tweet
  </a>
  <script>
    window.twttr = (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };

      return t;
    })(document, "script", "twitter-wjs");
  </script>
  {/if}
</main>
<address class="spacing">
  Created by <a href="https://cajotafer.com">Cajotafer</a> |
  <a href="https://twitter.com/cajotafer">Twitter</a> |
  <a href="https://github.com/cajotafer">Github</a>
</address>
