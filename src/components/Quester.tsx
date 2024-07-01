'use client'

import { useEffect, useRef, useState } from "react";
import styles from './quester.module.sass';

const [SIZE_MIN, SIZE_MAX] = [4, 16];
const [COLOR_MIN, COLOR_MAX] = [0, 255];

type Pixel = [number, number, number]

export type Texture = {
  data: Pixel[];
}

function textureSize(texture: Texture): number {
  return Math.sqrt(texture.data.length);
}

function rgbAt(texture: Texture, index: number): string {
  const pixel = texture.data[index]
  return `rgb(${pixel.join(' ')})`;
}

function validateTexture(texture: Texture): boolean {
  if (!texture.data.every(pixel =>
    pixel.every(color => 
      color <= COLOR_MAX && color >= COLOR_MIN
  ))) {
    return false;
  }

  const sizeGuess = Math.sqrt(texture.data.length)
  if (sizeGuess % 1 !== 0 || sizeGuess > SIZE_MAX || sizeGuess < SIZE_MIN) {
    console.log(sizeGuess);
    return false;
  }

  return true;
}

interface QuesterProps {
  texture: Texture;
  pixelSize: number;
}
export default function Quester(props: QuesterProps) {
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    setValid(validateTexture(props.texture));
  }, [props.texture]);

  const boxSize = props.pixelSize * textureSize(props.texture);

  return (
    <>
      {valid
        ? <div className={styles.quester} style={{width: boxSize, height: boxSize}}>
          {Array(props.texture.data.length).fill(0).map((_, i) =>
            <div key={i} style={{width: props.pixelSize, height: props.pixelSize, backgroundColor: rgbAt(props.texture, i)}} />
          )}
        </div>
        : <></>
      }
    </>
  )
}
// interface QuesterProps {
//   texture: Texture;
//   canvasSize: number;
// }
// export default function Quester(props: QuesterProps) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const isTextureValid = validateTexture(props.texture);
//     if (!isTextureValid) {
//       console.log('Invalid texture.');
//     }
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;
//     ctx.lineWidth = 1;

//     canvas.width = props.canvasSize;
//     canvas.height = props.canvasSize;

//     const blockSize = props.canvasSize / Math.sqrt(props.texture.data.length);
//     for (const [k, v] of Object.entries(props.texture.data)) {
//       const i = parseInt(k);
//       const size = Math.sqrt(props.texture.data.length);
//       const x = i % size;
//       const y = Math.floor(i / size);

//       ctx.fillStyle = `rgb(${v.join(' ')})`;
//       ctx.strokeStyle = `rgb(${v.join(' ')})`;
//       ctx.beginPath();
//       ctx.rect(Math.round(x * blockSize), Math.round(y * blockSize), Math.round(blockSize), Math.round(blockSize));
//       ctx.fill();
//       ctx.stroke();
//       console.log(`Drawing color rgb(${v.join(' ')}) to position ${x * blockSize}, ${y * blockSize}.`);
//     }
//   }, [props.texture, props.canvasSize, canvasRef])

//   return (
//     <canvas ref={canvasRef} width={props.canvasSize} height={props.canvasSize} />
//   )
// }