<template>
    <div class="player-grid">
        <div :class="{hide: !this.showPlayers}"><span data-player="X" v-on:click="setStartingPlayer" ref="playerX" :class="{selected: (myPlayer=='X')}">X</span></div>
        <div><span v-on:click="reset()">{{resett}}</span></div>
        <div :class="{hide: !this.showPlayers}"><span data-player="O" v-on:click="setStartingPlayer" ref="playerO" :class="{selected: (myPlayer=='O')}">O</span></div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: "PlayerGrid",
    data() {
        return {
            resett: 'Reset',
            //reset: '¯\\_(ツ)_/¯'
        }

    },
    computed: {
        ...mapState({
            myPlayer: 'player',
            showPlayers:'showPlayers'
        }),
        ...mapGetters([
            'getMessages',
            'getPastGames'
        ])
    },
    updated() { },
    methods: {
        setStartingPlayer(e) {
            if (this.myPlayer) return;
            let player = e.target.dataset.player;
            this.$store.commit("setPlayer", player);
            e.target.classList.add('selected');
            this.$store.commit("setMessage", 'removeMessage'); 
        },
        reset() {
            this.$store.commit("resetGame");
            this.$refs.playerX.classList.remove('selected');
            this.$refs.playerO.classList.remove('selected');
            this.$store.commit("setMessage", 'removeMessage'); 
            this.showPlayers = true;
            if (this.getPastGames.length==5) this.$store.commit("resetMatch");
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.player-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 20px;
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        &:nth-child(1),
        &:nth-child(3) {
            span {
                background: $federal-blue;
                @media (max-width: 670px) {
                    width: 100%
                }
            }
            &.hide {visibility: hidden;}
        }
        &:nth-child(2) {
            span {
                background: $honolulu-blue;
                font-size: 30px;
                border-radius: 20px;
                padding: 22px;
                color: white;
                @media (max-width: 670px) {
                    font-size: 22px;
                    border-radius: 15px;
                    padding: 12px;
                }
            }
        }
        span {
            font-size: 60px;
            border-radius: 20px;
            padding: 22px;
            text-align: center;
            @media (max-width: 670px) {
                font-size: 22px;
                border-radius: 15px;
                padding: 12px;
            }
            color: white;
            cursor: pointer;            
            &.selected {
                background: $marian-red;
            }
        }
    }
}
</style>
