import React from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdf2 from '../pdf/ସମ୍ବାଦ_ଭୁବନେଶ୍ୱର_09-07-2024.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pages = React.forwardRef((props, ref) => {
    return (
        <div className="demoPage" ref={ref}>
            <p>{props.children}</p>
            <p className="text-center text-gray-600 text-sm mt-2">Page number: {props.number}</p>
        </div>
    );
});

Pages.displayName = 'Pages';

function Flipbook() {
    const [numPages, setNumPages] = useState();
    const flipBook = useRef(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const nextButton = () => {
        flipBook.current.pageFlip().flipNext();
    };

    const prevButton = () => {
        flipBook.current.pageFlip().flipPrev();
    };

    return (
        <>
            <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 ">
                <h1 className="text-4xl text-white text-center font-bold mt-10">PragatiPathe</h1>
                <div className="relative w-full max-w-4xl p-5 bg-white shadow-xl rounded-lg mb-12">
                    <HTMLFlipBook width={400} height={610} ref={flipBook} className="mx-auto shadow-2xl">
                        {[...Array(numPages).keys()].map((pNum) => (
                            <Pages key={pNum} number={pNum + 1}>
                                <Document file={pdf2} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pNum + 1} width={400} renderAnnotationLayer={false} renderTextLayer={false} />
                                </Document>
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
                </div>
            </div>
        </>
    );
}

export default Flipbook;
