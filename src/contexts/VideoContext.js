import { useEffect, useContext, createContext, useState, useRef } from "react";

const VideoContext = createContext();

function useVideo() {
    return useContext(VideoContext);
}

function VideoProvider({ children }) {
    const [volume, setVolume] = useState(0);
    const [prevVolume, setPrevVolume] = useState(() => {
        const savedPreVolume = localStorage.getItem('preVolume');
        return savedPreVolume ? parseFloat(savedPreVolume) : 0.7;
    }); // Lưu giá trị volume trước đó
    const [isMute, setIsMute] = useState(true); // Trạng thái tắt tiếng (mặc định bật âm)

    const currentVideoRef = useRef(null);

    // Lưu prevVolume và trạng thái muted vào localStorage khi thay đổi
    useEffect(() => {
        localStorage.setItem("preVolume", prevVolume); // Lưu âm lượng trước đó
    }, [prevVolume]);

    // Xử lý thay đổi volume từ thanh trượt
    const handleChangeVolume = (e) => {
        const currentVolume = e.target.value; // Giá trị thanh trượt (0 - 100)
        const newVolume = currentVolume / 100; // Chuyển sang dạng 0.0 - 1.0
        setVolume(newVolume);

        if (newVolume === 0) {
            setIsMute(true); // Nếu kéo xuống 0 -> tắt tiếng
        } else {
            setIsMute(false); // Khác 0 -> bật tiếng
            setPrevVolume(newVolume);
        }
    };

    // Xử lý bật/tắt tiếng
    const toggleMute = () => {
        if (isMute) {
            // Nếu đang muted, khôi phục volume từ prevVolume
            if (prevVolume > 0) {
                setVolume(prevVolume);
                setIsMute(false);
            } else {
                // Nếu prevVolume = 0, giữ nguyên trạng thái muted
                setIsMute(true);
            }
        } else {
            // Nếu đang bật tiếng, lưu volume hiện tại vào prevVolume và mute
            setPrevVolume(volume > 0 ? volume : 0.7); // Lưu lại volume hoặc mặc định 0.7
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
