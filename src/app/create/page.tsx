'use client'

import NavBar from "~/components/NavBar";
import styles from './page.module.sass';
import { PIXEL_DEFAULT, QuesterEdit } from "~/components/Quester";
import { Texture, hexToPixel, defaultTexture } from "~/utils/texture";
import { ChangeEvent, useRef, useState } from "react";
import { createQuester } from "../serverFunctions";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import PencilSVG from '~/../public/pencil.svg';
import EraserSVG from '~/../public/eraser.svg';
import ProtectedRoute from "~/components/ProtectedRoute";
import firebase from "../firebase";

interface ColorPickerProps {
  onColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
  color: string;
}
function ColorPicker(props: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className={styles.toolbarItem} onClick={() => inputRef.current?.click()}>
        <div className={styles.colorPicker} style={{backgroundColor: props.color}} />
      </div>
      <input className={styles.hiddenInput} type='color' ref={inputRef} onChange={props.onColorChange} value={props.color} />
    </>
  )
}

interface PencilToolProps {
  activeTool: string;
  toolName: string;
  onSelected: () => void;
}
function PencilTool (props: PencilToolProps) {
  return (
    <div className={styles.toolbarItem} onClick={props.onSelected}>
      <PencilSVG className={props.activeTool === props.toolName ? styles.active : ''}/>
    </div>
  )
}

interface EraserToolProps {
  activeTool: string;
  toolName: string;
  onSelected: () => void;
}
function EraserTool (props: EraserToolProps) {
  return (
    <div className={styles.toolbarItem} onClick={props.onSelected}>
      <EraserSVG className={props.activeTool === props.toolName ? styles.active : ''}/>
    </div>
  )
}

export default function Create() {
  const [texture, setTexture] = useState<Texture>(defaultTexture());
  const [color, setColor] = useState<string>('#1a1a1a');
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const [activeTool, setActiveTool] = useState<string>('pencil');

  function onPixelClicked(index: number) {
    switch (activeTool) {
      case "pencil": {
        const data = texture.data.with(index, hexToPixel(color, 1));
        const texture0 = {
          data
        };

        setTexture(texture0);
        break;
      }
    
      case "eraser": {
        const data = texture.data.with(index, [0, 0, 0, 0])
        const texture0 = {
          data
        };

        setTexture(texture0);
        break;
      }
    }
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
    <ProtectedRoute>
      <main onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)} >
        <NavBar />
        <div className={styles.editFrame}>
          <QuesterEdit texture={texture} pixelSize={PIXEL_DEFAULT} onPixelClicked={onPixelClicked} mouseDown={mouseDown} />
          <div className={styles.toolbar}>
            <PencilTool activeTool={activeTool} toolName="pencil" onSelected={() => setActiveTool('pencil')}/>
            <EraserTool activeTool={activeTool} toolName="eraser" onSelected={() => setActiveTool('eraser')}/>
            <ColorPicker onColorChange={onColorChange} color={color} />
          </div>
          <p className={styles.done} onClick={done}>Create Quester</p>
        </div>
        <p>{error}</p>
      </main>
    </ProtectedRoute>
  )
}