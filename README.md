# NumberFormat – HubSpot Custom Code Action

Este projeto contém um script em Node.js utilizado em **Custom Code Actions** do HubSpot para padronizar números de telefone no formato:

A lógica garante que o número seja validado, normalizado e retornado no formato correto, independentemente do padrão enviado pela origem (CRM, formulário, integração etc.).

---

## 🚀 Funcionalidades

- Remove caracteres especiais (espaços, hífens, parênteses, +).
- Garante código do país +55.
- Garante DDD com 2 dígitos.
- Normaliza o número final para o padrão desejado.
- Retorna o número pronto para uso no HubSpot.

---

## 📁 Arquivo Principal

**main.js**

Contém toda a lógica de formatação, validando e retornando o telefone no formato padronizado.

---

🛠️ Tecnologias Utilizadas

Node.js 18+

HubSpot Custom Code Action (Workflows)

📦 Como usar no HubSpot

Crie um workflow.

Adicione um Custom Code Action.

Copie o conteúdo do arquivo main.js.

Configure a entrada do tipo string para receber o número.

Retorne a variável formatada como saída da ação.

👨‍💻 Autor

Luan Nunes
Soluções em HubSpot, automações e integrações.



