Se vocÊ tem 
const mail = ""

e criar um objeto 

{mail: mail}

Um recurso do novo JS é já entendr isso quando não tiver chave

Assim você pode fazer

{mail}

que vai considerar ocmo {mil: mail}

## SObrescrever objeto

Onde

validTransaction = {}
newData = {}

O new data, pode modificar os dados de validTransatins dentro do parametro
function aFunction({... validTransaction, ...newData})

Dessa forma posso sobrescrever atributos de um objeto em somente uma única linha

O spread espalha os atributos internos EM ORDEM, como newData está de pois, se tiver as mesmas chaves
Entâo vai sobrescrever o de 'validaTransaction'