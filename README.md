// instalar_multi.sh
#!/bin/bash

# Função para cores no terminal
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Recebe argumentos ou usa padrão
CLIENT_NAME=${1:-cliente01}
FRONT_DOMAIN=${2:-app.localhost.com}
BACK_DOMAIN=${3:-api.localhost.com}
FRONT_PORT=${4:-3000}
BACK_PORT=${5:-4000}

# Cria diretório do cliente
mkdir -p clientes/$CLIENT_NAME && cd clientes/$CLIENT_NAME

echo -e "${GREEN}🚀 Instalando Whaticket para o cliente: $CLIENT_NAME${NC}"
echo -e "Frontend: $FRONT_DOMAIN (porta $FRONT_PORT)"
echo -e "Backend : $BACK_DOMAIN (porta $BACK_PORT)"

# Clona repositório consolidado
git clone https://github.com/marquinhotp/whaticket-consolidado.git .

# Substitui variáveis nos .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

sed -i "s/localhost:4000/$BACK_DOMAIN:$BACK_PORT/g" frontend/.env
sed -i "s/localhost/$BACK_DOMAIN/g" backend/.env

# Atualiza docker-compose.yml dinamicamente (opcional)
sed -i "s/\"3000:3000\"/\"$FRONT_PORT:$FRONT_PORT\"/g" docker-compose.yml
sed -i "s/\"4000:4000\"/\"$BACK_PORT:$BACK_PORT\"/g" docker-compose.yml

# Conclui setup
echo -e "${GREEN}✅ Instalação configurada!${NC}"
echo -e "📂 Diretório: clientes/$CLIENT_NAME"
echo -e "🟢 Agora rode: cd clientes/$CLIENT_NAME && docker-compose up -d"


# README.md
cat <<EOF > README.md
# Whaticket Consolidado (Multiempresa)

Este projeto é uma implementação dockerizada do Whaticket com suporte a múltiplos clientes, incluindo backend em Node.js + Typescript, frontend em React, PostgreSQL, Redis e integração com Assistants da OpenAI.

## 🚀 Instalação via Script

Execute o script abaixo para instalar uma nova instância para um cliente:

```bash
chmod +x instalar_multi.sh
./instalar_multi.sh nome_do_cliente dominio_front dominio_back porta_front porta_back
```

### Exemplo:
```bash
./instalar_multi.sh wacedup app.wacedup.com.br api.wacedup.com.br 3754 3753
```

## ⚙️ Variáveis de ambiente
Configure os arquivos `.env` com base nos arquivos `.env.example` disponíveis em `backend/` e `frontend/`.

## 📦 Rodando o projeto
```bash
cd clientes/nome_do_cliente
npm install
npm run build
```
Ou via Docker:
```bash
docker-compose up -d --build
```

## 📚 Estrutura do Projeto
- `backend/`: API em Node.js
- `frontend/`: Interface em React
- `docker-compose.yml`: Orquestração dos serviços
- `instalar_multi.sh`: Script de instalação

## 🤖 Integração com Assistants (OpenAI)
Configure sua `OPENAI_API_KEY` no `.env` do backend para permitir o uso dos modelos da OpenAI nas respostas automáticas.

---

Desenvolvido por CEDUP Três Pontas · @marquinhotp
EOF