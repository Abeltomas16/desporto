const form=document.querySelector('form')
const div_detalhes=document.querySelector('.details')
const conf=new configuracao()


form.addEventListener('submit',e=>{
    e.preventDefault()

    const valor=form.city.value.trim()
    form.reset()
    localStorage.setItem('cidade',valor)

    conf.actualiza(valor)
    .then(dados=> interface(dados))
    .catch(erro=>console.log(erro.message))
    })

const interface=(objs)=>{
  /*  const tempo=objs.tempo
    const cidade=objs.cidade*/

     //de modo a nao gastar memória, o js nos oferece o destructuring
     // que, quando usamos nomes iguais das propiedades do objecto(obj), podemos
     // usar o destruturing
     // ex    const {tempo, cidade} =objs

     const {tempo, cidade} =objs
    div_detalhes.innerHTML=`<h5 class="my-3">${cidade.EnglishName}</h5>
                <div class="my-3">${tempo.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${tempo.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>`

    if( div_detalhes.parentElement.classList.contains('d-none'))
         div_detalhes.parentElement.classList.remove('d-none')
    
    const src=tempo.IsDayTime ? 'img/day.svg' :'img/night.svg'
    div_detalhes.parentElement.firstElementChild.setAttribute('src',src)
    
         const img= `img/icons/${tempo.WeatherIcon}.SVG`
         div_detalhes.parentElement.firstElementChild.nextElementSibling.firstElementChild.setAttribute('src',img)
}
        if(localStorage.getItem('cidade'))
        {
            conf.actualiza(localStorage.getItem('cidade'))
            .then(dados=> interface(dados))
            .catch(erro=>console.log(erro.message))
            }
        