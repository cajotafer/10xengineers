<script>
  export let texts;
  export let lang;
  const { common, questions, resultText, shareText } = texts
  let count = 0;
  let total = 0;
  let started = false;
  let finished = false;
  let robot = false;
  let result = "";
  let share = "";

  function handleStart() {
    started = true;
  }

  function handleRestart() {
    started = false;
    count = 0;
    total = 0;
    finished = false;
  }

  function showResult(total) {
    const MAX = 45;
    const STEP = 3;
    let lvl = 0;

    if (total === MAX) lvl = 10;
    else {
      let reduc = MAX - STEP;
      for (let i = 9; i > 0; i--)
        if (total >= reduc) {
          lvl = i;
          break;
        } else reduc -= STEP;
    }
    result = resultText(lvl)
    share = shareText(lvl)

    finished = true;
  }

  function handleSubmit() {
    robot = false;
    count += 1;
    if (count === questions.length) showResult(total);
  }

  function handleClick(e) {
    e.target.blur();
    total += parseInt(e.target.dataset.value);
    if (e.target.dataset.validate === "true") robot = true;
    else count += 1;
    if (count === questions.length) showResult(total);
  }
</script>

<style>
  .flex {
    display: flex;
  }
  .spacing {
    margin: 2em 0;
  }
  .btn-container {
    flex-direction: column;
    width: 100%;
    max-width: 500px;
  }
  button {
    cursor: pointer;
  }
  i {
    text-align: center;
  }
</style>

<div id="fb-root" />
<main>
  {#if started === false}
    <p>
      <q cite="https://twitter.com/skirani/status/1149302828420067328">
        {common.quote}
      </q>
      <br />
      {common.qAuthor}
    </p>
    <h1>{common.title}</h1>
    <div class="btn-container flex spacing">
      <button on:click={handleStart}>{common.button}</button>
    </div>
    <a href="{common.changeLangLink}">{common.changeLang}</a>
  {:else if finished === false && robot === false}
    <h2>{questions[count].q}</h2>
    <div class="btn-container flex spacing">
      {#each questions[count].r as option, i}
        <button
          on:click={handleClick}
          data-value={option.value}
          data-validate={option.robot}>
          {option.text}
        </button>
      {/each}
    </div>
  {:else if finished === false && robot === true}
    <h2>{common.robot}</h2>
    <form action="" method="POST" on:submit|preventDefault={handleSubmit}>
      <div id="recaptcha" />
      <br />
      <input type="submit" value="Submit" />
    </form>
    <script
      src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
      defer>

    </script>
  {:else if finished === true}
    <h1>{result}</h1>
    <div class="flex">
      <a
        class="twitter-share-button"
        href="https://twitter.com/intent/tweet"
        data-size="large"
        data-text={share}
        data-url="https://10xengineers.netlify.com/"
        data-hashtags="10xEngineer"
        data-related="skirani, cajotafer, cvander, dhh, addyosmani">
        Tweet
      </a>
      &nbsp;&nbsp;or&nbsp;&nbsp;
      <div
        class="fb-share-button"
        data-href="https://10xengineers.netlify.com/"
        data-layout="button"
        data-size="large">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F10xengineers.netlify.com%2F&amp;src=sdkpreparse"
          class="fb-xfbml-parse-ignore">
          Share
        </a>
      </div>
    </div>
    <i class="spacing">
      {common.origin[0]}
      <a href="https://twitter.com/skirani/status/1149302828420067328">
        {common.origin[1]}
      </a>
      {common.origin[2]}
    </i>
    <div class="btn-container flex spacing">
      <button on:click={handleRestart}>{common.try}</button>
    </div>
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
    <script>
      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src =
          "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    </script>
  {/if}
</main>
<address class="spacing">
  {common.createdBy}
  <a href="https://cajotafer.com">Cajotafer</a>
  |
  <a href="https://twitter.com/cajotafer">Twitter</a>
  | {common.contribute}
  <a href="https://github.com/cajotafer/10xengineers">Github</a>
</address>
