import { createStore } from "vuex";

export default createStore({
    state: {
        player: "",
        gameOver: false,
        board: [
            {winner: false, player:''},
            {winner: false, player:''},
            {winner: false,  player:''},
            {winner: false, player:''},
            {winner: false, player:''},
            {winner: false, player:''},
            {winner: false, player:''},n
            {winner: false, player:''},
            {winner: false, player:''},
        ],
        oldGameStore: [],
        messages: {
            removeMessage: '',
            noPlayer: 'Please select a player',
            gameDraw: 'This game is a draw',
            gameWinnerX: 'Player X wins !',
            gameWinnerO: 'Player O wins !',
            gameOver: 'Game over man!!, Game over!',  
        },
        message: '',
        count: 0,
        showPlayers: true

    },
    getters: {
        getCurrentGame (state) {
            return state.board;
        },
        getGameCount (state) {
            return state.count;
        },
        getPastGames (state) {
            return state.oldGameStore;
        },
        getMessages (state) {
            return state.message;
        }

    },
    mutations: {
        resetMatch: (state) => {
            state.oldGameStore = [];
        },
        storeResult: (state) => {
            state.oldGameStore.push([state.player, JSON.parse(JSON.stringify(state.board))]);
        },
        storeResultDraw: (state) => {
            state.oldGameStore.push(['-', JSON.parse(JSON.stringify(state.board))]);
        },
        setMessage: (state, messageId) => {
            state.message = state.messages[messageId];
        },
        setGameOver: (state) => {
            state.gameOver = false;
            state.player = '';
            state.count = 0;
            state.showPlayers = false;
        },
        setPlayer: (state, player) => {
            state.player = player;
        },
        switchPlayer: (state) => {
            state.player = (state.player === "X") ? 'O':'X';
        },
        updateGame: (state, properties) => {
            let gridSelected = properties[0];
            state.board = state.board.map((i, index)=> (index===Number(gridSelected)) ? {winner: false, player:state.player} : i);
            state.count++;
        },
        resetGame: (state) => {
            state.board = [
                {winner: false, player:''},
                {winner: false, player:''},
                {winner: false,  player:''},
                {winner: false, player:''},
                {winner: false, player:''},
                {winner: false, player:''},
                {winner: false, player:''},
                {winner: false, player:''},
                {winner: false, player:''},
            ];
            state.gameOver = false;
            state.player = '';
            state.count = 0;
            state.showPlayers = true;
        },
    },
    actions: {},
    modules: {},
});
