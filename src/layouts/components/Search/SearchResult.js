import React from 'react'
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from "~/components/Popper";
import AccountItem from "~/components/AccountItem";
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function SearchResult({ searchResult }) {
    return (
        <div className={cx('search-result')} tabIndex="-1">
            <PopperWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                {searchResult.map((result) => (
                    <AccountItem key={result.id} data={result} />
                ))}
            </PopperWrapper>
        </div>
    );
}

export default React.memo(SearchResult);