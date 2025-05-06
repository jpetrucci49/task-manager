export class Task {
    #id: string;
    #title: string;
    #status: string;
  
    constructor(id: string, title: string, status: string = 'todo') {
      this.#id = id;
      this.#title = title;
      this.#status = status;
    }
  
    getDetails() {
      return { id: this.#id, title: this.#title, status: this.#status };
    }
  
    updateStatus(newStatus: string) {
      this.#status = newStatus;
    }
  }