class configuracao{
    constructor(){
        this.key='e0FsffHOSSB44tC0gT9p6rUAc1vEDdGc'
        this.weatherURL='http://dataservice.accuweather.com/currentconditions/v1/'
        this.cityURL='http://dataservice.accuweather.com/locations/v1/cities/search'
    }
    async getCity(cidade){
        const query=`?apikey=${this.key}&q=${cidade}` 
        const promisse=await fetch(this.cityURL+query)
        if(promisse.status !=200)
            throw new Error('Erro desconhecido')
        const dados=await promisse.json()
        return dados[0]
    }
    async getWeather(key_city){
        const query=`${key_city}?apikey=${this.key}`
        const response=await fetch(this.weatherURL+query)
        if(response.status !=200)
            throw new Error('Erro desconhecido')
        const dados=await response.json()
        return dados
    }
    //é asynchronus porque ela busca dados de uma função assyncrona
    async actualiza(cityy){
        
        const cidade=await this.getCity(cityy)       
        const temp=await this.getWeather(cidade.Key)
        return{
            cidade:cidade,
            tempo:temp[0]
        }
    }
    /*quando os nomes são iguais podes retornar apenas  { city, temp} para evitar isso, var cidade=city, var tempo=tempo*/
}

