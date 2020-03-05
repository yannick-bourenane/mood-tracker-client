import React from 'react';
import { Link } from "react-router-dom";

const DashLink = ({title, page, classN}) => {
    return (
        <div className={`dashlink-wrapper shadow ${classN}`}>
            <Link to={page}>
                <div className="dashlink flex-center-column">
                    {title}
                </div>
            </Link>
        </div>
    )
}

export default DashLink
