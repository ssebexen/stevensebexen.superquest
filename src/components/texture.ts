const [SIZE_MIN, SIZE_MAX] = [4, 16];
const [COLOR_MIN, COLOR_MAX] = [0, 255];

export function textureSize(texture: Texture): number {
  return Math.sqrt(texture.data.length);
}

export function defaultTexture(): Texture {
  return {
    data: [
      ...Array(64).fill(0).map(x => [255, 255, 255] as Pixel)
    ]
  };
}
export function rgbAt(texture: Texture, index: number): string {
  const pixel = texture.data[index];
  return `rgb(${pixel.join(' ')})`;
}

export function validateTexture(texture: Texture): boolean {
  if (!texture.data.every(pixel => pixel.every(color => color <= COLOR_MAX && color >= COLOR_MIN
  ))) {
    return false;
  }

  const sizeGuess = Math.sqrt(texture.data.length);
  if (sizeGuess % 1 !== 0 || sizeGuess > SIZE_MAX || sizeGuess < SIZE_MIN) {
    console.log(sizeGuess);
    return false;
  }

  return true;
}export type Pixel = [number, number, number];

export type Texture = {
  data: Pixel[];
};

