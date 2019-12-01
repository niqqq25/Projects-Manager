import React, { useContext } from 'react';
import './projectBar.css';

import Button from '../../../sharedComponents/Button/Button';
import { UserContext } from '../../../providers/UserProvider';

export default function ProjectBar({ project = {}, onProjectEdit }) {
    const { user } = useContext(UserContext);
    const isOwner = project.owner._id === user._id;

    return (
        <div id="project-bar">
            <div className="project-bar-left-side">
                <p id="project-name">
                    {project.title}
                    <span className="item-type">(Project)</span>
                </p>
            </div>
            <div className="project-bar-right-side">
                {isOwner && <Button value="Edit" onClick={onProjectEdit} />}
            </div>
        </div>
    );
}
