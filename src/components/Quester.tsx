'use client'

export const PIXEL_DEFAULT = 25;

import { useEffect, useRef, useState } from "react";
import styles from './quester.module.sass';
import { validateTexture, textureSize, rgbaAt } from "../utils/texture";
import { Texture } from "../utils/texture";

interface QuesterEditProps {
  texture: Texture;
  pixelSize: number;
  onPixelClicked: (index: number) => void;
  mouseDown: boolean;
}
export function QuesterEdit(props: QuesterEditProps) {
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    setValid(validateTexture(props.texture));
  }, [props.texture]);

  const boxSize = props.pixelSize * textureSize(props.texture);

  return (
    <>
      {valid
        ? <div className={styles.quester + ' ' + styles.checkerboard} style={{width: boxSize, height: boxSize}}>
          {Array(props.texture.data.length).fill(0).map((_, i) =>
            <div
              key={i}
              className={styles.pixelEdit}
              style={{width: props.pixelSize, height: props.pixelSize, backgroundColor: rgbaAt(props.texture, i)}}
              onMouseMove={() => props.mouseDown && props.onPixelClicked(i)}
              onMouseDown={() => props.onPixelClicked(i)}
            />
          )}
        </div>
        : <></>
      }
    </>
  )
}
interface QuesterProps {
  texture: Texture;
  pixelSize: number;
}
export function Quester(props: QuesterProps) {
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
            <div
              key={i}
              style={{width: props.pixelSize, height: props.pixelSize, backgroundColor: rgbaAt(props.texture, i)}}
            />
          )}
        </div>
        : <></>
      }
    </>
  )
}