## Tarefas

###### 1 - Substituir os inputs de texto por uma lista de desenvolvedores com nome, foto, preço e um botão de "Adicionar ao carrinho".
Escolhi essa tarefa como primeira porque uma loja na qual o cliente não vê os produtos disponíveis não é uma loja.

###### 2 - Popular a lista de desenvolvedores a partir de uma organização do GitHub.
Esse requisito elimina a necessidade de se inserir os produtos manualmente, o que traz uma gama de possibilidades para o desenvolvedor e para o cliente.

###### 3 - Determinar o preço do desenvolvedor a partir de informações do seu perfil do GitHub, como por exemplo: followers, repos, stars, commits, etc.
Seria considerável que o desenvolvedor se avaliasse e informasse o valor da sua hora de trabalho, mas essa feature torna a ideia muito mais interessante pois, num cenário real, incentivaria o usuário a conseguir mais followers e repos a fim de valorizar-se.

###### 4 - Permitir a escolha de quantidade de horas contratadas de cada desenvolvedor.
É importante para o contratado e para o contratante que a ferramenta dê a possibilidade de escolher pelo menos o mínimo de horas que serão contratadas.

###### 5 - Melhorar a visualização do desenvolvedor no carrinho mostrando mais informações.
Interessante para que o cliente veja detalhes do 'produto' antes de fechar o pedido.

###### 6 - Adicionar um botão de "comprar" que leva o usuário a uma página de pedido confirmado.
Para que se complete o fluxo do produto no processo de compra (vitrine > carrinho > pagamento), é importante ter uma página para realizar a conclusão do pedido.

###### 7 - Criar paginação para a lista de desenvolvedores.
Durante o processo de escolha das tarefas pensei em retirar outra para incluir essa, porém com a atual organização dos desenvolvedores no resultado da busca, decidi que não era tão importante.

###### 8 - Permitir a adição de um cupom de desconto que altera o preço total da compra. Utilize o código "SHIPIT".
Requisito interessante mas, nesse caso, dispensável visto que existem outros mais importantes.

## Server side

A linguagem escolhida para o back end foi o PHP porque é a que eu mais tenho afinidade e já uso há um bom tempo, o que possibilitou a entrega do aplicativo num prazo razoável. As outras linguagens propostas talvez permitissem uma performance maior, como é o caso do Node, que tornaria muito mais rápida a comunicação cliente-servidor por diversos fatores (ambos os lados entenderiam JSON sem problemas, chamadas ao serviços seriam muito mais leves, linguagem mais moderna, etc). Porém, por mais que eu conheça JavaScript, ainda necessitaria de um tempo para conhecer a nova tecnologia.

## Client side

Todo o lado do cliente foi construído com HTML/CSS e jQuery. Por mais rápido que o React pudesse ser em cima do simples jQuery, eu ainda assim necessitaria de um pouco de tempo para aprender a usar a biblioteca, o que alongaria o prazo. 
