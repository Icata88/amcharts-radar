import React, { useState } from 'react';
import { RadarChart } from './RadarChart';
import { ScoreComponent } from './ScoreComponent';
import { ProjectStateComponent } from './ProjectStateComponent';
import { BarChart } from './BarChart';
import './App.scss';

const App = () => {

  const [score, setScore] = useState(0);
  const [category, setCategory] = useState('');
  const [triggerRadarChart, setTriggerRadarChart] = useState(false);
  const [triggerScore, setTriggerScore] = useState(false);

  const updateScore = (value) => {
    setScore(value);
  }

  const updateCategory = (value) => {
    setCategory(value);
  }

  const handleTriggerRadarChart = (value) => {
    setTriggerRadarChart(value);
  }

  return (
    <div className='App'>
      <div className='radar-chart-wrapper'>
        <ProjectStateComponent 
          width={212} 
          height={212} 
          projectState='stable'
          triggerRadarChart={triggerRadarChart}
          handleTriggerRadarChart={handleTriggerRadarChart}
        />
        {triggerScore &&
          <ScoreComponent 
            category={category} 
            score={score} 
            width={96} 
            height={96}
          />
        }
        <RadarChart 
          chartID='radar-chart' 
          triggerRadarChart={triggerRadarChart}
          updateScore={updateScore}
          updateCategory={updateCategory}
          setTriggerScore={setTriggerScore}
          handleTriggerRadarChart={handleTriggerRadarChart}
        />
      </div>
      <div className='bar-chart-wrapper'>
        <BarChart chartID='bar-chart' />
      </div>
    </div>
  );
}
export default App;