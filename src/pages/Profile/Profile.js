import { useParams } from "react-router-dom";
import classNames from "classnames/bind";

import { useAuth } from "~/contexts/AuthContext";
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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await getAnUser(nickname);
                setUserData(res);
            } catch(err) {
                console.log(err);
            }
        }
        fetchUserData();
    }, [nickname]);

    // const { userData } = useAuth();
    // console.log("userData", userData);
    // const owner = userData?.nickname === nickname.slice(1);
    // console.log("owner", owner);
    return (  
        <div className={cx('wrapper')}>
            <ProfileHeader data={userData} />
            <ProfileTab />
            <CreatorVideo data={userData} />
        </div>
    );
}

export default Profile;