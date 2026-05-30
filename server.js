const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Permite que o site e o bot conversem com o servidor sem bloqueios
app.use(cors());
app.use(express.json());

// Banco de dados temporário para guardar as configurações do seu painel
let configuracoesBot = {
    boasVindas: {
        ativo: true,
        mensagem: "Seja muito bem-vindo(a) ao nosso servidor!"
    },
    antiLink: {
        ativo: false
    },
    autoCargo: {
        ativo: true,
        cargo: "Membro"
    },
    prefixo: "!"
};

// Rota para o site puxar as configurações atuais e mostrar na tela
app.get('/api/config', (req, res) => {
    res.json(configuracoesBot);
});

// Rota que o site vai usar para SALVAR as novas opções que você mudar
app.post('/api/config', (req, res) => {
    configuracoesBot = req.body;
    console.log("⚙️ Novas configurações recebidas do painel:", configuracoesBot);
    res.json({ status: "sucesso", mensagem: "Configurações atualizadas com sucesso!" });
});

// Rota que o seu BOT do Discord vai acessar para saber o que ele deve fazer
app.get('/api/bot-config', (req, res) => {
    res.json(configuracoesBot);
});

// Inicia o servidor na porta certa
app.listen(PORT, () => {
    console.log(`🚀 Servidor do painel rodando com sucesso na porta ${PORT}`);
});

