import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

export default function RenderLists(props) {
    return (
        <React.Fragment>
            <div className="list-items">
                <ul>

                        {(props.loading ? <li>Loading...</li> : '' )}
                    {props.list.map(item => (
                        <li key={item.id}><Link to={`/business/${item.id}`}>{item.name}</Link></li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
}