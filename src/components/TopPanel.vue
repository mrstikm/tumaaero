<template>
    <div class="top-panel panel">
        <div v-if="dataSource == null" class="error">
            <p>Zvolte pracoviště z horního menu!</p>
        </div>
        <div v-else-if="dataLoading" class="loading">
            <div></div>
        </div>
        <table v-else class="data-wrapper">
            <tbody>
                <tr>
                    <th>Os. číslo</th>
                    <th>Jméno</th>
                    <th>Datum zahájení</th>
                    <th>Zahájeno (ks)</th>
                    <th>Průvodka</th>
                    <th>Produkt</th>
                    <th>Název produktu</th>
                    <th>Operace</th>
                    <th>Odpracováno</th>
                </tr>
                <tr v-for="row,index in data" :key="index">
                    <td>{{row.OsCislo}}</td>
                    <td>{{row.Jmeno}}</td>
                    <td>{{row.Zahajeno}}</td>
                    <td>{{row.ZahMnozstvi}}</td>
                    <td>{{row.Plan}}</td>
                    <td>{{row.Produkt}}</td>
                    <td>{{row.Nazev}}</td>
                    <td>{{row.TextOperace}}</td>
                    <td class="percentage">
                        <div v-if="getPercentage(row.Zahajeno, row.Norma) <= 100" :style="{ background: 'linear-gradient(to right, green 0%, green ' + getPercentage(row.Zahajeno, row.Norma) + '%, transparent ' + getPercentage(row.Zahajeno, row.Norma) + '%)' }">
                            {{getPercentage(row.Zahajeno, row.Norma)}}%
                        </div>
                        <div v-else :style="{ background: 'linear-gradient(to right, #b81818 0%, #b81818 ' + getPercentage(row.Zahajeno, row.Norma) + '%, transparent ' + getPercentage(row.Zahajeno, row.Norma) + '%)' }">
                            {{getPercentage(row.Zahajeno, row.Norma)}}%
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
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
            direction: 'down',
            isScrollable: false
        }
    },
    watch: {
        dataSource: async function() {
            await this.getData()
            this.isScrollableFn()
        }
    },
    mounted() {
        setInterval( () => {
            if(this.dataSource) {
                this.getData()
            }
        }, 60000)
        if (this.isScrollable) {
            setInterval( () => {
                this.scrollTable()
            }, 100)
        }
    },
    methods: {
        async getData() {
            try {
                const response = await axios.post(
                    'http://192.168.100.3:8080/sendPost2/PXQ72SBErpZST9nbB98EZMRRhAFvpC',
                    {
                        'id': 'PXQ72SBErpZST9nbB98EZMRRhAFvpC',
                        'typ': 0,
                        'head': 'typUdalosti=10',
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
                return row.IdZarizeni == this.dataSource.id && row.ZahMnozstvi > 0
            })
            this.dataLoading = false
        },
        getPercentage(zahajeni, norma) {
            zahajeni = new Date(zahajeni)
            let aktual = new Date()

            zahajeni = Date.parse(zahajeni)/1000/60
            aktual = Date.parse(aktual)/1000/60
            return Math.round((100*(aktual - zahajeni)) / (norma))
        },
        isScrollableFn() {
            let table = document.querySelector('.top-panel')
            if (table.scrollTopMax > 0) this.isScrollable = true
        },
        scrollTable() {
            let table = document.querySelector('.top-panel')
            if (this.direction == 'down') {
                if (table.scrollTop < table.scrollTopMax) {
                    table.scrollBy({
                        top: 2,
                        left: 0,
                        behavior: 'smooth'
                    })
                } else {
                    this.direction = 'up'
                }
            } else {
                if (table.scrollTop > 0) {
                    table.scrollBy({
                        top: -2,
                        left: 0,
                        behavior: 'smooth'
                    })
                } else {
                    this.direction = 'down'
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>

</style>