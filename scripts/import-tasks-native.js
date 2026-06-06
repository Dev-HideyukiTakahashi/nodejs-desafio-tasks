/**
 * 🔴 DESVANTAGENS DESTA ABORDAGEM (VANILLA / MANUAL):
 * * 1. ALTO CONSUMO DE MEMÓRIA (RAM): Usa 'fs.readFile', que joga o arquivo INTEIRO na memória de uma vez.
 * Se o arquivo tiver milhões de linhas ou gigabytes, o servidor vai travar e cair (Crash).
 * 2. FRÁGIL CONTRA QUEBRAS DE LINHA (\r): Sistemas operacionais diferentes (Windows/Linux) salvam quebras
 * de linha de formas diferentes. Tratar isso na mão com split('\n') costuma deixar caracteres invisíveis soltos.
 * 3. ERROS COM TEXTOS REAIS: Se o usuário colocar uma vírgula dentro do texto (ex: "Estudar Node, React e TS"),
 * o '.split(',')' vai cortar o texto no lugar errado, estragando e desalinhando todas as colunas, o que precisa ser tratado
 */

import fs from 'node:fs/promises';

const csvPath = new URL('./tasks.csv', import.meta.url);
const api = 'http://localhost:3000/tasks';

// importa o csv disparando contra a API
async function handleProcessFile() {
  const tasks = await extractCSV();

  if (!tasks || tasks.length === 0) return;

  for (let task of tasks) {
    await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
      }),
    });
  }

  console.log('🎉 Fetch CSV file successfully!');
}

// extrai os dados do arquivo csv
async function extractCSV() {
  try {
    const rawData = await fs.readFile(csvPath, 'utf-8');
    const list = rawData.split('\n').splice(1);

    let tasks = [];

    for (let item of list) {
      // ignora linhas em branco invisíveis no fim do arquivo
      if (!item.trim()) continue;

      const fields = item.split(',');

      const task = {
        title: fields[0]?.trim(),
        description: fields[1]?.trim(),
      };

      tasks.push(task);
    }

    return tasks;
  } catch (error) {
    console.error('❌ Error in extract CSV file : ', error.message);
  }
}

await handleProcessFile();
