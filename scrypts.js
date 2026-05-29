/* 
Lógica de Programação

Algoritmo - Receita de BOLO

[x] Saber quando o botão foi clicado
[x] Pegar o texto do TextArea
[x] Enviar para a IA(servidor)
[x] Pegar a resposta da IA
[x ] Colocar na tela
    [x] Código
    [x] Resultado do Código     
[ ] Refinar nosso resultado        

    querySelector - pega um elemento que eu escolher
    HTML - document
    JavaScript - script
*/




let prompt = `você é um designer web premiado e Programador. 
Crie uma landing page COMPLETA e VISUALMENTE IMPRESSIONANTE para o negócio descrito.

Regras de resposta:
- Responda SOMENTE com HTML e CSS puros
- Não use crases, markdown ou explicações
- Não use tags <img>

Identidade visual (capriche e surpreenda):
- Invente uma paleta de cores única que combine com a essência do negócio
- Escolha uma Google Font marcante via @import
- Use emojis grandes no lugar de imagens
- Use CSS moderno: gradientes, sombras, animações sutis, layout generoso, tipografia forte

Estrutura da página:
- Header com nome do negócio e menu
- Hero impactante com título, subtítulo e botão CTA
- Seção de diferenciais com emojis
- Depoimento de cliente
- Footer com contato

Todo o conteúdo em português, criativo e específico para o negócio.`


// clicou no botão Gerar
async function gerarCodigo() {

    try {

        let textarea = document.querySelector(".texto-pagina").value

        console.log("Texto digitado:", textarea)

        let resposta = await fetch("http://localhost:3000/gerar", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                model: "llama-3.3-70b-versatile",

                messages: [

                    {
                        role: "system",
                        content: prompt
                    },

                    {
                        role: "user",
                        content: textarea
                    }
                ]
            })
        })

        console.log("Resposta recebida:", resposta)

        let dados = await resposta.json()

        console.log("Dados:", dados)

        if (dados.erro) {
            alert(dados.erro)
            return
        }

        let resultado = dados.choices[0].message.content

        console.log(resultado)

        let espacoCodigo = document.querySelector(".bloco-codigo")
        let espacoSite = document.querySelector(".bloco-site")

        espacoCodigo.textContent = resultado
        espacoSite.srcdoc = resultado

    } catch (erro) {

        console.log("ERRO COMPLETO:")
        console.log(erro)

        alert("Veja o console F12")
    }
}

/* IA pra gerar oque queremos precisa de 3 coisas:
 1) Qual modelo de IA queremos usar? (llama-3.3-70b-versatile) 
 2)system - o que queremos que a IA faça? (gerar um código HTML para um site de acordo com a descrição do negócio)
 3) user - a descrição do negócio (loja de roupas no centro de Belo Horizonte)
*/
// JSON - JavaScript Object Notation- Formato da Internet 
// Headrs / head - configurações de uma requisição
// Body / corpo - o conteúdo da requisição



