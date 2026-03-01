"use client"

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
    const imageRef = useRef();
    const [pickedImage, setPickedImage] = useState();
    function handleClick() {
        imageRef.current.click();
    }

    function handleChange(e) {
        const file = e.target.files[0];

        if (!file){
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }

        fileReader.readAsDataURL(file);
    }

    return <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No image picked yet.</p>}
                {pickedImage && <Image src={pickedImage} alt="Image selected by user" fill />}
            </div>
            <input
                ref={imageRef}
                className={classes.input}
                type="file"
                id={name}
                accept="image/png, image/jpeg"
                name={name}
                onChange={handleChange}
                required
            />
            <button className={classes.button}
                type="button"
                onClick={handleClick}
            >
                Pick an image
            </button>
        </div>
    </div>
}