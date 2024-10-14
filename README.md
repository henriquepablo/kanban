## Getting Started

Primeiro faça o clone do projeto, abra o terminal na pasta do clone e execute npm i

Para iniciar em modo de desenvolvimento, execute npm run dev

Para fazer o build, execute npm run build ou yarn build (caso tenha yarn instalado na sua máquina)

Executando em modo de producão, execute: npm start.

Nos arquivos existe um dockerfile, ele é necessário para o deploy nos clientes.

Primeiro verifique se o docker esta instalado na máquina (docker -v), caso não esteja, instale (aqui já depende de sistema está usando, então terá que pesquisar).

Depois do docker estiver instalado e dos arquivos já estiver na máquina do cliente (mova os arquivos do respositório para /opt/kanban), faça os seguites passos:

docker build -t kaban . #esse comando gera uma imagem docker

depois execute o script presente nos arquivos (./docker-start.sh)

verifique se a apliacão iniciou. docker ps (lista os containers ativos), se estiver vázio, a aplicação não iniciou, caso contrario. Vá até o navegador e digite: http://<IP_DA_SUA_MAQUINA>/kanban
