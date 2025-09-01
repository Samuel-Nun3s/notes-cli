export const notesService = {
  async create(note) {
    const response = await fetch(`${process.env.URL_SERVER}notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note)
    });

    return response.json(); 
  },

  async list() {
    const response = await fetch(`${process.env.URL_SERVER}notes`);
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${process.env.URL_SERVER}notes/${id}`);
    return response.json();
  },

  async update(note) {
    return fetch(`${process.env.URL_SERVER}notes/${note.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note)
    });
  },

  async remove(id) {
    return fetch(`${process.env.URL_SERVER}notes/${id}`, { method: "DELETE" });
  }
};
