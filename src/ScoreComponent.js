import React from 'react';

export const ScoreComponent = ({ 
    score, 
    category,
    width, 
    height
}) => {

    return (
        <div className='score-component' style={{ width: width, height: height, background: score >= 4 ? '#1890FF' : '#FF7875' }}>
            <div>
                <div className='score-component__category'>{category}</div>
                <div className='score-component__score'>{Number(score).toFixed(1)}</div>                    
            </div>
        </div>
    );
}