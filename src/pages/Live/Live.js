import { useEffect } from "react";

function Live() {
    useEffect(() => {
        document.title = 'Bảng tin trên TikTok LIVE';
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

export default Live;
