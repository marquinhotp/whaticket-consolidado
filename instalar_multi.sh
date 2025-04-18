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
sed -i "s/"3000:3000"/"$FRONT_PORT:$FRONT_PORT"/g" docker-compose.yml
sed -i "s/"4000:4000"/"$BACK_PORT:$BACK_PORT"/g" docker-compose.yml

# Conclui setup
echo -e "${GREEN}✅ Instalação configurada!${NC}"
echo -e "📂 Diretório: clientes/$CLIENT_NAME"
echo -e "🟢 Agora rode: cd clientes/$CLIENT_NAME && docker-compose up -d"