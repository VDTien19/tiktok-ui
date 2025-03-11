import { useRef, useState } from "react";
import classNames from "classnames/bind";
import { toast } from "react-hot-toast";

import styles from './ViewUpload.module.scss';
import { UploadIcon } from "~/components/Icons";
import Button from "~/components/Button";

const cx = classNames.bind(styles);
function ViewUpload({ onFileSelect }) {

    const [isDragging, setIsDragging] = useState(false);

    const inputRef = useRef(null);

    const handleFileInput = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("video/")) {
            onFileSelect(file);
        } else {
            toast('Tệp không đúng định dạng.', {
                position: 'top-center',
                duration: 3000,
                style: {
                    backgroundColor: 'rgba(25, 25, 25, 0.8)',
                    color: '#fff',
                    fontWeight: 'italic',
                    width: '100%',
                },
                iconTheme: {
                    display: 'none',
                },
            });
        }
    }

    const handleDropVideo = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("video/")) {
            onFileSelect(file);
        } else {
            toast('Tệp không đúng định dạng.', {
                position: 'top-center',
                duration: 3000,
                style: {
                    backgroundColor: 'rgba(25, 25, 25, 0.8)',
                    color: '#fff',
                    fontWeight: 'italic',
                    width: '100%',
                },
                iconTheme: {
                    display: 'none',
                },
            });
        }
    }

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container', { active: isDragging })} 
                 onClick={() => inputRef.current.click()}
                //  onDragOver={(e) => e.preventDefault()}
                 onDrop={handleDropVideo}
                 onDragEnter={handleDragEnter}
                 onDragOver={handleDragOver}
                 onDragLeave={handleDragLeave}
            >
                <span><UploadIcon width='5rem' height="5rem" /></span>
                <span className={cx('info')}>Select video to upload</span>
                <span className={cx('info')}>Or drag and drop a file</span>
                <span className={cx('info')}>Long videos can be split into multiple parts to get more exposure</span>
                <span className={cx('note')}>MP4 or WebM</span>
                <span className={cx('note')}>720x1280 resolution or higher</span>
                <span className={cx('note')}>Up to 30 minutes</span>
                <span className={cx('note')}>Less than 2 GB</span>
                <Button className={cx('upload-btn')} primary>Select file</Button>
                <input
                    ref={inputRef}
                    id="fileInput"
                    type="file"
                    accept="video/mp4,video/webm"
                    style={{ display: "none" }}
                    onChange={handleFileInput}
                />
            </div>
        </div>
    );
}

export default ViewUpload;