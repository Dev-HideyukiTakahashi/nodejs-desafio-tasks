import fs from 'fs/promises';

const path = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(path, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(path, JSON.stringify(this.#database));
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  select(table, search) {
    const data = this.#database[table] ?? [];

    if (search && data.length > 0) {
      const searchResult = data.filter(
        task => task.title.includes(search) || task.description.includes(search),
      );

      return searchResult;
    }

    return data;
  }

  update(table, data, id) {
    const index = this.#database[table].findIndex(data => data.id === id);

    if (index > -1) {
      const currentTask = this.#database[table][index];

      this.#database[table][index] = {
        ...this.#database[table][index],
        title: data.title ?? currentTask.title,
        description: data.description ?? currentTask.description,
        updated_at: data.updated_at,
      };

      this.#persist();
      return this.#database[table][index];
    }
  }

  delete(table, id) {
    const index = this.#database[table].findIndex(data => data.id === id);

    if (index > -1) {
      this.#database[table].splice(index, 1);
      this.#persist();

      return true;
    }
    return false;
  }

  complete(table, data, id) {
    const index = this.#database[table].findIndex(data => data.id === id);

    if (index > -1) {
      this.#database[table][index] = {
        ...this.#database[table][index],
        ...data,
      };

      this.#persist();
      return this.#database[table][index];
    }
  }
}
