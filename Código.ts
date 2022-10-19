import { nodeModuleNameResolver } from "typescript";

class Pacote{
    nome: string;
    descricao: string;
    data: Date;
    status: boolean;
    id: number;

    constructor(_nome: string, _descricao: string, _data: Date, _status: boolean, _id: number){
        this.nome = _nome;
        this.descricao = _descricao;
        this.data = _data
        this.status = _status
        this.id = _id
    }
}

let pacotes:Array<Pacote> = []

// Pegar Dados
fetch("https://62361b7feb166c26eb2f488a.mockapi.io/pacotes", {
    method: "GET",
    headers:{"Content-Type":"application/json"}
})
.then(response => response.json())
.then(result =>{
    console.log(result);
    for (let i = 0; i < result.length; i++) {
        pacotes[i] = new Pacote(result[i].nome, result[i].descricao, result[i].data, result[i].status, result[i].id)
    }
    console.log(pacotes);
    listar();
})

//Gerar divs
let cartao:any = document.getElementById('Card')

//Excluir Cards >:)
const Excluir = (index:any) =>{
    let remover = pacotes.splice(index,1);
    listar();
}

//Editar Cards B)
const Editar = (nome:string, descricao:string, data:Date, status:boolean, id:number) =>{
    input1.value = nome
    input3.value = descricao
    input2.value = data
}


const listar = () =>{
    let Texto:string = '';

    for (let index = 0; index < pacotes.length; index++) {
        
    Texto += '<section class="Secao">';
    Texto += `<h3>${pacotes[index].nome}</h3>`;
    Texto += `<p>${pacotes[index].descricao}</p>`;

    Texto += `<p>${pacotes[index].data}</p>`;

    Texto += `<button type="button" id="edit" onclick='Editar("${pacotes[index].nome}","${pacotes[index].descricao}","${pacotes[index].data}","${pacotes[index].status}","${pacotes[index].id}")'>Editar</button>`;
    Texto += `<button type="button" id="delete" onclick="Excluir(${index})">Excluir</button>`;
    Texto += '</section>';
    
    
    }
    
    cartao.innerHTML = Texto;
}

// Fazer Cadastro

//Nome
let input1:any = document.getElementById("NDP") as HTMLInputElement
//Data
let input2:any = document.getElementById("Data") as HTMLInputElement
//Descrição
let input3:any = document.getElementById("Dezcricao") as HTMLInputElement

//Ativo e Inativo
let input4:any = document.getElementById("Ativo") as HTMLInputElement
let input4_2:any = document.getElementById("Inativo") as HTMLInputElement

const cadastrar = () =>{
    console.log("cadastrar");
    
    let V:boolean = false;

    if (input4.checked) {
        V = true
    }
    else if(input4_2.checked){
        V = false
    }
    
    let novoPacote = new Pacote(input1.value,input3.value,input2.value,V,pacotes.length+1);
    
    pacotes.push(novoPacote);
    
    listar();
}

