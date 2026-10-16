# Sabor Caseiro — Fase 1: base comercial

## O que esta fase prepara

O `backend/prisma/schema.prisma` foi ampliado para suportar a futura operação comercial:

- **Restaurantes e administradores**: estrutura preparada para separar estabelecimentos; os administradores antigos continuam compatíveis porque `restaurantId` é opcional durante a transição.
- **Categorias e produtos**: catálogo dinâmico, imagens, preço em cêntimos, destaque, disponibilidade, alergénios e etiquetas alimentares.
- **Monte o seu prato**: grupos reutilizáveis de opções (base, proteína, acompanhamentos, molhos e extras), com seleção mínima/máxima e acréscimos de preço.
- **Encomendas**: cliente, levantamento/entrega/refeição no local, método e estado do pagamento, estados operacionais e totais.
- **Histórico fiável**: os itens da encomenda guardam o nome/preço no momento da compra para que alterações posteriores no menu não mudem recibos antigos.
- **Venda adicional**: relações entre produtos para recomendar bebidas, sobremesas, acompanhamentos ou extras antes do checkout.

## Ideias de experiência a implementar nas fases seguintes

1. **“Surpreende-me”**: selecionar aleatoriamente um prato elegível ou construir uma combinação aleatória respeitando disponibilidade, alergénios declarados, limites de escolha e orçamento escolhido pelo cliente. Mostrar a composição e o preço antes de adicionar ao carrinho; nunca concluir uma compra sem consentimento.
2. **Complemento antes de pagar**: sugerir no máximo uma ou duas opções relevantes (ex.: bebida ou sobremesa), com preço visível, opção clara de adicionar e botão igualmente claro para continuar sem extras. Medir aceitação sem tornar a experiência enganadora.
3. **Alertas de novos pedidos/reservas**: painel em tempo real, sinal sonoro curto e controlo para silenciar. A reprodução deve começar apenas após interação do utilizador, pois navegadores bloqueiam áudio automático em muitos casos.
4. **Som**: escolher um efeito curto com licença comercial explícita (por exemplo, biblioteca com licença verificável como Pixabay ou Mixkit), guardar o ficheiro de licença/URL e a data de consulta no projeto. “Gratuito” não significa automaticamente “sem direitos autorais”; confirmar os termos do ficheiro específico antes de usar.

## Regras técnicas obrigatórias antes de aceitar encomendas reais

- O servidor recalcula todos os preços; nunca confiar no total enviado pelo navegador.
- Validar disponibilidade, opções permitidas, limites de seleção e pertença dos produtos ao restaurante.
- Criar a encomenda e respetivos itens numa transação da base de dados.
- Guardar os totais em cêntimos inteiros para evitar erros de arredondamento.
- Impedir alterações de preço/menu de modificar encomendas já registadas.
- Proteger rotas administrativas e limitar acesso aos dados de cada restaurante.
- Não recolher dados de pagamento de cartões diretamente; usar um prestador de pagamentos quando a opção online for implementada.

## Estado desta entrega

Esta fase altera o **modelo de dados**. Ainda não implementa os endpoints de produtos/encomendas, migração executada na base de dados, interfaces de administração, checkout ou som de notificações. Esses passos devem ser feitos e testados depois de confirmar o modelo.

## Como aplicar localmente

1. Fazer cópia de segurança da base de dados atual.
2. Rever `backend/prisma/schema.prisma` e configurar `DATABASE_URL` no `.env` local (não partilhar o ficheiro `.env`).
3. No diretório `backend`, executar `npm ci` e `npm run prisma:generate`.
4. Em desenvolvimento, criar a migração com `npx prisma migrate dev --name commercial_core`.
5. Rever a migração gerada antes de aplicar em qualquer ambiente com dados reais.

Não executar migrações de produção sem backup e revisão.
