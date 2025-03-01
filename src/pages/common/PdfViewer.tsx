import {Document, Page as PdfPage, pdfjs} from 'react-pdf';
import {useState} from 'react';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

interface PdfViewerProps {
    src?: string
}

export default function PdfViewer({src}: PdfViewerProps) {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        //'pdfjs-dist/build/pdf.worker.min.mjs',
        'pdfjs-dist/legacy/build/pdf.worker.min.js',
        import.meta.url,
    ).toString();

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({numPages}: { numPages: number }): void {
        setNumPages(numPages);
    }

    function previousPage(): void {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }
    function nextPage(): void {
        if (numPages && pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    }
    return (
        <div >
            <Document file={src} onLoadSuccess={onDocumentLoadSuccess} className="flex justify-center">
                <PdfPage pageNumber={pageNumber} scale={1} />
            </Document>
            <div className="flex justify-center mt-3">
                <div className="btn btn-sm bg-primary text-white" onClick={()=>previousPage()}>Previous</div>
                <div className="text-lg mx-3">{pageNumber} / {numPages}</div>
                <div className="btn btn-sm bg-primary text-white" onClick={()=>nextPage()}>Next</div>
            </div>
        </div>
    );
}
