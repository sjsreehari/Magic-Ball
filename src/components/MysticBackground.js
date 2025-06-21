import React, { useEffect, useRef } from 'react';
import './MysticBackground.css';

const NUM_STARS = 80;
const NUM_CONSTELLATION_STARS = 7;

function randomStar() {
  return {
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.2 + 0.7,
    opacity: Math.random() * 0.5 + 0.5,
    twinkle: Math.random() * 2 + 1,
  };
}

function randomConstellation() {
  return Array.from({ length: NUM_CONSTELLATION_STARS }, () => ({
    x: Math.random(),
    y: Math.random(),
  }));
}

const MysticBackground = () => {
  const canvasRef = useRef();
  const constellation = useRef(randomConstellation());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = Array.from({ length: NUM_STARS }, randomStar);
    let animation;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      // Draw stars
      stars.forEach((star, i) => {
        ctx.save();
        ctx.globalAlpha = star.opacity * (0.7 + 0.3 * Math.sin(Date.now() / (1200 * star.twinkle) + i));
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.r, 0, 2 * Math.PI);
        ctx.fillStyle = '#fffbe6';
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });
      // Draw constellation
      const points = constellation.current;
      ctx.save();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      points.forEach((pt, i) => {
        const px = pt.x * width;
        const py = pt.y * height;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
      // Draw constellation stars
      points.forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x * width, pt.y * height, 2.7, 0, 2 * Math.PI);
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 12;
        ctx.fill();
      });
      ctx.restore();
      animation = requestAnimationFrame(draw);
    }
    draw();
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="mystic-bg-canvas" aria-hidden="true" />
  );
};

export default MysticBackground; 