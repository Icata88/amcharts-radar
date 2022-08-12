import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5radar from '@amcharts/amcharts5/radar';
import * as am5xy from '@amcharts/amcharts5/xy';

const data = [{
    "category": "Schedule",
    "score": 5.5,
    'strokeSettings': {
        'stroke': am5.color('#FF7875')
    }
}, {
    "category": "Budget",
    "score": 6.8
}, {
    "category": "Quality",
    "score": 4.4
}, {
    "category": "Responsiveness",
    "score": 4
}, {
    "category": "Accuracy",
    "score": 5.5
}, {
    "category": "Helpfulness",
    "score": 6.8
}, {
    "category": "Creativity",
    "score": 3.3
}, {
    "category": "Scope & Fees",
    "score": 4
}];

export const RadarChart = ({ 
    chartID,
    triggerRadarChart,
    updateScore,
    updateCategory,
    handleTriggerRadarChart,
    setTriggerScore
 }) => {
  
    useLayoutEffect(() => {
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new(chartID);

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([am5themes_Animated.new(root)]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/radar-chart/
        const chart = root.container.children.push(
            am5radar.RadarChart.new(root, {
                panX: false,
                panY: false,
                wheelX: 'panX',
                wheelY: 'zoomX'
            })
        );

        const cursor = chart.set('cursor', am5radar.RadarCursor.new(root, {
            behavior: 'zoomX'
        }));

        cursor.lineY.set('visible', false);
        cursor.lineX.set('visible', false);

        const xRenderer = am5radar.AxisRendererCircular.new(root, {});

        xRenderer.labels.template.setAll({
            radius: 10
        });

        const xTooltip = am5.Tooltip.new(root, {});

        xTooltip.get('background').setAll({
            fillOpacity: 0,
            strokeOpacity: 0
        });

        xTooltip.label.setAll({
            opacity: 0
        });

        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0,
            categoryField: 'category',
            renderer: xRenderer,
            tooltip: xTooltip
        }));

        xAxis.hide();

        const yTooltip = am5.Tooltip.new(root, {
            getFillFromSprite: false,
            labelText: '{valueY}'
        });

        yTooltip.get('background').setAll({
            fillOpacity: 0,
            strokeOpacity: 0
        });

        yTooltip.label.setAll({
            opacity: 0
        });

        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5radar.AxisRendererRadial.new(root, {
                minGridDistance: 20
            }),
            numberFormat: "#.0",
            min: 1,
            max: 7,
            strictMinMax: true
        }));

        yAxis.get('renderer').labels.template.setAll({
            fontSize: 10,
            fontWeight: '700'
        });

        const series = chart.series.push(am5radar.RadarLineSeries.new(root, {
            name: 'Series',
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: 'score',
            categoryXField: 'category',
            stroke: am5.color('#1890FF'),
            tooltip: yTooltip,
            maskBullets: false
        }));

        series.strokes.template.setAll({
            strokeWidth: 2,
            opacity: 0.5,
            fillGradient: am5.LinearGradient.new(root, {
                stops: [{
                    color: am5.color('#745CFF')
                }, {
                    color: am5.color('#FF7875')
                }],
            })
        });

        series.bullets.push((root, series, dataItem) => {
            return am5.Bullet.new(root, {
                sprite: am5.Circle.new(root, {
                    radius: 8,
                    fill: dataItem.get('valueY') >= 4 ? am5.color('#1890FF') : am5.color('#FF7875')
                })
            })
        });


        cursor.events.on('cursormoved', () => {
            const scoreValue = yTooltip.label.getText();
            const categoryValue = xTooltip.label.getText();
            setTriggerScore(true);
            updateScore(scoreValue);
            updateCategory(categoryValue);
        });

        cursor.events.on('cursorhidden', () => {
            handleTriggerRadarChart(false);
            setTriggerScore(false);
        });

        // Set data
        // https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
        series.data.setAll(data);
        xAxis.data.setAll(data);
        
        
        // Animate chart and series in
        // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
        series.appear(1000);
        chart.appear(1000,200);
        return () => root.dispose();
    }, []);

    return (
        <div style={{ transform: triggerRadarChart ? 'scale(1)' : 'scale(0)'}} id={chartID}></div>
    );
}