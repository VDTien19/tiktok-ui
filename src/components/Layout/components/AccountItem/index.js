import classNames from "classnames/bind";
import styles from './AccountItem.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function AccountItem() {
    return ( 
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src="https://scontent.fhph2-1.fna.fbcdn.net/v/t39.30808-6/433135275_1450921095831335_5022358092751087662_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHIxA9Z89oOZCqUTZdL-_3uTtNRzzeO5KBO01HPN47koHoA2-EpSKqte3uZJ3XrU7fm8aRK6ByG0DXylA0ypezT&_nc_ohc=DO3J2N_lQlsQ7kNvgGlDVzo&_nc_ht=scontent.fhph2-1.fna&_nc_gid=AejWfiZJ-YGJJvVnUB99mOq&oh=00_AYBe1AiuqyFdvOD72-AlygnGYmhBRtYaTD2y1GFIp9PbvA&oe=670D725C" alt="Hoaa" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyễn Văn A</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;