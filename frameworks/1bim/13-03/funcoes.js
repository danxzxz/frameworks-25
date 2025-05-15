function elementos(e) {
    let div = document.getElementsByTagName("div")[0];
    let div1 = document.getElementById("div1");
    console.log(div.nextSibling);
    console.log(div.parentElement);
}

function criaTabela() {
    let pai = document.getElementsByTagName("body")[0];
    let tabela = document.createElement("table");
    tabela.setAttribute("border", 5);

    for (let i = 0; i < 10; i++) {
        let linha = document.createElement("tr");

        for (let j = 0; j < 10; j++) {
            let coluna = document.createElement("td");
            coluna.innerText="mcw"
            linha.appendChild(coluna);
        }
        tabela.appendChild(linha);
    }
    pai.appendChild(tabela);
}
