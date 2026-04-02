<script>
  export let title = 'Music Player';
  export let songs = [];
</script>

<style>
  .player {
    display: flex;
    flex-direction: column;
    background: #1c1c1c;
    color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
  .track {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
</style>

<div class="player">
  <h1>{title}</h1>
  {#each songs as song}
    <div class="track">
      <div>{song.name} - {song.artist}</div>
      <button>Play</button>
    </div>
  {/each}
</div>