import { useEffect } from "react";
function Upload() {
    useEffect(() => {
        document.title = 'TikTok Studio';
    }, []);
    return ( 
        <div>
            <div className="content">
                <h2>Upload page</h2>
            </div>
        </div>
     );
}

export default Upload;