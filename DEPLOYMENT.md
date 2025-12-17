# Instrucoes de Deployment - Lugane_Atendimento

## Preparacao local

1. Clone o repositorio:
```bash
git clone https://github.com/Lugane/Lugane_Atendimento.git
cd Lugane_Atendimento
```

2. Instale as dependencias:
```bash
npm install
```

3. Configure as variaveis de ambiente:
```bash
cp .env.example .env
# Edite o .env com suas credenciais reais
```

## Deploy no Render

1. Acesse https://render.com e crie uma conta
2. Clique em "New" > "Web Service"
3. Conecte seu repositorio GitHub
4. Configure:
   - **Name**: Lugane_Atendimento
   - **Start Command**: `node app.js`
   - **Environment**: Node
5. Adicione as variaveis de ambiente no painel do Render:
   - `DB_USER` = seu usuario do banco
   - `DB_PASS` = sua senha do banco
   - `DB_NAME` = nome do banco de dados
   - `PORT` sera automaticamente definido pelo Render

## Comando para remover node_modules do Git

Se ainda houver node_modules versionado:
```bash
git rm -r --cached node_modules
git commit -m "Remove node_modules from git tracking"
git push
```

## Info

- O app.js ja escuta em `process.env.PORT` ou 3000 por padrao
- O .gitignore ja esta configurado para ignorar node_modules e .env
- Use o .env.example como template para suas variaveis de ambiente
