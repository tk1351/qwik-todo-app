import { component$, useSignal } from "@builder.io/qwik";
import { Form, routeAction$, zod$, z, Link } from "@builder.io/qwik-city";

export const usePostTodoAction = routeAction$(async (props) => {
  await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: JSON.stringify(props),
  })
    .then(async (res) => {
      console.log(await res.json(), "success");
    })
    .catch((error) => {
      console.error(error);
    });
  zod$({
    title: z.string(),
  });
});

export default component$(() => {
  const titleValue = useSignal("");

  const action = usePostTodoAction();
  return (
    <>
      <h1>Post</h1>
      <Form
        action={action}
        onSubmitCompleted$={() => {
          titleValue.value = "";
        }}
      >
        <input name="title" bind:value={titleValue} />
        <button>Submit</button>
      </Form>
      <Link href="/">Top</Link>
    </>
  );
});
