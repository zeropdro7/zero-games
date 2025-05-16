"use client";
import { useEffect, useRef } from "react";

export default function Slug() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const scale = 20;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;

    let snake: { x: number; y: number }[] = [];
    snake[0] = { x: Math.floor(columns / 2), y: Math.floor(rows / 2) };
    let velocityX = 0;
    let velocityY = 0;
    let food = {
      x: Math.floor(Math.random() * columns),
      y: Math.floor(Math.random() * rows),
    };

    function gameLoop() {
      // Move snake
      snake.unshift({ x: snake[0].x + velocityX, y: snake[0].y + velocityY });

      // Eat food
      if (snake[0].x === food.x && snake[0].y === food.y) {
        food = {
          x: Math.floor(Math.random() * columns),
          y: Math.floor(Math.random() * rows),
        };
      } else {
        snake.pop();
      }

      // Check collisions
      if (
        snake[0].x < 0 ||
        snake[0].x >= columns ||
        snake[0].y < 0 ||
        snake[0].y >= rows ||
        snake
          .slice(1)
          .some(
            (segment) => segment.x === snake[0].x && segment.y === snake[0].y
          )
      ) {
        // Reset game
        snake = [{ x: Math.floor(columns / 2), y: Math.floor(rows / 2) }];
        velocityX = 0;
        velocityY = 0;
      }

      const rootStyles = getComputedStyle(document.documentElement);

      // Draw background
      ctx.fillStyle = rootStyles.getPropertyValue("--color-white").trim();
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw food
      ctx.fillStyle = rootStyles.getPropertyValue("--color-black").trim();
      ctx.fillRect(food.x * scale, food.y * scale, scale, scale);

      // Draw snake
      ctx.fillStyle = rootStyles.getPropertyValue("--color-turquoise").trim();
      snake.forEach((segment) => {
        ctx.fillRect(
          segment.x * scale,
          segment.y * scale,
          scale - 2,
          scale - 2
        );
      });
    }

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (velocityY === 1) break;
          velocityX = 0;
          velocityY = -1;
          break;
        case "ArrowDown":
          if (velocityY === -1) break;
          velocityX = 0;
          velocityY = 1;
          break;
        case "ArrowLeft":
          if (velocityX === 1) break;
          velocityX = -1;
          velocityY = 0;
          break;
        case "ArrowRight":
          if (velocityX === -1) break;
          velocityX = 1;
          velocityY = 0;
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const intervalId = setInterval(gameLoop, 100);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white p-8">
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-100 shadow-sm">
        <div className="px-4 py-5 sm:px-6 font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl text-center">
          SLUG!!!
        </div>
        <div className="px-4 py-5 sm:p-6">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="border-5 border-gray-200 dark:border-gray-700 rounded-md bg-white"
          />
        </div>
        <div className="px-4 py-4 sm:px-6 text-lg text-gray-600 text-pretty text-center">
          Use keyboard to move the slug!
        </div>
      </div>
    </div>
  );
}
