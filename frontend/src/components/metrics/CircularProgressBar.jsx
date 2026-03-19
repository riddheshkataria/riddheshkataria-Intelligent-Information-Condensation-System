import React, { memo } from 'react';

const CircularProgressBar = memo(({ percentage }) => {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="progress-container">
            <svg className="progress-ring" width="140" height="140">
                <circle className="progress-ring-bg" r={radius} cx="70" cy="70" />
                <circle
                    className="progress-ring-fg"
                    r={radius}
                    cx="70"
                    cy="70"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
                <text x="70" y="70" className="progress-text" transform="rotate(90 70,70)">
                    {`${percentage}%`}
                </text>
            </svg>
            <p className="progress-label">Tasks Completed</p>
        </div>
    );
});

CircularProgressBar.displayName = 'CircularProgressBar';
export default CircularProgressBar;
