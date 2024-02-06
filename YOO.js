import Replicate from "replicate";
const replicate = new Replicate();

const output = await replicate.run(
  "fofr/latent-consistency-model:a83d4056c205f4f62ae2d19f73b04881db59ce8b81154d314dd34ab7babaa0f1",
  {
    input: {
      prompt: "Self-portrait oil painting, a beautiful cyborg with golden hair, 8k"
    }
  }
);
console.log(output);