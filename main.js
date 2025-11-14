/*
 * === HUBSPOT CUSTOM CODE ACTION ===
 * Objetivo: Padronizar números de telefone no formato internacional
 * brasileiro (+55DDDNNNNNNNNN)
 * Propriedade de entrada: phone (ou a que você definiu)
 * Propriedade de saída: numero_formatado
 */
exports.main = async (event, callback) => {
    try {
        // Captura a propriedade recebida como input
        // Use 'event.inputFields.phone' se for o nome da entrada (como na imagem)
        const rawPhone = event.inputFields.phone || event.inputFields.telefone || "";

        // Função para limpar e formatar o número no padrão E.164 (+55...)
        const cleanPhone = (raw) => {
            if (!raw) {
                return null;
            }

            // 1. Remove todos os caracteres não-numéricos, exceto um '+' inicial.
            let cleaned = raw.toString().replace(/[^\d+]/g, '');

            // 2. Garante que o '+' esteja apenas no início e remove duplicidades internas
            // Ex: '123+456' -> '123456', '+123+456' -> '+123456'
            cleaned = cleaned.replace(/(\+.*)\+/g, '$1');
            cleaned = cleaned.replace(/(.)\+/g, '$1');

            // 3. Remove o prefixo +55 ou 55 se já existir
            if (cleaned.startsWith('+55')) {
                cleaned = cleaned.substring(3);
            } else if (cleaned.startsWith('55')) {
                cleaned = cleaned.substring(2);
            } else if (cleaned.startsWith('+')) {
                // Se tiver outro código de país (ex: +1), remove o '+' para adicionar o +55.
                cleaned = cleaned.substring(1);
            }

            // 4. Retorna o número formatado no padrão +55 seguido pelos dígitos (DDD+Número)
            // Se 'cleaned' não tiver dígitos, retorna null.
            if (cleaned.length < 8) { // Geralmente números de telefone têm no mínimo 8 dígitos
                return null; // ou raw, dependendo do que você quer fazer com números inválidos
            }

            return `+55${cleaned}`;
        }

        // Executa a formatação
        const formattedPhone = cleanPhone(rawPhone);

        // Retorna o valor formatado para o workflow (output precisa chamar "numero_formatado")
        callback({
            outputFields: {
                numero_formatado: formattedPhone,
            },
        });
    } catch (error) {
        // Trata erros
        console.log("Erro ao formatar telefone:", error);
        callback({
            outputFields: {
                numero_formatado: null, // Retorna null em caso de erro
            },
            error: `Erro ao formatar telefone: ${error.message}`
        });
        throw error;
    }
};
