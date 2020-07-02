import React from 'react'
import './RankingText.css'


const RankingText = (props) => {

    const { name, entries } = props.user;

    return (
        <div className='rankingText'>
            <h3>{`Hey ${name}, you have requested #${(entries === undefined) ? 0 : entries} detections`}</h3>
        </div>
    )
}

export default RankingText