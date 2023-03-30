<template>
    <div class="container">
        <GameGrid></GameGrid>
        <GameMessages></GameMessages>
        <PlayerGrid></PlayerGrid>
        <GameScores></GameScores> 
    </div>
</template>

<script>
import GameGrid from "./GameGrid";
import PlayerGrid from "./PlayerGrid";
import GameScores from "./GameScores";
import GameMessages from "./GameMessages";

export default {
    name: "GameBoard",
    components: {
        GameGrid,
        PlayerGrid,
        GameMessages,
        GameScores,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
    width: 650px;
    margin:auto;
}
</style>
