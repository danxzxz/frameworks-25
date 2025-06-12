<?php
include "conexao.php";

class CriaClasses1 {
    private $con;

    function __construct() {
        $this->con = (new Conexao())->conectar();
    }

    function ClassesModel() {
        if (!file_exists("sistema")) {
            mkdir("sistema");
            if (!file_exists("sistema/model"))
                mkdir("sistema/model");
        }

        $sql = "SHOW TABLES";
        $query = $this->con->query($sql);
        $tabelas = $query->fetchAll(PDO::FETCH_ASSOC);

        foreach ($tabelas as $tabela) {
            $nomeTabela = array_values((array) $tabela)[0];
            $sql = "SHOW COLUMNS FROM " . $nomeTabela;
            $atributos = $this->con->query($sql)->fetchAll(PDO::FETCH_OBJ);

            $nomeAtributos = "";
            $getSet = "";

            foreach ($atributos as $atributo) {
                $campo = $atributo->Field;
                $camelCampo = ucfirst($campo);

                $nomeAtributos .= "    private \${$campo};\n";

                // Métodos Get
                $getSet .= "    public function get{$camelCampo}() {\n";
                $getSet .= "        return \$this->{$campo};\n";
                $getSet .= "    }\n\n";

                // Métodos Set
                $getSet .= "    public function set{$camelCampo}(\${$campo}) {\n";
                $getSet .= "        \$this->{$campo} = \${$campo};\n";
                $getSet .= "    }\n\n";
            }

            $nomeTabela = ucfirst($nomeTabela);

            $conteudo = <<<EOT
<?php
class {$nomeTabela} {
{$nomeAtributos}

{$getSet}}
?>
EOT;

            file_put_contents("sistema/model/{$nomeTabela}.php", $conteudo);
        }
    }
}

(new CriaClasses1())->ClassesModel();

