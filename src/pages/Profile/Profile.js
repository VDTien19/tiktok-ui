import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import ProfileHeader from "~/components/ProfileHeader";
import ProfileTab from "~/components/ProfileTab";
import CreatorVideo from "~/components/CreatorVideo";
import styles from './Profile.module.scss';
import { useEffect, useState } from "react";
import { getAnUser } from "~/services/userService";

const cx = classNames.bind(styles);
function Profile() {

    const { nickname } = useParams();

    const [userData, setUserData] = useState();
    const [tab, setTab] = useState('videos');

    // console.log("tab: " + tab)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await getAnUser(nickname);
                setUserData(res);
                document.title = `${res?.first_name} ${res?.last_name} (@${res?.nickname})`
            } catch(err) {
                console.log(err);
            }
        }
        fetchUserData();
    }, [nickname]);

    return (  
        <div className={cx('wrapper')}>
            <ProfileHeader data={userData} />
            <ProfileTab activeTab={tab} setTab={setTab} />
            <CreatorVideo data={userData} />
        </div>
    );
}

export default Profile;