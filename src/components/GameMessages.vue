<template>
    <div class="game-messages" v-if="this.getMessages">
        <h2>{{ this.getMessages }}</h2>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: "GameMessages",
    computed: {
        ...mapGetters([
            'getMessages' 
        ])
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game-messages {
    padding: 20px;
    padding-bottom: 0;
    h2 {font-size: 30px; text-align: center;}


}
</style>
