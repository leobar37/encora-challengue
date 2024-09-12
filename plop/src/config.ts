import type { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
  plop.setGenerator("component", {
    description: "Create a new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.tsx",
      },
    ],
  });
  plop.setGenerator("p2d", {
    description: "Create a new component pd3",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.tsx",
      },
    ],
  });
}
