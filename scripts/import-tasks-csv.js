/**
 * 🟢 VANTAGENS DESTA ABORDAGEM (COM LIB + STREAMS):
 * * 1. PERFORMANCE BRUTAL: Usa 'fs.createReadStream', que lê o arquivo em pedacinhos minúsculos (chunks).
 * O gasto de memória RAM é o mesmo se o arquivo tiver 5 linhas ou 5 milhões de linhas.
 * 2. BLINDAGEM CONTRA VÍRGULAS: A biblioteca sabe ler textos envelopados por aspas, garantindo que
 * vírgulas normais inseridas nos títulos não quebrem as colunas.
 * 3. LIMPEZA AUTOMÁTICA: Trata quebras de linha de qualquer sistema operacional e ignora linhas vazias
 * sem precisar de Regex ou tratamentos manuais complexos.
 * * 🔄 FLUXO RESUMIDO DO ARQUIVO:
 * Disco (tasks.csv) ➡️ Stream de Leitura (Pedaços de texto) ➡️ Pipe (csv-parse limpa e separa)
 * ➡️ Loop 'for await' (Recebe a linha limpa) ➡️ Requisição HTTP (fetch POST) ➡️ Banco de Dados (db.json)
 */

import fs from 'node:fs';
import { parse } from 'csv-parse';

const csvPath = new URL('./tasks.csv', import.meta.url);
const api = 'http://localhost:3000/tasks';

async function handleProcessFile() {
  try {
    // 1. Abre o fluxo de leitura sob demanda (Stream)
    const fileStream = fs.createReadStream(csvPath);

    // 2. Passa o fluxo pelo "filtro/tradutor" da biblioteca com as configurações
    const csvParser = fileStream.pipe(
      parse({
        delimiter: ',',
        from_line: 2, // Pula a primeira linha (cabeçalho)
        skip_empty_lines: true, // Ignora linhas em branco automaticamente
      }),
    );

    // 3. O loop 'for await' processa cada linha assincronamente assim que ela é lida do disco
    for await (const row of csvParser) {
      // Desestrutura a linha (o parser transforma a linha em um array de colunas)
      const [title, description] = row;

      await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
        }),
      });
    }
    console.log('🎉 Fetch CSV file successfully!');
  } catch (error) {
    console.error('❌ Error in extract CSV file : ', error.message);
  }
}

await handleProcessFile();
