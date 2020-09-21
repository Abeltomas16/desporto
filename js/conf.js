
const frm=document.querySelector('.search')
const a=/^(\w[a-zA-Z]{1,})\s*(\w[a-zA-Z]*)$/i
const foto=document.querySelector('.foto')
const api=document.querySelector('.bd')

var pesquisa=async(nome)=>{
       
     const urll=await fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${nome}`)
     const dados=await urll.json()

     // para apagar os p criados em uma requisição antiga
     if(api.children){
     Array.from(api.children).forEach(e=>{
        e.remove()
    })}

    if(dados.player){
        return dados.player[0]
    }else{
            foto.classList.add('d-none')
            foto.parentElement.classList.remove('d-none')
            foto.previousElementSibling.textContent='sem resultado'    
            foto.setAttribute('src','img/user_.png')      
}
}

frm.addEventListener('submit',e=>{
    e.preventDefault()

    if(a.test(frm.search.value)){
        frm.search.classList.remove('error')
        let novo_nome=new String()
        novo_nome=frm.search.value
        novo_nome.replace(' ','%20')
        pesquisa(novo_nome)
        .then(z=> {
            interface(z),             
            foto.parentElement.classList.remove('d-none')
            frm.reset()
        })
        .catch(erro=> erro)
    }else{
        frm.search.classList.add('error')
    }         
})

    var interface=(obj=>{

        var p=document.createElement('p') 
        p.setAttribute('class','card-text display-5 lead font-weight-normal')
        api.appendChild(p)

        foto.setAttribute('class','card-img-top mx-auto foto')
        const bole= obj.strCutout ? obj.strCutout: 'img/user_.png'
        foto.setAttribute('src',bole)  
            
        var camisa=obj.strNumber ?`(${obj.strNumber})` :''
        foto.previousElementSibling.textContent= `${obj.strPlayer} ${camisa}`
        foto.nextElementSibling.firstElementChild.textContent=obj.strTeam 

            const vet=[
                obj.dateBorn, obj.strBirthLocation,  
                obj.strNationality,  
                obj.strWeight+obj.strHeight 
                     ]      

                vet.filter(valores=>{
                    return valores!=null 
                }).map(valor =>{
                    var p=document.createElement('p')
                    p.setAttribute('class','card-text display-5 lead')
                    p.textContent=valor
                     foto.nextElementSibling.appendChild(p)

                })       
    })
