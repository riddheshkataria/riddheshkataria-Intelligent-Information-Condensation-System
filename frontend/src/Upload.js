import React, { useState } from 'react';
import './Upload.css';

const DOCUMENT_SOURCES = [
  'E-mail',
  'Maximo exports',
  'SharePoint repositories',
  'WhatsApp PDFs',
  'Hard-copy scans',
  'Ad-hoc cloud links',
];

export default function Upload({ onClose, onUpload }) {
  console.log('Upload modal opened. The onUpload prop is:', onUpload);
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [pastedText, setPastedText] = useState('');
  const [linkText, setLinkText] = useState('');

  const onFileChange = (e) => {
    console.log('File selected:', e.target.files[0]);
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    setFiles([...files, ...Array.from(e.dataTransfer.files)]);
  };
  
  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const toggleSource = (source) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter((s) => s !== source));
    } else {
      setSelectedSources([...selectedSources, source]);
    }
  };

  

  return (
    <div className="upload-backdrop">
      <div className="upload-popup">
        <button className="close-btn" onClick={() => onClose && onClose()}>
          ×
        </button>

        <h2 className="upload-title">Upload Documents</h2>

        <div
          className={`upload-dropzone ${dragOver ? 'drag-over' : ''}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <div className="upload-icon">&#8679;</div>
          <div className="upload-text">Drag and drop files here, or click to browse</div>
          <input
            type="file"
            className="file-input"
            multiple
            onChange={onFileChange}
          />
          <button
            type="button"
            className="browse-btn"
            onClick={() => document.querySelector('.file-input').click()}
          >
            Browse
          </button>
          {files.length > 0 && (
            <div className="file-list">
              {files.map((file, i) => (
                <div key={i} className="file-item">
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="upload-sources">
          <h3>Select Document Sources</h3>
          <div className="sources-list">
            {DOCUMENT_SOURCES.map((source) => (
              <button
                key={source}
                type="button"
                className={`source-btn ${
                  selectedSources.includes(source) ? 'selected' : ''
                }`}
                onClick={() => toggleSource(source)}
              >
                {source}
              </button>
            ))}
          </div>
        </div>

        <div className="extra-inputs">
          <div>
            <label htmlFor="pasted-text">Paste text:</label>
            <textarea
              id="pasted-text"
              rows={3}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste text here"
            />
          </div>
          <div>
            <label htmlFor="cloud-link">Ad-hoc Cloud Link:</label>
            <input
              id="cloud-link"
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="Paste cloud link here"
            />
          </div>
        </div>

        <button
        className="upload-btn"
        onClick={() => {
           console.log('Final Upload button clicked.');
            console.log('File to be uploaded:', files[0]);
            console.log('Calling the onUpload function passed from Dashboard...');
            if (files.length > 0) {
                const additionalData = {
                    sources: selectedSources,
                    pastedText: pastedText,
                    cloudLink: linkText,
                };
                onUpload(files[0], additionalData);
            }
            if (onClose) onClose();
        }}
        disabled={files.length === 0 && !pastedText && !linkText}
      >
        Upload
      </button>
      </div>
    </div>
  );
}
