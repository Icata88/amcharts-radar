import React, { useState } from 'react';

export const ProjectStateComponent = ({ 
    projectState,
    width, 
    height,
    triggerRadarChart,
    handleTriggerRadarChart
}) => {

    const [smallWidth, setSmallWidth] = useState(0);
    const [smallHeight, setSmallHeight] = useState(0);

    const mouseEnter = () => {
        handleTriggerRadarChart(true);
        setSmallWidth(width / 2.2);
        setSmallHeight(height / 2.2);
    }

    return (
        <div onMouseEnter={mouseEnter} className={`project-state-component ${triggerRadarChart ? 'radar-triggered' : ''}`} style={{ width: triggerRadarChart ? smallWidth : width, height: triggerRadarChart ? smallHeight : height }}>
            <div className='project-state-component__inner-circle' style={{ width: triggerRadarChart ? smallWidth - 10 : width - 20, height: triggerRadarChart ? smallHeight - 10 : height - 20, borderColor: projectState === 'stable' ? '#87E9FF' : '#FF4D4F'}}>
                <div>
                    <div className='project-state-component__project-is'>Project is</div>
                    <div className='project-state-component__stable'>{projectState === 'stable' ? 'stable' : 'at risk'}</div>
                </div>
            </div>
        </div>
    );
}