<?php

$diretorio = "php";
$arquivo = $diretorio.'/arquivo.php';

if (!file_exists($diretorio)) {

   if (!mkdir($diretorio, 0777, true)) {
    echo "Erro: Diretório não pode ser criado! ";
   } 
   else {
    echo "Diretório ". $diretorio. " criado";
   }
}
else {
    echo "O diretório " . $diretorio . " já existe\n";
}

$conteudo = <<<PHP
    <?php

    class Teste{
        function __construct()
            echo "Olá mundo "
        }
    }
    new Teste(); 
    ?>
PHP;

if(file_put_contents($arquivo, $conteudo) === false){
    echo "ERRO: Não foi possível criar o arquivo ";
}
else {
    echo "O arquivo ". $arquivo. " foi criado";
}