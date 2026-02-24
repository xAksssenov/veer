import { useState, useEffect } from 'react';
import axios from 'axios';
import './SizesModal.css';

export default function SizesModal({ id, onClose, onAccept, sizesArray = [] }){
    const [activeSize, setActiveSize] = useState(null);
    
    useEffect(() => {
        const selectedFingerSizeFromLocal = localStorage.getItem('selected_finger_size_index');
        const index = selectedFingerSizeFromLocal !== null ? Number(selectedFingerSizeFromLocal) : null;

        if (index !== null && index >= 0 && index < sizesArray.length) setActiveSize(index);
        else {
            setActiveSize(null);
            localStorage.removeItem('selected_finger_size');
            localStorage.removeItem('selected_finger_size_index');
        }
    }, [sizesArray]);

    const onSelect = (index) => {
        if (index === activeSize) {
            localStorage.removeItem('selected_finger_size');
            localStorage.removeItem('selected_finger_size_index');
            setActiveSize(null);
        } else {
            localStorage.setItem('selected_finger_size_index', index);
            localStorage.setItem('selected_finger_size', sizesArray[index]);
            setActiveSize(index);
        }
    }

    return (
        <div className="sizes-modal" onClick={() => onClose()}>
            <div className="sizes-modal__content" onClick={(e) => e.stopPropagation()}>
                <button className='sizes-modal__close' onClick={() => onClose()}>x</button>
                <h2 className="sizes-modal__content-title">Выберите размер</h2>
                <div className="sizes-modal__content-size">
                    {sizesArray.map((size, index) => (
                        <button className={`sizes-modal__content-size--button ${index === activeSize ? 'active' : ''}`} key={index} onClick={() => onSelect(index)}>{size}</button>
                    ))}
                </div>
                <button className='sizes-modal__button--accept' onClick={() => onAccept()} disabled={activeSize == null}>Добавить в корзину</button>
            </div>
        </div>
    );
}