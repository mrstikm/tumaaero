<template>
    <div class="bottom-panel panel">
        <div v-if="dataSource == null" class="error">
            <p>Zvolte pracoviště z horního menu!</p>
        </div>
        <div v-else-if="dataLoading" class="loading">
            <div></div>
        </div>
        <div v-else class="table-wrapper">
            <nav>
                <ul>
                    <li v-for="pracoviste, index in dataSource.pracoviste" :class="{active : index == tabToShow}" :key="index">
                        {{pracoviste}}
                    </li>
                </ul>
            </nav>
            <table class="data-wrapper">
                <tbody>
                    <tr>
                        <th>Prac. místo</th>
                        <th>Produkt</th>
                        <th>Název</th>
                        <th>Operace</th>
                        <th>Průvodka</th>
                        <th>Množství</th>
                        <th>Zbývá (ks)</th>
                    </tr>
                    <tr v-for="row,index in customFilter" :key="index" >
                        <td>{{row.PracMisto}}</td>
                        <td>{{row.Produkt}}</td>
                        <td>{{row.Nazev}}</td>
                        <td>{{row.TextOperace}}</td>
                        <td>{{row.Plan}}</td>
                        <td>{{row.CelkemKs}}</td>
                        <td>{{row.ZbyvaKs}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: [
        'dataSource',
    ],
    data() {
        return {
            data: null,
            dataLoading: true,
            tabToShow: null,
            isScrollable: false,
            scrollTimer: null
        }
    },
    computed: {
        customFilter() {
            return (
                this.data.filter(row => {
                    return row.PracMisto == this.dataSource.pracoviste[this.tabToShow]
                })
            )
        }
    },
    watch: {
        dataSource: async function() {
            await this.getData()
            clearInterval(this.scrollTimer)
            this.tabToShow = 0
        },
        tabToShow: function() {
            clearInterval(this.scrollTimer)
            let table = document.querySelector('.bottom-panel')
            table.scrollTop = 0
            setTimeout( () => {
                this.scrollTimer = setInterval( () => {
                    this.scrollTable()
                }, 100)
            }, 200)
        }
    },
    mounted() {
        setInterval( () => {
            if(this.dataSource) {
                this.getData()
            }
        }, 600000)
    },
    methods: {
        async getData() {
            try {
                const response = await axios.post(
                    'http://192.168.100.3:8080/sendPost2/PXQ72SBErpZST9nbB98EZMRRhAFvpC',
                    {
                        'id': 'PXQ72SBErpZST9nbB98EZMRRhAFvpC',
                        'typ': 0,
                        'head': 'typUdalosti=20',
                        'items': []
                    },
                    {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'charset': 'utf-8', 
                    },
                )
                this.data = response.data.payload
            } catch(e) {
                return e 
            }

            this.data = this.data.filter(row => {
                return this.dataSource.pracoviste.includes(row.PracMisto)
            })
            this.dataLoading = false
        },
        scrollTable() {
            let table = document.querySelector('.bottom-panel')
            if (table.scrollTop < table.scrollTopMax) {
                table.scrollBy({
                    top: 2,
                    left: 0,
                    behavior: 'smooth'
                })
            } else {
                clearInterval(this.scrollTimer)
                setTimeout(() => {
                    this.nextTab()
                }, 5000)
            }
        },
        nextTab() {
            let maxIndex = this.dataSource.pracoviste.length-1
            if (this.tabToShow < maxIndex) {
                this.tabToShow += 1
            } else {
                this.tabToShow = 0
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.table-wrapper {
    position: relative;
}
nav {
    ul {
        list-style: none;
        display: flex;
        justify-content: center;
        padding: 0;
        gap: 1em;
        margin-top: 0;
        li.active {
            font-weight: bold;
            transform: scale(1.15);
        }
    }
}
</style>