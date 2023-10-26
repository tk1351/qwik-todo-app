import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";

export const useTodos = routeLoader$(async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    headers: { Accept: "application/json" },
  });
  return (await response.json()) as {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }[];
});

export default component$(() => {
  const todos = useTodos();
  return (
    <>
      <h1>Todos</h1>
      <Link href="/post">Post Todo</Link>
      <ul>
        {todos.value.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
});

export const head: DocumentHead = {
  title: "Todo App",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
