export  interface Task {
  task_id: number;
  user_id: number;
  title: string;
  description: string;
  due_date: Date;
  completed: boolean;
  created_at: Date;
  updated_at: Date;
}
