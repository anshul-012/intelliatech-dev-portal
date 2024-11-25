import React, { useRef, useState } from "react";
import "../styles/resumeButton.css";
import PdfViewer from "./pdfViewer";

const ResumePopup = ({ url, setIsOpen }) => {
  const bgRef = useRef();
  const [isPdfOpen, setIsPdfOpen] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(true);

  const closePopupWhileClickOnBg = (e) => {
    if (bgRef.current === e.target) setIsOpen(false);
  };

  const toggleViewHandler = () => {
    setIsPdfOpen((prev) => !prev);
    setIsImageOpen((prev) => !prev);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isPdf = url?.endsWith('.pdf');
  const isImage = /\.(jpg|jpeg|png)$/i.test(url);

  return (
    <div
      onClick={closePopupWhileClickOnBg}
      ref={bgRef}
      className="resume-bg"
    >
      <div className="center-div">
        {isPdf ? (
          <>

            <button className="pop-btn"
              onClick={() => {

                fetch(url)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
                    return response.blob();
                  })
                  .then(blob => {
                    const downloadUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = 'resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(downloadUrl);
                  })
                  .catch(error => console.error('Download failed:', error));

              }}
            >Download PDF</button>

            <button className="pop-btn" onClick={() => { setIsOpen((prev) => !prev) }}>
              {!isPdfOpen ? "View PDF" : "Close View"}
            </button>
            {isPdfOpen && <PdfViewer pdfUrl={url} />}
          </>
        ) : isImage ? (
          <>
            {/* <a href={url} target="_blank" rel="noopener noreferrer" download={url.split('/').pop()}>
              <button>Download Image</button>
            </a> */}
            <button onClick={toggleViewHandler}>
              {!isImageOpen ? "View Image" : "Close Image"}
            </button>
            {isImageOpen && (
              <div className="image-viewer">
                <img src={url} alt="Resume" />
              </div>
            )}
          </>
        ) : (
          <button onClick={handleDownload}>Download File</button>
        )}
      </div>
    </div>
  );
};

export default ResumePopup;





