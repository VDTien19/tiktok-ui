import VideoList from "~/components/VideoList";

function Home() {
    document.title = 'TikTok - Make Your Day'
    return (
        <>
            <VideoList />
        </>
    );
}

export default Home;