'use client'

import NavBar from "~/components/NavBar";
import styles from './page.module.sass';
import AuthRedirect from "~/components/AuthRedirect";
import { PIXEL_DEFAULT, QuesterEdit } from "~/components/Quester";
import { Pixel, Texture } from "~/components/texture";
import { defaultTexture } from "~/components/texture";
import { ChangeEvent, MutableRefObject, useRef, useState } from "react";
import { createQuester } from "../serverFunctions";
import { getAuth } from "firebase/auth";
import firebase from "../firebase";
import { useRouter } from "next/navigation";

interface ColorPickerProps {
  onColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  color: string;
}
function ColorPicker(props: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className={styles.colorPickerOuter} onClick={() => inputRef.current?.click()}>
        <div className={styles.colorPickerInner} style={{backgroundColor: props.color}} />
      </div>
      <input className={styles.hiddenInput} type='color' ref={inputRef} onChange={props.onColorChange} value={props.color} />
    </>
  )
}

export default function Create() {
  const [texture, setTexture] = useState<Texture>(defaultTexture());
  const [color, setColor] = useState<string>('#1a1a1a');
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  function onPixelClicked(index: number) {
    function hexToPixel(hex: string): Pixel {
      const r = parseInt(hex.slice(1,3), 16);
      const g = parseInt(hex.slice(3,5), 16);
      const b = parseInt(hex.slice(5), 16);
      return [r, g, b];
    }
    const data = texture.data.with(index, hexToPixel(color));
    const texture0 = {
      data
    };

    setTexture(texture0);
  }

  function onColorChange(e: ChangeEvent<HTMLInputElement>) {
    setColor(e.target.value);
  }

  async function done() {
    setError('');
    const firebaseToken = await getAuth(firebase).currentUser?.getIdToken();
    if (!firebaseToken) {
      setError('NoTokenError');
      return;
    }

    const result = await createQuester(firebaseToken, texture);
    if (result.type !== 'Success') {
      setError(result.type);
      return;
    }

    router.push('/view');
  }
  
  return (
    <main className={styles.main} onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)} >
      <AuthRedirect />
      <NavBar />
      <div className={styles.editFrame}>
        <QuesterEdit texture={texture} pixelSize={PIXEL_DEFAULT} onPixelClicked={onPixelClicked} mouseDown={mouseDown} />
        <ColorPicker onColorChange={onColorChange} color={color} />
        <p className={styles.done} onClick={done}>Create Quester</p>
      </div>
      <p>{error}</p>
    </main>
  )
}