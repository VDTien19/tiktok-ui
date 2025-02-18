import { useEffect } from "react";

function Following() {
    useEffect(() => {
        document.title = 'Đang follow - Xem video từ những nhà sáng tạo mà bạn follow | TikTok';
    }, []);
    return (  
        <h1
            style={{
                width: '100%',
                height: '100vh',
                fontSize: '4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // paddingLeft: '12rem',
            }}
        >
            Coming soon
        </h1>
    );
}

export default Following;