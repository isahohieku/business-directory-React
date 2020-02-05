import React from 'react';
import '../landing-page/styles.scss';

export default function RenderLists(props) {
    return (
        <React.Fragment>
            <div className="list-items">
                <ul>

                    {(props.loading ? <li>Loading...</li> : '')}
                    {props.list.map(item => (
                        <li key={item.id} onClick={() => props.selected(item)}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
}