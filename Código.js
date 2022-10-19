"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pacote {
    constructor(_nome, _descricao, _data, _status, _id) {
        this.nome = _nome;
        this.descricao = _descricao;
        this.data = _data;
        this.status = _status;
        this.id = _id;
    }
}
let pacotes = [];
// Pegar Dados
fetch("https://62361b7feb166c26eb2f488a.mockapi.io/pacotes", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
})
    .then(response => response.json())
    .then(result => {
    console.log(result);
    for (let i = 0; i < result.length; i++) {
        pacotes[i] = new Pacote(result[i].nome, result[i].descricao, result[i].data, result[i].status, result[i].id);
    }
    console.log(pacotes);
    listar();
});
//Gerar divs
let cartao = document.getElementById('Card');
//Excluir Cards >:)
const Excluir = (index) => {
    let remover = pacotes.splice(index, 1);
    listar();
};
//Editar Cards B)
const Editar = (nome, descricao, data, status, id) => {
    input1.value = nome;
    input3.value = descricao;
    input2.value = data;
};
const listar = () => {
    let Texto = '';
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
};
// Fazer Cadastro
//Nome
let input1 = document.getElementById("NDP");
//Data
let input2 = document.getElementById("Data");
//Descrição
let input3 = document.getElementById("Dezcricao");
//Ativo e Inativo
let input4 = document.getElementById("Ativo");
let input4_2 = document.getElementById("Inativo");
const cadastrar = () => {
    console.log("cadastrar");
    let V = false;
    if (input4.checked) {
        V = true;
    }
    else if (input4_2.checked) {
        V = false;
    }
    let novoPacote = new Pacote(input1.value, input3.value, input2.value, V, pacotes.length + 1);
    pacotes.push(novoPacote);
    listar();
};
