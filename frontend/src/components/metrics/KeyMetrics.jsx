import React, { memo } from 'react';
import { DeadlineIcon, DocumentIcon, OverdueIcon } from '../icons/Icons';

const KeyMetrics = memo(({ overdue, upcoming, totalDocs }) => (
    <div className="metrics-grid">
        <div className="metric-card overdue">
            <div className="metric-icon" aria-hidden="true"><OverdueIcon /></div>
            <div className="metric-details">
                <div className="metric-value">{overdue}</div>
                <div className="metric-label">Overdue Tasks</div>
            </div>
        </div>
        <div className="metric-card upcoming">
            <div className="metric-icon" aria-hidden="true"><DeadlineIcon /></div>
            <div className="metric-details">
                <div className="metric-value">{upcoming}</div>
                <div className="metric-label">Upcoming Deadlines (7d)</div>
            </div>
        </div>
        <div className="metric-card documents">
            <div className="metric-icon" aria-hidden="true"><DocumentIcon /></div>
            <div className="metric-details">
                <div className="metric-value">{totalDocs}</div>
                <div className="metric-label">Total Documents</div>
            </div>
        </div>
    </div>
));

KeyMetrics.displayName = 'KeyMetrics';
export default KeyMetrics;
