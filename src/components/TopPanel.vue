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
            this.dataLoading = true
            this.data = await this.getData()
            this.dataLoading = false
            // this.isScrollableFn()
        }
    },
    mounted() {
        setInterval( async () => {
            if(this.dataSource) {
                this.data = await this.getData()
            }
        }, 60000)
    },
    methods: {
        async getData() {
            return new Promise( async (resolve, reject) => {
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
                    console.log(response.data.payload);
                    resolve(response.data.payload.filter(row => {
                        return this.dataSource.id.includes(row.IdZarizeni) && row.ZahMnozstvi > 0
                    }))
                } catch(e) {
                    reject(e) 
                }
            })
        },
        getPercentage(zahajeni, norma) {
            zahajeni = new Date(zahajeni)
            let aktual = new Date()

            zahajeni = Date.parse(zahajeni)/1000/60
            aktual = Date.parse(aktual)/1000/60
            return Math.round((100*(aktual - zahajeni)) / (norma))
        },
    },
}
</script>

<style lang="scss" scoped>

</style>