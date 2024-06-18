# Landing Page de Rastreamento de Pacotes

Esta é a landing page do nosso sistema que inclui uma tela de propaganda do produto e uma funcionalidade para que os clientes possam rastrear seus pacotes com um código de rastreamento. O cliente pode ver a localização do pacote em tempo real em um mapa.

## Funcionalidades

- **Tela de Propaganda**: Apresenta informações e promoções sobre o produto.
- **Rastreamento em Tempo Real**: Permite que os clientes insiram um código de rastreamento para visualizar a localização do pacote em um mapa.

## Pré-requisitos

- Node.js e npm/yarn instalados.
- Chave de API do Google Maps.

## Instalação

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/Track-Trace-TCC/landing-page-tracketrace
    cd landing-page-tracketrace
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3. **Configure as variáveis de ambiente:**

    Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis de ambiente:

    ```bash
    NEXT_PUBLIC_API_URL='YOUR API URL'
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY='YOUR GOOGLE KEY'
    ```

    - **`NEXT_PUBLIC_API_URL`**: URL da API para buscar os dados de rastreamento do pacote.
    - **`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`**: Chave de API do Google Maps para exibir o mapa.

## Uso

1. **Execute o projeto:**

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

2. **Acesse a aplicação:**

    Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).

3. **Utilize a landing page:**

    - **Tela de Propaganda**: Navegue para a página principal para ver as informações sobre o produto.
    - **Rastreamento**: Vá para a página de rastreamento, insira o código do pacote e veja a localização em tempo real no mapa.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor e criação de aplicações web.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Google Maps API**: API para exibição de mapas e localização em tempo real.
- **CSS Modules**: Para estilos modulares e reutilizáveis.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Contato

Se tiver dúvidas ou sugestões, entre em contato pelo email: [viniciusataides@gmail.com](mailto:viniciusataides@gmail.com).

