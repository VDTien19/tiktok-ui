import { useContext, createContext, useState, useRef } from "react";

const VideoContext = createContext();

function useVideo() {
    return useContext(VideoContext);
}

function VideoProvider({ children }) {
    const [volume, setVolume] = useState(0.7); // Volume mặc định là 70% (0.7)
    const [prevVolume, setPrevVolume] = useState(0.7); // Lưu giá trị volume trước đó
    const [isMute, setIsMute] = useState(false); // Trạng thái tắt tiếng (mặc định bật âm)

    const currentVideoRef = useRef(null);

    // Xử lý thay đổi volume từ thanh trượt
    const handleChangeVolume = (e) => {
        const currentVolume = e.target.value; // Giá trị thanh trượt (0 - 100)
        const newVolume = currentVolume / 100; // Chuyển sang dạng 0.0 - 1.0
        setVolume(newVolume);

        if (newVolume === 0) {
            setIsMute(true); // Nếu kéo xuống 0 -> tắt tiếng
        } else {
            setIsMute(false); // Khác 0 -> bật tiếng
        }
    };

    // Xử lý bật/tắt tiếng
    const toggleMute = () => {
        if (isMute) {
            setVolume(prevVolume); // Nếu đang tắt, khôi phục volume trước đó
            setIsMute(false);
        } else {
            setPrevVolume(volume); // Lưu giá trị volume hiện tại
            setVolume(0); // Đặt volume về 0
            setIsMute(true);
        }
    };

    // Xử lý logic khi phát một video
    const handlePlay = (videoRef) => {
        if(currentVideoRef.current && currentVideoRef.current !== videoRef) {
            currentVideoRef.current.pause(); // Tạm dừng video trước đó
        }

        // Cập nhật video hiện tại
        currentVideoRef.current = videoRef;
    }

    const value = {
        volume,
        isMute,
        handleChangeVolume,
        toggleMute,
        handlePlay
    };

    return (
        <VideoContext.Provider value={value}>
            {children}
        </VideoContext.Provider>
    );
}

export { useVideo, VideoProvider };
