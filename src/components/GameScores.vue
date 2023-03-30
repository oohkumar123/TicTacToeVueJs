<template>
    <div class="game-scores" v-if="getPastGames.length">
        <h2>Game Scores</h2>
        <table class="game-table-result">
            <tr>
                <th>Game Number</th>
                <th>Winner</th>
                <th>View Game</th>
            </tr>
            <tr v-for="(game, index) in getPastGames" :key="index">
                <td>{{ (index + 1) }}</td>
                <td>{{ game[0] }}</td>
                <td>
                    <div class="mini-game">
                        <div v-for="(scores, index) in game[1]" :key="index"><span :class="{winner: scores.winner}">{{ scores.player }}</span></div>
                    </div>
                </td>
            </tr>
        </table>
        <br>
        <h2>Game Totals</h2>
        <table class="game-table-result">
            <tr>
                <th>Player X</th>
                <th>Player O</th>
            </tr>
            <tr>
                <td>{{ computeTotals('X') }}</td>
                <td>{{ computeTotals('O')  }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "GameScores",
    data() {
        return {}
    }, 
    updated () {
        if (this.getPastGames.length===5) {
            this.$store.commit("setMessage", 'gameOver'); 
        }
    },
    computed: {
        ...mapGetters([
            'getPastGames'
        ]),
    },
    methods: {
        computeTotals (player) {
            let count=0;
            this.getPastGames.forEach ((game)=>{
                if (game[0]==player) {count++}
            });
            return count;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .game-scores {
        border: 2px solid $federal-blue;
        border-radius: 20px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
        h2 {
            font-size: 40px;
            color: $federal-blue;
        }
        .game-table-result {
            margin-top: 20px;
            th {
                padding: 10px;
                color: $federal-blue;
                font-size: 22px; 
                text-align: center;
                width:140px;
                &:nth-child(2) {
                    text-align: center;
                }
                &:nth-child(3) {
                    text-align: center;
                }
            }
            td {
                padding: 10px;
                color: $honolulu-blue;
                font-size: 50px;
                text-align: center;
                border-bottom: 1px dotted #ccc;
                &:nth-child(2) {}
                &:nth-child(3) {
                    text-align: center;
                    vertical-align: top;
                    > .mini-game {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        width: 50px;
                        vertical-align: top;
                        margin:auto;
                        div {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            aspect-ratio: 1 / 1;
                            &:nth-child(odd) {
                                background-color: $federal-blue;
                            }
                            &:nth-child(even) {
                                background-color: $honolulu-blue;
                            }
                            span {
                                font-size: 10px;
                                color: white;
                                &.winner {
                                    color: red;
                                }
                            }
                        }
                    }
                }
            }
        }        
        .game-table-totals {
            td {
                padding: 10px;
                color: $honolulu-blue;
                font-size: 20px;
                text-align: center;
                border-bottom: 1px dotted #ccc;
            }
        }
    }
</style>
