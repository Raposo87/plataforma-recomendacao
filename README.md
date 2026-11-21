# Recomendadores

Protótipo de uma plataforma de recomendações para negócios locais. As pessoas recomendam negócios que já conhecem, partilham um link e podem receber uma comissão quando uma compra lhes é atribuída.

> **Estado do projeto:** protótipo front-end (Fase 1), com dados fictícios. Não há servidor, API, autenticação real nem processamento de pagamentos.

## Começar

As páginas usam JavaScript ES Modules. Por isso, sirva a pasta `public/` por HTTP em vez de abrir os ficheiros HTML diretamente com `file://`.

### Com Python

Na raiz do projeto, execute:

```powershell
python -m http.server 8000 --directory public
```

Depois, abra [http://localhost:8000](http://localhost:8000). Para parar o servidor, prima `Ctrl+C` no terminal.

Também pode abrir `public/index.html` com a extensão **Live Server** do Visual Studio Code.

Não é necessário instalar dependências: o projeto não tem `package.json`, processo de build ou ferramentas de compilação configuradas.

## Páginas e percursos

| Página | Caminho | O que demonstra |
| --- | --- | --- |
| Início | `public/index.html` | Apresentação da plataforma, passos, negócios disponíveis e chamadas à ação. Inclui menu hamburger em ecrãs móveis. |
| Registo | `public/register.html` | Formulário de demonstração para escolher perfil de recomendador ou negócio. |
| Login | `public/login.html` | Formulário de demonstração que encaminha para o painel. |
| Painel | `public/dashboard.html` | Vistas de recomendador, negócio e ledger de comissões. |
| Perfil público | `public/profile.html` | Página de recomendações de uma pessoa. |
| Negócio | `public/business.html` | Página de negócio, testemunhos e formulário de compra demonstrativo. |

### URLs úteis

Os parâmetros de consulta permitem abrir diretamente algumas vistas:

- `register.html?role=recommender` — registo como recomendador.
- `register.html?role=business` — registo como negócio.
- `dashboard.html?view=recommender` — painel do recomendador.
- `dashboard.html?view=business` — painel do negócio.
- `dashboard.html?view=ledger` — movimentos de comissões.
- `profile.html?u=rita-nogueira` — perfil de Rita Nogueira.
- `business.html?b=cafe-oriente&ref=rita-nogueira` — Café Oriente atribuído a uma recomendação.

O painel também permite alternar entre as vistas através do seletor no cabeçalho.

## Funcionalidades do protótipo

- Lista de negócios renderizada a partir dos dados de demonstração.
- Criação e remoção de recomendações no painel de recomendador.
- Apresentação e cópia de links de recomendação.
- Painel de negócio com indicadores e compras fictícias.
- Ledger com filtros e ações demonstrativas para confirmar, cancelar ou marcar comissões como pagas.
- Formulários de login, registo e compra com validação básica no navegador.
- Interface em português, com formatação de moeda `pt-PT` e euros.
- Layout responsivo na página inicial e menu hamburger para navegação móvel.

## Dados e persistência

Os dados iniciais estão em `public/js/mock-data.js`. Incluem:

- Um perfil de recomendador principal: Rita Nogueira.
- Cinco negócios: Café Oriente, Oficina Silva, Olaria Barro Fino, Clínica Dente Certo e Mercearia da Praça.
- Testemunhos, produtos, métricas e movimentos de comissão fictícios.

`public/js/store.js` fornece as operações usadas pelas páginas e guarda alterações no `localStorage` do navegador, na chave `recomendadores_pt_proto_v2`. Os dados ficam apenas nesse navegador e nessa origem; não são enviados para um servidor.

Para voltar aos dados de demonstração, remova essa chave no armazenamento local do site através das ferramentas de desenvolvimento do navegador e atualize a página. O armazenamento é independente por navegador e endereço local utilizado.

## Comissões

Os dados de demonstração estão preparados para uma comissão-base de 5%, uma janela de retenção de 30 dias e uma janela de atribuição de 30 dias. A configuração também contém uma divisão planeada de 80% da comissão para o recomendador e 20% para a plataforma.

Esta configuração não representa um sistema financeiro ativo. O protótipo não calcula ou transfere pagamentos reais; os painéis e movimentos servem para demonstrar o fluxo e o estado das comissões.

## Estrutura

```text
.
├── README.md
├── .gitattributes
├── imagens/                 # JPEGs incluídos no projeto; não usados atualmente pelas páginas
└── public/
    ├── index.html
    ├── business.html
    ├── dashboard.html
    ├── login.html
    ├── profile.html
    ├── register.html
    ├── css/
    │   ├── token.css        # Variáveis de cor, tipografia e medidas
    │   ├── base.css         # Regras base e utilitários
    │   ├── components.css   # Navegação, botões, cartões, grelhas e formulários
    │   └── home.css         # Estilos da página inicial e menu móvel
    └── js/
        ├── mock-data.js     # Dados fictícios da Fase 1
        ├── store.js         # Estado e persistência local
        └── ui.js            # Formatação, notificações e classes de estado
```

As páginas carregam os estilos comuns `token.css`, `base.css` e `components.css`. A página inicial também carrega `home.css`. O JavaScript de cada página está incluído como módulo inline e importa os módulos necessários de `public/js/`.

## Limitações conhecidas

- **Autenticação:** login e registo só validam campos no navegador; não criam nem verificam contas.
- **Compra:** o formulário da página de negócio mostra uma confirmação demonstrativa; não cria pedidos persistentes nem processa pagamentos.
- **API:** referências a `/api/auth/login` e `/api/auth/register` indicam integrações futuras; esses endpoints não existem neste projeto.
- **Comissões:** as alterações no ledger são locais e demonstrativas. A ação para libertar janelas de reembolso apenas apresenta uma notificação.
- **Atribuição:** os links copiados usam o formato `/r/...`, mas essa rota e a atribuição de compras não estão implementadas.
- **Indicadores:** alguns totais e métricas nos painéis são valores de exemplo e não são recalculados a partir dos movimentos.
- **Consentimentos:** as caixas de aceitação no formulário de registo não são enviadas nem armazenadas.
- **Imagens:** os JPEGs em `imagens/` não estão atualmente ligados às páginas.
- **Testes:** não há testes automatizados ou comandos de lint/build configurados.

## Tecnologias

- HTML
- CSS
- JavaScript nativo com ES Modules
- `localStorage` para persistência local de dados de demonstração
