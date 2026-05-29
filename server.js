require('dotenv').config();
const apiKey = process.env.API_KEY;

const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args))

const app = express()

app.use(cors())
app.use(express.json())

app.post("/gerar", async (req, res) => {

    try {

        const resposta = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.API_KEY}`
                },

                body: JSON.stringify(req.body)
            }
        )

        const dados = await resposta.json()

        console.log(dados)

        if (dados.error) {
            return res.status(400).json({
                erro: dados.error.message
            })
        }

        res.json(dados)

    } catch (erro) {

        console.log("ERRO NO SERVIDOR:")
        console.log(erro)

        res.status(500).json({
            erro: "Erro interno no servidor"
        })
    }
})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})