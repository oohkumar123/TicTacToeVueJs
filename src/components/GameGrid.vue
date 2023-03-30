<template>
    <div class="game-grid" v-on:click="selectedGridElement($event)">
        <div :class="{ winner: item.winner }" v-for="(item, index) in this.getCurrentGame" :data-gridnum="index" :key="index">
            <span>{{ item.player }}</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex' 
export default {
    name: "GameGrid",
    data() {
        return {
            currentPlayer:'',
            count: 0
        };
    },
    computed: {
        ...mapState([
            'board',
            'gameOver',
            'player'
        ]),
        ...mapGetters([
            'getCurrentGame',
            'getGameCount'
        ])
    },
    methods: {
        selectedGridElement(e) {
            if (!this.player) {
                this.$store.commit("setMessage", 'noPlayer'); 
                return;
            };
            
            if (this.gameOver) return;
            
            let gridSelected = (e.target.nodeName === "SPAN") ? e.target.parentElement.dataset.gridnum : e.target.dataset.gridnum;

            this.$store.commit("updateGame", [gridSelected]);                
            
            let winner = this.checkForWinner(this.player, this.board);
            if (winner) {
                this.colorCodeWinner(winner);
                this.$store.commit('storeResult');
                this.$store.commit("setMessage", 'gameWinner'+this.player);
                this.$store.commit("setGameOver");
            } else if (this.getGameCount==9) {
                this.$store.commit('storeResultDraw');
                this.$store.commit("setMessage", 'gameDraw');
                this.$store.commit("setGameOver");
            } else {
                this.$store.commit("switchPlayer");
            }
        },
        
        checkForWinner (player, result) {
            let gameMoves = [];
            
            for (let i=0; i<9; i+=3) {
                gameMoves = []
                for (let j=i; j<i+3; j++) {
                    if (result[j].player===player) {
                        gameMoves.push(j);
                    }
                    if (gameMoves.length===3) {
                        return gameMoves;
                    }
                }
            }

            gameMoves = [];

            for (let i=0; i<3; i++) {
                gameMoves = []

                for (let j=i; j<9; j+=3) {
                    if (result[j].player===player) {
                        gameMoves.push(j);
                    }
                    if (gameMoves.length===3) {
                        return gameMoves;
                    }
                }
            }

            gameMoves = [];

            let j=0;
            for (let i=0; i<9; i+=3) {
                if (result[i+j].player===player) {
                    gameMoves.push(i+j);
                }
                if (gameMoves.length===3) {
                    return gameMoves;
                }
                j++;
            }
            
            gameMoves = [];

            let k=2;
            for (let i=0; i<9; i+=3) {
                if (result[i+k].player===player) {
                    gameMoves.push(i+k);
                }
                if (gameMoves.length===3) {
                    return gameMoves;
                }
                k--;
            }

            return false;
        },
        
        colorCodeWinner(winner) {
            this.board.forEach ((i,index)=>{
                if (winner.includes(index)) {
                    this.board[index].winner = true;
                }
            });
        },
    },
};
</script>

<style scoped lang="scss">
    .game-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        div {
            display: flex;
            justify-content: center;
            align-items: center;
            aspect-ratio: 1 / 1;
            &:hover {
                cursor: pointer;
            }
            &:nth-child(odd) {
                background-color: $federal-blue;
            }
            &:nth-child(even) {
                background-color: $honolulu-blue;
            }
            span {
                font-size: 120px;
                color: white;
            }
            &.winner {
                color: red;
                animation-name: spin;
                animation-duration: 500ms;
                animation-iteration-count: 1;
                animation-timing-function: linear; 
                span {
                    color: red;
                }
            }
        }
    }
    @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>
