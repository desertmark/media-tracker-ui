import React from 'react';
import './gallery.css';

export default function Gallery({ children, colSize }) {
    return (
        <div className="gallery" style={{ gridTemplateColumns: `repeat(auto-fill, ${colSize})` }}>
            {children}
        </div>
    );
}