
"use client";

import { useState, useRef, useEffect, MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { X, CornerDownRight, Loader2, Minus, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

// Configure pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


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
    if ((e.target as HTMLElement).classList.contains('drag-handle')) {
        setIsDragging(true);
        dragStartPos.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    }
  };

  const handleResizeStart = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsResizing(true);
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    initialSize.current = size;
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
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
    
    const handleGlobalMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
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
        minWidth: '300px',
        minHeight: '400px'
      }}
    >
      <div className="drag-handle flex items-center justify-between p-1 border-b cursor-grab bg-muted/50 rounded-t-lg" onMouseDown={handleDragStart}>
        <span className="font-semibold text-sm pl-2 drag-handle">PDF Viewer</span>
        <Button variant="ghost" size="icon" className="cursor-pointer h-8 w-8" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-grow overflow-auto">
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
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5);
  const { toast } = useToast();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onDocumentLoadError(error: Error) {
    toast({
        title: "PDF Load Error",
        description: `Failed to load PDF: ${error.message}`,
        variant: "destructive",
    })
    console.error('Error while loading document!', error);
  }

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages || 1));
  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  const loadingSkeleton = (
    <div className='p-4 space-y-2'>
        <Skeleton className='h-8 w-full'/>
        <Skeleton className='h-[70vh] w-full'/>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm">
        <DraggableResizableDiv onClose={onClose}>
            <div className="flex-shrink-0 sticky top-0 z-10 p-1 bg-background/80 backdrop-blur-sm border-b flex items-center justify-center gap-2">
                <Button variant="ghost" size="icon" onClick={goToPrevPage} disabled={pageNumber <= 1}>
                    <ArrowLeft />
                </Button>
                <span>Page {pageNumber} of {numPages || '...'}</span>
                <Button variant="ghost" size="icon" onClick={goToNextPage} disabled={!numPages || pageNumber >= numPages}>
                    <ArrowRight />
                </Button>
                <div className="w-px h-6 bg-border mx-2"></div>
                 <Button variant="ghost" size="icon" onClick={zoomOut} disabled={scale <= 0.5}>
                    <Minus />
                </Button>
                <span>{Math.round(scale * 100)}%</span>
                <Button variant="ghost" size="icon" onClick={zoomIn} disabled={scale >= 3}>
                    <Plus />
                </Button>
            </div>
            <div className="p-4 flex justify-center bg-muted/20">
                <Document
                    file={src}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={loadingSkeleton}
                    className="flex justify-center"
                >
                    <Page pageNumber={pageNumber} scale={scale} renderTextLayer={true} />
                </Document>
            </div>
        </DraggableResizableDiv>
    </div>
  );
}
