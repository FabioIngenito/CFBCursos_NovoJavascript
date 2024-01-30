   Estou fazendo o novo curso completo de Javascript e quase terminando (aula 255), mas tive um problema com o NODE-RED nas últimas aulas.

   O código Javascript está correto, me parece que o endpoint NÃO retorna o "msg" para o fetch (res).... dessa forma eu NÃO recebo o ID de n_pessoa_pessoa.

   O estranho é que o debug do node-red mostra o retorno correto, mas o javascript não recebe!?!

   No arquivo INDEX.JS “erro” (Fetch failed loading: GET) ocorre exatamente nesta linha: “fetch(EndpointLogin)” dentro do arquivo "index.js".


   TELA DO NODE-RED:

 ![image](https://github.com/FabioIngenito/CFBCursos_NovoJavascript/assets/24603753/50ade6cf-6b29-4476-9542-ce05455f0aeb)


   TELA DO BROWSER:

 ![image](https://github.com/FabioIngenito/CFBCursos_NovoJavascript/assets/24603753/d2596be8-7b87-4d85-95cd-c36b789d1dfb)

========================================

   Coloquei todo meu código aqui (inclusive as exportações do node-red).

   Eu avancei um pouco  o curso mesmo com erro e fiquei observando se tinha alguma diferença, mas não encontrei.

   Vou continuar tentando descobrir o problema, experimentei apontar a saída direto para um "http response", mas o resultado foi o mesmo.

Obrigado,

Fabio Ingenito.
