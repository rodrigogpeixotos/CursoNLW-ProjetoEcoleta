function populateUFs()
{
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for( const state of states)
        {
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }
    })

}

populateUFs()

function getCities(event)
{
    /*const citySelect = document.querySelector("select[name=city]")*/
    const citySelect = document.querySelector("[name=city]") /*funciona assim tbém*/
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
    citySelect.disabled = true
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities)
        {
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

 document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de Coleta
//Pegar todos os li's
const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect)
{
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = [] //vai colocar ou adicionar os itens

function handleSelectedItem(event)
{
    const itemLi = event.target
    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected") //faz a função de add or del
    const itemId = itemLi.dataset.id

    //console.log('ITEM ID: ', itemId)
    
    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item =>
    {
        //=== ou == é igual (mas tem diferença entre eles)
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })
    
    //se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0)
    {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item =>
        {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent 
        })
        selectedItems = filteredItems
    }
    else
    {   //se não estiver selecionado, adicionar à seleção
        //adicionar à seleção
        selectedItems.push(itemId)
    }

    //console.log('selectedItems: ', selectedItems)

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}