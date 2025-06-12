<?php
include "conexao.php";

class CriaClasses1 {
    private $tbBanco = "Tables_in_enderecos";
    private $con;

    function __construct() {
        $this->con = (new Conexao())->conectar();
    }

    function ClassesModel() {
        $sql = "SHOW TABLES";
        $query = $this->con->query($sql);
        $tabelas = $query->fetchAll(PDO::FETCH_OBJ);

        foreach ($tabelas as $tabela) {
            $nomeTabela = ucfirst($tabela->{$this->tbBanco});
            $conteudo = <<<EOT
class {$nomeTabela} {
}
EOT;

            echo "conteudo:<br><pre>$conteudo</pre><br><br>";
        }
    }
}

(new CriaClasses1())->ClassesModel();
