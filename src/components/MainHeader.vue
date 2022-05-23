/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/require-default-prop */
<template>
    <header class="main-header">
        <a href="/">
            <img src="/img/tumaaero-logo.jpg" alt="TůmaAerospace s.r.o.">
        </a>
        <nav class="main-menu">
            <ul>
                <li 
                    v-for="item, index in data" 
                    :key="index"
                    @click.prevent="$emit('changeData', item)"
                    :class="{ active: item == this.active}"
                >
                        {{item.nazev}}
                </li>
            </ul>
        </nav>
        <span class="timer">{{timestamp}}</span>
    </header>
</template>

<script>
export default {
    props: [
        'data',
        'active',
    ],
    data() {
        return {
            timestamp: '',
        }
    },
    created() {
        setInterval(this.getNow, 1000)
    },
    methods: {
        getNow() {
            const today = new Date()
            const date = today.getDate() + '.' +(today.getMonth()+1)+ '.' + today.getFullYear()
            const time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds())
            const dateTime = date +' '+ time
            this.timestamp = dateTime
        },
    },
}
</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 10px;
  background-color: rgba(#FFF, .5);
  box-shadow: 15px 15px 35px rgba(#FFF, .2);
  .timer {
    min-width: 150px;
    text-align: right;
  }
}
.main-menu ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    margin: 0;
    text-transform: uppercase;
    li {
        padding: 0.5em;
        cursor: pointer;
        transition: all .3s ease-in;
        &:hover, &:focus, &.active {
            font-weight: 700;
            transform: scale(1.1);
        }
    }
}
</style>