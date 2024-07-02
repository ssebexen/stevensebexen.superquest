const [SIZE_MIN, SIZE_MAX] = [4, 16];
const [COLOR_MIN, COLOR_MAX] = [0, 255];

export type Pixel = [number, number, number, number];

export type Texture = {
  data: Pixel[];
};

export function textureSize(texture: Texture): number {
  return Math.sqrt(texture.data.length);
}

export function defaultTexture(): Texture {
  return {
    data: [
      ...Array(64).fill(0).map(x => [255, 255, 255, 1.0] as Pixel)
    ]
  };
}
export function rgbaAt(texture: Texture, index: number): string {
  const pixel = texture.data[index];
  return `rgba(${pixel.join(', ')})`;
}

export function validateTexture(texture: Texture): boolean {
  if (!texture.data.every(pixel => pixel.every(color => color <= COLOR_MAX && color >= COLOR_MIN
  ))) {
    return false;
  }

  const sizeGuess = Math.sqrt(texture.data.length);
  if (sizeGuess % 1 !== 0 || sizeGuess > SIZE_MAX || sizeGuess < SIZE_MIN) {
    return false;
  }

  return true;
}

export function hexToPixel(hex: string, alpha: number): Pixel {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5), 16);
  return [r, g, b, alpha];
}