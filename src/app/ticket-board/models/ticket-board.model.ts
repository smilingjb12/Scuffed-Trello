export class Ticket {
  id: number;
  title: string;
  description: string;
  categoryId: string;
}

export class HistoryLog {
  date: Date;
  user: string;
  action: string;
}

export class Lookup {
  id: number;
  text: string;
}
