"use client";
import { useRef, useEffect } from "react";

// Definir o tipo da prop para o componente
interface DonutProps {
  color: string;
}

const Donut: React.FC<DonutProps> = ({ color }) => {
  // Usar o tipo correto para o `ref` que se refere a um elemento de `pre`
  const canvasRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    let A = 0; // Ângulo de rotação ao redor do eixo X
    let B = 0; // Ângulo de rotação ao redor do eixo Z

    const screenWidth = 80;
    const screenHeight = 22;
    const output = new Array(screenWidth * screenHeight).fill(" ");
    const zBuffer = new Array(screenWidth * screenHeight).fill(0);

    const K1 = 15; // Fator de escala de distância
    const K2 = 5; // Distância do visualizador até o donut

    const luminanceChars = ".,-~:;=!*#$@"; // Caracteres que representam diferentes níveis de luminância

    const render = () => {
      // Limpar o output e o z-buffer
      for (let i = 0; i < screenWidth * screenHeight; i++) {
        output[i] = " ";
        zBuffer[i] = 0;
      }

      // Iterar sobre theta (ângulo ao redor do eixo principal do donut)
      for (let j = 0; j < 6.28; j += 0.07) {
        const sinJ = Math.sin(j);
        const cosJ = Math.cos(j);

        // Iterar sobre phi (ângulo ao redor do tubo do donut)
        for (let i = 0; i < 6.28; i += 0.02) {
          const sinI = Math.sin(i);
          const cosI = Math.cos(i);
          const sinA = Math.sin(A);
          const cosA = Math.cos(A);
          const sinB = Math.sin(B);
          const cosB = Math.cos(B);

          const c = sinI;
          const d = cosJ;
          const e = sinA;
          const f = sinJ;
          const g = cosA;
          const h = d + 2; // Ajuste do raio do donut
          const D = 1 / (c * h * e + f * g + K2); // Fator de profundidade
          const l = cosI;
          const m = cosB;
          const n = sinB;
          const t = c * h * g - f * e;

          // Coordenadas projetadas em 2D
          const x = Math.floor(40 + 30 * D * (l * h * m - t * n));
          const y = Math.floor(12 + 15 * D * (l * h * n + t * m));
          const o = x + screenWidth * y;

          // Calcular a luminância
          const N = Math.floor(
            8 * ((f * e - c * d * g) * m - c * d * n - e * l * n) - Math.sin(A),
          );

          // Selecionar o caractere de luminância
          const luminanceIndex = N > 0 ? N : 0;
          const clampedIndex =
            luminanceIndex < luminanceChars.length
              ? luminanceIndex
              : luminanceChars.length - 1;
          const char = luminanceChars[clampedIndex];

          // Garantir que as coordenadas da tela estão dentro dos limites
          if (y < screenHeight && y >= 0 && x >= 0 && x < screenWidth && D > zBuffer[o]) {
            zBuffer[o] = D;
            output[o] = char;
          }
        }
      }

      // Converter o buffer de output em uma string com quebras de linha
      const outputString = output.join("");
      const formattedOutput = outputString.match(/.{1,80}/g)?.join("\n") ?? "";

      // Atualizar o conteúdo do elemento `pre`
      if (canvasRef.current) {
        canvasRef.current.textContent = formattedOutput;
      }

      // Incrementar os ângulos de rotação para animação
      A += 0.04;
      B += 0.02;

      // Solicitar o próximo frame de animação
      requestAnimationFrame(render);
    };

    // Iniciar a animação
    render();

    // Função de limpeza para parar a animação caso o componente seja desmontado
    return () => {};
  }, []);

  return (
    <pre
      ref={canvasRef}
      style={{
        color: color, // Cor do texto
        fontFamily: "monospace",
        fontSize: "15px",
        textAlign: "center",
        lineHeight: "16px",
      }}
    ></pre>
  );
};

export default Donut;
