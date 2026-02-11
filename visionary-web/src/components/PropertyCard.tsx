"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Property } from '@/lib/nanoBanana';
import Image from 'next/image';

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [sliderPosition, setSliderPosition] = useState(50); // Percentage
    const [isResizing, setIsResizing] = useState(false);

    const handleStartResize = () => setIsResizing(true);
    const handleEndResize = useCallback(() => setIsResizing(false), []);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        let x = clientX - rect.left;

        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;

        const percent = (x / rect.width) * 100;
        setSliderPosition(percent);
    }, []);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (isResizing) handleMove(e.clientX);
        };
        const onTouchMove = (e: TouchEvent) => {
            if (isResizing && e.touches[0]) handleMove(e.touches[0].clientX);
        };
        const onMouseUp = () => handleEndResize();
        const onTouchEnd = () => handleEndResize();

        if (isResizing) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', onTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [isResizing, handleMove, handleEndResize]);

    return (
        <div className="property-card">
            <div className="property-header">
                <div>
                    <h2 className="property-title">{property.title}</h2>
                    <div className="property-location">{property.location}</div>
                </div>
                <div className="property-meta">
                    <div>{property.price}</div>
                    <div>{property.meta}</div>
                </div>
            </div>

            <div
                className="image-comparison"
                ref={containerRef}
                onMouseDown={handleStartResize}
                onTouchStart={handleStartResize}
            >
                <div className="image-after">
                    {/* Using simple img for flexibility with local/remote paths */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={property.afterImage} alt="Improved Vision" />
                    <div className="label label-after">VISION (NANO BANANA)</div>
                </div>
                <div
                    className="image-before"
                    style={{ width: `${sliderPosition}%` }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={property.beforeImage} alt="Existing Condition" />
                    <div className="label label-before">EXISTING</div>
                </div>
                <div
                    className="slider-handle"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="slider-button">↔</div>
                </div>
            </div>

            <div className="property-footer">
                <button className="btn btn-secondary">VIEW LISTING</button>
                <button className="btn btn-primary" onClick={() => alert('Architect Consultation Booked.')}>BOOK ARCHITECT</button>
            </div>
        </div>
    );
}
