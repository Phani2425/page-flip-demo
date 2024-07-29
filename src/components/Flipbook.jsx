import React, { useState, useRef, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import pdf2 from '../pdf/ସମ୍ବାଦ_ଭୁବନେଶ୍ୱର_09-07-2024.pdf';
import { FaSearchPlus, FaSearchMinus } from 'react-icons/fa'; // Magnifier icons

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pages = React.forwardRef((props, ref) => (
    <div className="demoPage" ref={ref}>
        {props.children}
        <p className="text-center text-gray-600 text-sm mt-2">Page number: {props.number}</p>
    </div>
));

Pages.displayName = 'Pages';

function Flipbook() {
    const [numPages, setNumPages] = useState(null);
    const [scale, setScale] = useState(1); // State to manage zoom level
    const [isZooming, setIsZooming] = useState(false); // Flag to track zoom status
    const flipBook = useRef(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function onDocumentLoadError(error) {
        console.error('Error loading document:', error);
    }

    const nextButton = () => {
        if (!isZooming && flipBook.current) {
            flipBook.current.pageFlip().flipNext();
        }
    };

    const prevButton = () => {
        if (!isZooming && flipBook.current) {
            flipBook.current.pageFlip().flipPrev();
        }
    };

    const zoomIn = () => {
        setScale(prevScale => prevScale + 0.1);
        setIsZooming(true);
        setTimeout(() => setIsZooming(false), 1000); // Reset zooming state after 1 second
    };

    const zoomOut = () => {
        setScale(prevScale => (prevScale > 0.1 ? prevScale - 0.1 : 0.1));
        setIsZooming(true);
        setTimeout(() => setIsZooming(false), 1000); // Reset zooming state after 1 second
    };

    const handleTouchStart = useCallback((event) => {
        if (isZooming) {
            event.stopPropagation(); // Prevent touch events from propagating if zooming
        }
    }, [isZooming]);

    const handleTouchEnd = () => {
        setIsZooming(false);
    };

    return (
        <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900">
            <h1 className="text-4xl text-white text-center font-bold mt-10">PragatiPathe</h1>
            <div className="relative w-full max-w-4xl p-5 bg-white shadow-xl rounded-lg mb-12">
                <HTMLFlipBook width={400} height={610} ref={flipBook} className="mx-auto shadow-2xl">
                    {[...Array(numPages).keys()].map((pNum) => (
                        <Pages key={pNum} number={pNum + 1}>
                            <div
                                style={{ transform: `scale(${scale})`, transformOrigin: 'center', width: '100%', height: '100%' }}
                                className="pdf-container"
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                            >
                                <Document file={pdf2} onLoadSuccess={onDocumentLoadSuccess} onLoadError={onDocumentLoadError}>
                                    <Page pageNumber={pNum + 1} width={400} renderAnnotationLayer={false} renderTextLayer={false} />
                                </Document>
                            </div>
                        </Pages>
                    ))}
                </HTMLFlipBook>
                <button
                    onClick={prevButton}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-l-lg hover:bg-gray-700"
                >
                    Prev
                </button>
                <button
                    onClick={nextButton}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-r-lg hover:bg-gray-700"
                >
                    Next
                </button>
                <button
                    onClick={zoomIn}
                    className="absolute left-4 bottom-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 flex items-center justify-center"
                >
                    <FaSearchPlus className="text-xl" />
                </button>
                <button
                    onClick={zoomOut}
                    className="absolute right-4 bottom-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 flex items-center justify-center"
                >
                    <FaSearchMinus className="text-xl" />
                </button>
            </div>
        </div>
    );
}

export default Flipbook;
