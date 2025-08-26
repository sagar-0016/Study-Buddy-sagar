
"use client";

import { useState, useRef, useEffect, MouseEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, CornerDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingPdfViewerProps {
  src: string;
  onClose: () => void;
}

const DraggableResizableDiv = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 600, height: 800 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const initialSize = useRef({ width: 0, height: 0 });
  const divRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleResizeStart = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsResizing(true);
    resizeStartPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
    initialSize.current = size;
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y,
      });
    }
    if (isResizing) {
      const dx = e.clientX - resizeStartPos.current.x;
      const dy = e.clientY - resizeStartPos.current.y;
      setSize({
        width: Math.max(300, initialSize.current.width + dx),
        height: Math.max(400, initialSize.current.height + dy),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  return (
    <div
      ref={divRef}
      className="fixed z-50 bg-card border shadow-2xl rounded-lg flex flex-col"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div className="flex items-center justify-between p-2 border-b" onMouseDown={handleDragStart}>
        <span className="font-semibold text-sm pl-2">PDF Viewer</span>
        <Button variant="ghost" size="icon" className="cursor-pointer" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-grow overflow-hidden">
        {children}
      </div>
      <button
        onMouseDown={handleResizeStart}
        className="absolute bottom-0 right-0 cursor-se-resize p-1 bg-muted rounded-tl-lg"
      >
        <CornerDownRight className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
};

export default function FloatingPdfViewer({ src, onClose }: FloatingPdfViewerProps) {
  return (
    <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm">
        <DraggableResizableDiv onClose={onClose}>
        <iframe
            src={src}
            className="w-full h-full"
            title="PDF Viewer"
        ></iframe>
        </DraggableResizableDiv>
    </div>
  );
}
