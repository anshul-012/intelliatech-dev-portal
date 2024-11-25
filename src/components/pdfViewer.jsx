import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pdfjs } from "pdfjs-dist";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = ({ pdfUrl }) => {
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	// const version = pdfjs.version
	return (
		<div style={{ height: "90vh", width:"100vw" }}>
			<Worker
				workerUrl="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
				// workerUrl={`https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.js`}
			>
				<Viewer
					fileUrl={pdfUrl}
					plugins={[defaultLayoutPluginInstance]}
				/>
			</Worker>
		</div>
	);
};

export default PdfViewer;
