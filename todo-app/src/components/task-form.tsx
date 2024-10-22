import { ComponentProps } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";

type TaskProps = ComponentProps<"div"> & {
  title: string;
  description: string;
  date: string;
};

export function TaskForm({ title, description, date }: TaskProps) {
  return (
    <Card className="px-16 w-full">
      <CardHeader>
        <label htmlFor="title">{title}</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2"
          name="title"
        ></input>
      </CardHeader>
      <CardContent className=" flex flex-col flex-wrap space-y-3">
        <label htmlFor="description">{description}</label>
        <textarea
          className="border border-gray-300 rounded-lg p-2"
          rows={4}
          name="description"
        ></textarea>
        <label htmlFor="date">{date}</label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg p-2"
          name="date"
        ></input>
        <button
          type="submit"
          className="btn-primary bg-primary text-white rounded-lg self-start px-4 py-2"
        >
          Save
        </button>
      </CardContent>
    </Card>
  );
}
