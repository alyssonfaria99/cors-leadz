const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

// Rota para o proxy
app.post('/proxy', async (req, res) => {
    try {
        // Substitua 'YOUR_SCRIPT_URL' pela URL do Google Apps Script copiada anteriormente
        const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbxaxcz6uaZGue8kWm-mb4ruND02Fk6xGvvqCYeEqfAxYJA5YOOLjGMBPMB9v1BCyP03/exec';

        // Encaminha a requisição para o Google Apps Script com os dados recebidos
        const response = await axios.post(googleAppsScriptUrl, req.body, {
            headers: { 'Content-Type': 'application/json' }
        });

        // Adiciona os cabeçalhos CORS
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type');

        // Envia a resposta de volta para o cliente (WaSpeed)
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Erro ao encaminhar a requisição:', error.message);
        res.status(500).json({ status: 'error', message: 'Erro ao processar a requisição' });
    }
});

// Inicia o servidor na porta definida
app.listen(PORT, () => console.log(`Proxy ativo na porta ${PORT}`));
