# BiblioJUVA - Sistema de Catálogo de Biblioteca

## Visão Geral

Este projeto implementa um sistema completo de catálogo de biblioteca com funcionalidades CRUD (Create, Read, Update, Delete) para gerenciamento de livros. O sistema foi desenvolvido utilizando uma arquitetura moderna com separação clara entre frontend e backend, proporcionando uma experiência de usuário intuitiva e uma API robusta para manipulação de dados.

### Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias principais:

**Backend:**
- **Flask 3.1.2**: Framework web Python minimalista e flexível
- **Flask-SQLAlchemy 3.1.1**: ORM (Object-Relational Mapping) para interação com banco de dados
- **Flask-CORS 6.0.1**: Middleware para permitir requisições cross-origin
- **SQLite**: Banco de dados relacional leve e sem servidor

**Frontend:**
- **Next.js 15.5.2**: Framework React para aplicações web modernas
- **React 19.1.0**: Biblioteca JavaScript para construção de interfaces de usuário
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva
- **pnpm**: Gerenciador de pacotes eficiente para Node.js

### Arquitetura do Sistema

O sistema segue uma arquitetura cliente-servidor com as seguintes características:

1. **Separação de Responsabilidades**: O frontend (Next.js) é responsável pela interface do usuário e experiência, enquanto o backend (Flask) gerencia a lógica de negócio e persistência de dados.

2. **API RESTful**: O backend expõe uma API REST que segue as convenções HTTP para operações CRUD.

3. **Banco de Dados Relacional**: Utiliza SQLite para armazenamento persistente dos dados dos livros.

4. **Interface Responsiva**: O frontend é totalmente responsivo, funcionando adequadamente em dispositivos desktop e móveis.

## Estrutura do Projeto

O projeto está organizado em duas pastas principais:

```
projeto-biblioteca/
├── backend/
│   ├── venv/                 # Ambiente virtual Python
│   ├── app.py               # Aplicação Flask principal
│   ├── seed_data.py         # Script para popular o banco com dados de exemplo
│   ├── requirements.txt     # Dependências Python
│   └── library.db          # Banco de dados SQLite (criado automaticamente)
├── frontend/
│   ├── app/
│   │   ├── components/      # Componentes React reutilizáveis
│   │   ├── types/          # Definições de tipos TypeScript
│   │   └── page.tsx        # Página principal da aplicação
│   ├── .env.local          # Variáveis de ambiente
│   ├── package.json        # Dependências Node.js
│   └── pnpm-lock.yaml     # Lock file do pnpm
└── DOCUMENTACAO.md         # Este arquivo de documentação
```



## Modelo de Dados

### Estrutura da Tabela `books`

O sistema utiliza uma única tabela principal para armazenar as informações dos livros. A estrutura da tabela é definida da seguinte forma:

| Campo | Tipo | Restrições | Descrição |
|-------|------|------------|-----------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Identificador único do livro |
| `title` | TEXT | NOT NULL | Título do livro |
| `author` | TEXT | NOT NULL | Nome do autor |
| `isbn` | TEXT | UNIQUE, NOT NULL | Código ISBN único do livro |
| `published_date` | TEXT | NULLABLE | Data ou ano de publicação |
| `genre` | TEXT | NULLABLE | Gênero literário |
| `description` | TEXT | NULLABLE | Descrição ou sinopse do livro |

### Validações e Regras de Negócio

O sistema implementa as seguintes validações e regras:

1. **Campos Obrigatórios**: Título, autor e ISBN são campos obrigatórios para todos os livros.

2. **Unicidade do ISBN**: Cada livro deve ter um ISBN único no sistema, impedindo duplicatas.

3. **Flexibilidade de Dados**: Campos como data de publicação, gênero e descrição são opcionais, permitindo cadastro de livros com informações incompletas.

4. **Validação de Entrada**: O frontend valida os dados antes do envio, e o backend realiza validação adicional antes da persistência.

### Dados de Exemplo

O sistema inclui um script de seed que popula o banco com cinco livros clássicos da literatura brasileira:

- **Dom Casmurro** - Machado de Assis (1899)
- **O Cortiço** - Aluísio Azevedo (1890)
- **Iracema** - José de Alencar (1865)
- **O Guarani** - José de Alencar (1857)
- **Memórias Póstumas de Brás Cubas** - Machado de Assis (1881)

Estes dados servem para demonstrar as funcionalidades do sistema e fornecer conteúdo inicial para testes.

## API Backend

### Endpoints Disponíveis

O backend Flask expõe os seguintes endpoints RESTful:

#### 1. Verificação de Saúde
- **Endpoint**: `GET /api/health`
- **Descrição**: Verifica se a API está funcionando corretamente
- **Resposta de Sucesso**:
```json
{
  "status": "OK",
  "message": "API funcionando corretamente"
}
```

#### 2. Listar Todos os Livros
- **Endpoint**: `GET /api/books`
- **Descrição**: Retorna uma lista com todos os livros cadastrados
- **Resposta de Sucesso**: Array de objetos livro
```json
[
  {
    "id": 1,
    "title": "Dom Casmurro",
    "author": "Machado de Assis",
    "isbn": "978-85-359-0277-5",
    "published_date": "1899",
    "genre": "Romance",
    "description": "Um dos maiores clássicos da literatura brasileira..."
  }
]
```

#### 3. Obter Livro Específico
- **Endpoint**: `GET /api/books/{id}`
- **Descrição**: Retorna os dados de um livro específico pelo ID
- **Parâmetros**: `id` (integer) - ID do livro
- **Resposta de Sucesso**: Objeto livro
- **Resposta de Erro**: 404 se o livro não for encontrado

#### 4. Criar Novo Livro
- **Endpoint**: `POST /api/books`
- **Descrição**: Cria um novo livro no sistema
- **Corpo da Requisição**:
```json
{
  "title": "Título do Livro",
  "author": "Nome do Autor",
  "isbn": "978-XX-XXXX-XXX-X",
  "published_date": "2023",
  "genre": "Ficção",
  "description": "Descrição do livro..."
}
```
- **Resposta de Sucesso**: 201 com o objeto livro criado
- **Resposta de Erro**: 400 para dados inválidos ou ISBN duplicado

#### 5. Atualizar Livro
- **Endpoint**: `PUT /api/books/{id}`
- **Descrição**: Atualiza os dados de um livro existente
- **Parâmetros**: `id` (integer) - ID do livro
- **Corpo da Requisição**: Objeto com campos a serem atualizados
- **Resposta de Sucesso**: Objeto livro atualizado
- **Resposta de Erro**: 404 se o livro não for encontrado, 400 para dados inválidos

#### 6. Deletar Livro
- **Endpoint**: `DELETE /api/books/{id}`
- **Descrição**: Remove um livro do sistema
- **Parâmetros**: `id` (integer) - ID do livro
- **Resposta de Sucesso**: 200 com mensagem de confirmação
- **Resposta de Erro**: 404 se o livro não for encontrado

### Tratamento de Erros

A API implementa tratamento abrangente de erros, retornando códigos HTTP apropriados e mensagens descritivas:

- **400 Bad Request**: Dados inválidos ou ausentes
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erros internos do servidor

### CORS (Cross-Origin Resource Sharing)

O backend está configurado para aceitar requisições de qualquer origem, permitindo que o frontend acesse a API sem restrições de CORS. Esta configuração é adequada para desenvolvimento e pode ser ajustada para produção conforme necessário.


## Frontend Next.js

### Componentes Principais

O frontend é construído com uma arquitetura de componentes React bem estruturada:

#### 1. Página Principal (`app/page.tsx`)
A página principal serve como o ponto de entrada da aplicação e gerencia o estado global dos livros. Suas principais responsabilidades incluem:

- **Gerenciamento de Estado**: Utiliza React hooks (`useState`, `useEffect`) para gerenciar a lista de livros, estado de carregamento e controle de modais.
- **Comunicação com API**: Implementa funções para todas as operações CRUD que se comunicam com o backend Flask.
- **Coordenação de Componentes**: Orquestra a interação entre os componentes `BookList` e `BookForm`.
- **Tratamento de Erros**: Exibe mensagens de erro apropriadas quando operações falham.

#### 2. Lista de Livros (`app/components/BookList.tsx`)
Este componente é responsável pela exibição dos livros em um layout de grade responsivo:

- **Layout Responsivo**: Utiliza CSS Grid para adaptar-se a diferentes tamanhos de tela (1 coluna em mobile, 2 em tablet, 3 em desktop).
- **Cards Interativos**: Cada livro é exibido em um card com efeitos hover e animações suaves.
- **Ações Rápidas**: Botões de edição e exclusão integrados em cada card.
- **Estado Vazio**: Exibe uma mensagem amigável quando não há livros cadastrados.

#### 3. Formulário de Livros (`app/components/BookForm.tsx`)
Um componente modal reutilizável para criação e edição de livros:

- **Modo Dual**: Funciona tanto para criar novos livros quanto para editar existentes.
- **Validação de Formulário**: Implementa validação client-side para campos obrigatórios.
- **Interface Intuitiva**: Layout limpo com campos organizados logicamente.
- **Feedback Visual**: Indicadores visuais para campos obrigatórios e estados de erro.

### Tipagem TypeScript

O projeto utiliza TypeScript para garantir type safety e melhor experiência de desenvolvimento:

```typescript
export interface Book {
  id: number
  title: string
  author: string
  isbn: string
  published_date?: string
  genre?: string
  description?: string
}
```

Esta interface define a estrutura de dados dos livros, garantindo consistência entre componentes e facilitando a manutenção do código.

### Estilização com Tailwind CSS

O frontend utiliza Tailwind CSS para estilização, proporcionando:

- **Design System Consistente**: Classes utilitárias que garantem consistência visual.
- **Responsividade**: Breakpoints integrados para diferentes dispositivos.
- **Performance**: CSS otimizado com apenas as classes utilizadas.
- **Manutenibilidade**: Estilos declarativos diretamente no JSX.

### Funcionalidades da Interface

#### Listagem de Livros
A interface principal exibe todos os livros em um layout de grade atrativo, com cada livro apresentado em um card que inclui:
- Título em destaque
- Informações do autor e ISBN
- Data de publicação e gênero (quando disponíveis)
- Descrição truncada com reticências
- Botões de ação para editar e excluir

#### Adição de Novos Livros
O processo de adição é iniciado através de um botão proeminente que abre um modal com formulário. O formulário inclui:
- Campos obrigatórios claramente marcados
- Validação em tempo real
- Feedback visual para erros
- Botões de ação (Cancelar/Adicionar)

#### Edição de Livros
A edição utiliza o mesmo componente de formulário, mas pré-populado com os dados existentes:
- Carregamento automático dos dados do livro
- Preservação de campos não editados
- Validação de unicidade de ISBN
- Confirmação visual de alterações

#### Exclusão de Livros
A funcionalidade de exclusão inclui:
- Confirmação via diálogo JavaScript nativo
- Remoção imediata da interface após confirmação
- Atualização automática da lista

### Gerenciamento de Estado

O aplicativo utiliza o padrão de estado local do React com hooks:

```typescript
const [books, setBooks] = useState<Book[]>([])
const [selectedBook, setSelectedBook] = useState<Book | null>(null)
const [isFormOpen, setIsFormOpen] = useState(false)
const [loading, setLoading] = useState(true)
```

Este padrão simples é adequado para a complexidade atual da aplicação, mas pode ser facilmente migrado para soluções mais robustas como Redux ou Zustand se necessário.

### Comunicação com API

Todas as operações de API são implementadas usando a Fetch API nativa do JavaScript, com tratamento adequado de erros e estados de carregamento. A URL base da API é configurável através de variáveis de ambiente, facilitando o deployment em diferentes ambientes.
