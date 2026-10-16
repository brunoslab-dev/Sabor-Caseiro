# Sabor Caseiro — diagnóstico e refatoração controlada

## Objetivo e limites

Este relatório regista a inspeção inicial e as alterações conservadoras realizadas. A prioridade é preservar o comportamento funcional, o aspeto visual intencional e a arquitetura existente. Não foi feita uma reescrita do frontend nem uma migração de framework.

## Alterações aplicadas

1. **`backend/src/app.ts`** — organizados os imports no início do módulo, formatado o registo de plugins e rotas, e melhorada a legibilidade do handler de erros e do hook de encerramento. A ordem de registo e os métodos CORS foram preservados.
2. **`backend/.env.example`** — adicionadas as variáveis requeridas para iniciar a aplicação (`JWT_SECRET`) e as variáveis necessárias ao script de seed (`ADMIN_EMAIL` e `ADMIN_PASSWORD`). Os valores são exemplos, não credenciais de produção.
3. **`README.md`** — corrigido o caminho da folha de estilos (`css/styles.css`), atualizada a árvore do projeto para refletir as páginas e ficheiros existentes e substituídas instruções de arquitetura/desenvolvimento que já não descreviam o estado full-stack.
4. **Empacotamento** — a versão distribuível exclui `node_modules`, `.env`, metadados `__MACOSX` e cópias de backup datadas. Esses itens não são necessários para instalar e executar o código-fonte e não devem substituir o histórico guardado no arquivo original.

## Diagnóstico por área

### Frontend

- A página pública já utiliza tokens CSS em `:root` e uma classe-base `.btn`, com variantes como `.btn-primary`, `.btn-ghost` e `.btn-filter`.
- Bootstrap 5.3.3 e estilos próprios coexistem. A ordem de carregamento e a especificidade precisam de ser preservadas; uma migração global de nomes poderia alterar a aparência.
- Existem seletores repetidos em `css/styles.css` e `css/admin.css`. Vários surgem em secções ou media queries diferentes, pelo que não são prova de duplicação inútil. A remoção deve ser feita apenas após comparar declarações e condições responsivas.
- A página pública, a página de detalhes e as páginas administrativas usam folhas de estilo e scripts separados. Não foram encontrados atributos de eventos inline nas páginas HTML inspecionadas.
- O frontend contém URLs de API fixos para `http://localhost:3333`. Isto funciona como configuração local, mas requer configuração explícita para implantação noutro ambiente. Não foi alterado nesta refatoração para evitar mudar o comportamento de execução.

### Backend

- O projeto usa Node.js, TypeScript, Fastify, Prisma e PostgreSQL.
- A compilação TypeScript foi executada com sucesso (`npm run build`) usando o conjunto de dependências presente no arquivo.
- A execução dos testes Vitest não chegou a iniciar: a pasta `node_modules` fornecida está sem um binding nativo opcional requerido por Rolldown/Vitest. Isto é uma limitação do pacote de dependências incluído, não um resultado de testes falhados. Reinstalar dependências com `npm ci` num ambiente compatível é o próximo passo para validar os testes.
- O schema de ambiente exige `JWT_SECRET`, mas o `.env.example` original não o documentava. A omissão foi corrigida.
- A API inclui rotas e testes para autenticação, reservas, menu, encomendas e saúde. É necessário executar os testes com PostgreSQL disponível para validar o comportamento de ponta a ponta.

### Ficheiros de backup

O arquivo contém várias cópias históricas de `styles.css` e uma de `index.html`. Foram excluídas apenas do pacote de distribuição limpo; o arquivo original enviado não foi alterado. Nenhuma regra de CSS ou função JavaScript foi removida por inferência baseada apenas no nome ou na ausência de referências textuais.

## Verificações realizadas

- Compilação TypeScript: **passou**.
- Testes Vitest: **não executados**, devido ao binding nativo ausente no `node_modules` fornecido.
- Referências locais em `index.html`, `admin.html`, `login.html` e `dish.html`: inspeção estática realizada; o link relativo `index.html#menu` em `dish.html` é válido.
- Testes visuais em browser, dispositivos móveis e testes de integração com PostgreSQL: **pendentes** neste ambiente.

## Próximos passos recomendados

1. Instalar dependências limpas com `npm ci` e executar `npm run build` e `npm test`.
2. Executar a API com uma base PostgreSQL de desenvolvimento e validar os fluxos de autenticação, reservas, menu e encomendas.
3. Fazer comparação visual antes/depois em desktop, tablet e telemóvel.
4. Só depois da validação, avaliar a consolidação de seletores CSS e a extração de tokens/variantes adicionais.
5. Configurar a URL base da API através de configuração de ambiente para implantações, mantendo o valor local atual como padrão de desenvolvimento.

## Critério de remoção de código

Um bloco só deve ser removido quando referências estáticas e dinâmicas, eventos, geração de DOM, seletores e integrações externas tiverem sido verificados. Código com utilização incerta fica identificado para análise, não apagado.
