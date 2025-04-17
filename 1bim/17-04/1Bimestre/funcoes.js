var ctxCabecalho;
var ctxLinks;
var txtConteudo;
var ctxRodape;
var ancora=true;
function configEstiloCabecalho(){
 bg=document.getElementById("corFundo").value;
 corFonte=document.getElementById("corFonte").value;
 tamFonte=document.getElementById("tamFonte").value;
 ctxCabecalho="#cabecalho{\n background-color:"+bg+";\n";
 ctxCabecalho+=" color:"+corFonte+";\n";
 ctxCabecalho+=" font-size:"+tamFonte+"pt;\n}\n";
 return ctxCabecalho;
 }
function configEstiloLinks(){
    corLink=document.getElementById("corLinks").value;
    estiloLinks=document.querySelector('input[name="estiloLinks"]:checked').value;
    ctxLinks="a{\n color:"+corLink+";\n";
    let aux=estiloLinks=="0"?"none":"underline";
    ctxLinks+=" text-decoration:"+aux+";\n}\n";
    return ctxLinks;
}
function configHtmlLinks(){
    if(!ancora)return "";
    links=document.getElementsByName("links");
    href=document.getElementsByName("href");
    ctxLinks="";
    for(let i=0;i<links.length;i++) {
        vet=href[i].value.split("\\");
        ctxLinks +='<a href="'+vet[vet.length-1]+'">'+links[i].value+'</a>';
    }
    return ctxLinks;
}
function configHTMLCabecalho(){
    let aux=document.querySelector("#textoCabecalho").value;
    ctxCabecalho='<h1>'+aux+'</h1>';
    return ctxCabecalho;
}
function configHTMLConteudo(){
    txtConteudo="";
    txtConteudo=document.querySelector("#txtConteudo").value;
    return txtConteudo;
}
 function gerarCodigo(){
    //Cóigo para CSS
     let codeCSS=document.querySelector("#codeCSS");
     let css=configEstiloCabecalho();
     css+=configEstiloLinks();
     codeCSS.value=css;
    //Código para HTML
     let codeHTML=document.querySelector("#codeHTML");
     ctxHTML="";
     ctxHTML="<html>\n<meta-charset='utf-8'></meta-charset>\n<head>\n" +
         "<link rel='stylesheet' href='estilo.css'>\n"+
         "<title>Miha página</title>\n"+
         "</head>\n<body>" +
         "<div id='cabecalho'>"+configHTMLCabecalho()+"</div>\n" +
         "<nav id='links'>\n"+configHtmlLinks()+"\n</nav>\n" +
         "<div id='conteudo'>\n"+configHTMLConteudo()+"\n</div>\n" +
         "</body>\n</html>";
     codeHTML.value=ctxHTML;

 }
 function download(campo,arquivo) {
         if(arquivo.trim()==='')
             arquivo=document.getElementById("nomeHTML").value+".html";
         var text = document.getElementById(campo).value;
         var blob = new Blob([text], {type: "text/plain"});
         var a = document.createElement("a");
         a.href = URL.createObjectURL(blob);
         a.download = arquivo.trim();
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
 }
 function criarLinks() {
    pai=document.getElementById("areaLinks");
    link=document.createElement("input");
    link.setAttribute("type","text");
     link.setAttribute("name","links");
     link.setAttribute("id","links");
     link.setAttribute("placeholder","nome do link");
     href=document.createElement("input");
     href.setAttribute("type","file");
     href.setAttribute("name","href");
     href.setAttribute("id","file");
     bt=document.createElement("button");
     bt.setAttribute("onclick","criarLinks()");
     bt.innerText="+";
     espaco=document.createElement("br");
    pai.appendChild(link);
     pai.appendChild(href);
     pai.appendChild(bt);
     pai.appendChild(espaco);
 }
 function removeLinks(check){
    if(check.checked) {
        txt = "hidden";
        ancora=false;
    }
    else {
        txt = "visible";
        ancora=true;
    }
       document.querySelector("#areaLinks").style.visibility=txt;
 }


function renderIframe(){
    const iframe = document.getElementById('pagina');
    const htmlCode = document.getElementById('codeHTML').value;
    const cssCode = document.getElementById('codeCSS'). value;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');

    const style = document.createElement('style');
    style.textContent = cssCode;

    if(doc.head){
        doc.head.appendChild(style);
    }

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write('<!DOCTYPE html>\n' + doc.documentElement.outerHTML);
    iframeDoc.close();
 }

function mostraOcultaDiv(id){
    const divs = document.querySelectorAll('.content');
    divs.forEach(div => div.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function aviso(){
    alert ("para que o link funcione o arquivo de destino deve estar no diretorio do projeto");
    return true;
 }
