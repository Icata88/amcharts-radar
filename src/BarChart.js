import React, { useLayoutEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';

// Set data
const data = [
    {
    "category": "Schedule",
    "score": 5.5
}, 
{
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
},
 {
    "category": "Scope & Fees",
    "score": 4
}];

export const BarChart = ({
    chartID
}) => {

    useLayoutEffect(() => {
        /* Chart code */
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        const root = am5.Root.new(chartID);


        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        const chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "none",
            wheelY: "none"
        }));

        // We don't want zoom-out button to appear while animating, so we hide it
        chart.zoomOutButton.set("forceHidden", true);

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
        cursor.lineY.set('visible', false);
        cursor.lineX.set('visible', false);

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        const xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 30
        });
        // xRenderer.labels.template.setAll({
        //     rotation: -90,
        //     centerY: am5.p50,
        //     centerX: 0,
        //     paddingRight: 15
        // });

        xRenderer.grid.template.set("visible", false);
        xRenderer.labels.template.set('visible', false);

        const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "category",
            renderer: xRenderer
        }));

        const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            numberFormat: "#.0",
            min: 1,
            max: 7,
            strictMinMax: true,
            renderer: am5xy.AxisRendererY.new(root, {})
        }));

        const tooltip = am5.Tooltip.new(root, {
            getFillFromSprite: false,
            autoTextColor: false
        });

        tooltip.label.adapters.add('html', (html, target) => {
            const { dataItem } = target;
            if (dataItem) {
                const { dataContext } = dataItem;
                if (dataContext) {
                    const { category, score } = dataContext;
                    if (score >= 4) {
                        return `<div><span style=\"color: #1890FF; font-weight: bold\">${score}</span> <span style=\"color: #FFFFFF; font-weight: bold\">${category}</span></div>`;
                    } else {
                        return `<div><span style=\"color: #FF7875; font-weight: bold\">${score}</span> <span style=\"color: #FFFFFF; font-weight: bold\">${category}</span></div>`;
                    }
                }
            }
        });

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        const series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "score",
            categoryXField: "category",
            tooltip: tooltip
        }));

        tooltip.get('background').setAll({
            fill: am5.color('#262626'),
            color: am5.color('#FFFFFF')
        });

        // Rounded corners for columns
        // series.columns.template.setAll({
        //     cornerRadiusTL: 5,
        //     cornerRadiusTR: 5
        // });

        // Make each column to be of a different color
        series.columns.template.adapters.add("fill", (fill, target) => {
            if (target.dataItem.get('valueY') >= 4) {
                return am5.color('#1890FF');
            } else {
                return am5.color('#FF7875');
            }
        });

        series.columns.template.adapters.add("stroke", (stroke, target) => {
            if (target.dataItem.get('valueY') >= 4) {
                return am5.color('#1890FF');
            } else {
                return am5.color('#FF7875');
            }
        });

        series.columns.template.setAll({
            width: 30
        });

        yAxis.get('renderer').labels.template.setAll({
            fontSize: 12,
            fontWeight: '300'
        });

        // yAxis.get("renderer").labels.template.adapters.add('text', (text, target) => {
        //     if (target.dataItem) {
        //         console.log(target.dataItem);
        //     }
        // });

        // Add Label bullet
        // series.bullets.push(() => {
        //     return am5.Bullet.new(root, {
        //         locationY: 1,
        //         // sprite: am5.Label.new(root, {
        //         //     text: "{valueYWorking.formatNumber('#.')}",
        //         //     fill: root.interfaceColors.get("alternativeText"),
        //         //     centerY: 0,
        //         //     centerX: am5.p50,
        //         //     populateText: true
        //         // })             
        //     });
        // });

        xAxis.data.setAll(data);
        series.data.setAll(data);

        // update data with random values each 1.5 sec
        // setInterval(() => {
        //     updateData();
        // }, 1500)

        // const updateData = () => {
        //     am5.array.each(series.dataItems, (dataItem) => {
        //         let value = dataItem.get("valueY") + Math.round(Math.random() * 300 - 150);
        //         if (value < 0) {
        //             value = 10;
        //         }
        //         // both valueY and workingValueY should be changed, we only animate workingValueY
        //         dataItem.set("valueY", value);
        //         dataItem.animate({
        //             key: "valueYWorking",
        //             to: value,
        //             duration: 600,
        //             easing: am5.ease.out(am5.ease.cubic)
        //         });
        //     })

        //     sortCategoryAxis();
        // }


        // Get series item by category
        // const getSeriesItem = (category) => {
        //     for (let i = 0; i < series.dataItems.length; i++) {
        //         const dataItem = series.dataItems[i];
        //         if (dataItem.get("categoryX") == category) {
        //             return dataItem;
        //         }
        //     }
        // }


        // // Axis sorting
        // const sortCategoryAxis = () => {

        //     // Sort by value
        //     series.dataItems.sort((x, y) => {
        //         return y.get("valueY") - x.get("valueY"); // descending
        //         //return y.get("valueY") - x.get("valueY"); // ascending
        //     })

        //     // Go through each axis item
        //     am5.array.each(xAxis.dataItems, (dataItem) => {
        //         // get corresponding series item
        //         const seriesDataItem = getSeriesItem(dataItem.get("category"));

        //         if (seriesDataItem) {
        //             // get index of series data item
        //             const index = series.dataItems.indexOf(seriesDataItem);
        //             // calculate delta position
        //             const deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
        //             // set index to be the same as series data item index
        //             dataItem.set("index", index);
        //             // set deltaPosition instanlty
        //             dataItem.set("deltaPosition", -deltaPosition);
        //             // animate delta position to 0
        //             dataItem.animate({
        //                 key: "deltaPosition",
        //                 to: 0,
        //                 duration: 1000,
        //                 easing: am5.ease.out(am5.ease.cubic)
        //             })
        //         }
        //     });

        //     // Sort axis items by index.
        //     // This changes the order instantly, but as deltaPosition is set,
        //     // they keep in the same places and then animate to true positions.
        //     xAxis.dataItems.sort((x, y) => {
        //         return x.get("index") - y.get("index");
        //     });
        // }


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);     
        return () => root.dispose();   
    }, []);

    return (
        <div id={chartID}>

        </div>
    );
}
