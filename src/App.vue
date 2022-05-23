<template>
  <MainHeader :data="settings" @changeData="handleDataChange" :active="currentDataSource"/>
  <TopPanel :dataSource="currentDataSource" />
  <BottomPanel :dataSource="currentDataSource" />
  <MainFooter />
</template>

<script>
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import TopPanel from './components/TopPanel.vue'
import BottomPanel from './components/BottomPanel.vue'

export default {
  components: {
    MainHeader,
    MainFooter,
    TopPanel,
    BottomPanel,
  },
  data() {
    return {
      settings: {
        1: {
          nazev: 'CNC 1',
          id: 'SberDat03',
          pracoviste: ['Haas VF-2SS', 'Haas VF-3SS vak.', 'Haas VF-3SS'],
        },
        2: {
          nazev: 'CNC 2',
          id: 'SberDat11',
          pracoviste: ['Haas VF-3', 'Haas VF-6SS'],
        },
        3: {
          nazev: 'Elumatec',
          id: 'SberDat12',
          pracoviste: ['Elumatec', 'SESTAVY', 'VSTUP', 'MEZI', 'VYSTUP']
        },
        4: {
          nazev: '3D Meřák',
          id: '',
          pracoviste: ['3D MERENI', 'SESTAVY', 'ZAMECNICI']
        },
        5: {
          nazev: 'Brusírna',
          id: '',
          pracoviste: ['BRUS', 'BRUSH']
        },
        6: {
          nazev: 'Pila',
          id: '',
          pracoviste: ['']
        }
      },
      currentDataSource: null,
      testData: null,
    }
  },
  methods: {
    handleDataChange($event) {
      this.currentDataSource = $event
    },
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: 'PT Sans', sans-serif;
  background: radial-gradient(rgba(#1e4681, .7) 0%, rgba(#1e4681, 1) 100%);
}
* {
  box-sizing: border-box;
}
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.panel {
  flex: 1 1 50%;
  height: 50%;
  width: 100%;
  overflow-y: auto;
  border-radius: 10px;
  background-color: rgba(#FFF, .5);
  box-shadow: 15px 15px 35px rgba(#FFF, .2);
  padding: 1rem;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar { 
    display: none;  /* Safari and Chrome */
  }
  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    p {
      margin: 0;
    }
  }
}
.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    & > div {
        width: 78px;
        height: 78px;
        border-radius: 50%;
        border: 5px solid #1e4681;
        border-right-color: transparent;
        animation: load 2s infinite;
    }
}
.data-wrapper {
    width: 100%;
    border-collapse: collapse;
}
th, td {
    border-bottom: 1px solid #000;
    text-align: center;
    padding: 1em;
}
@keyframes load {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
