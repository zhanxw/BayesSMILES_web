import React from 'react';
import ReactEcharts from 'echarts-for-react';
// import GridLayout from 'react-grid-layout';

// import $ from 'jquery';

import US_data from "./us_lag10.json";



  
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {DATA: US_data};
      }
    /*  
    componentDidMount() {
        $.getJSON( process.env.PUBLIC_URL + "/us_lag10.json", function( data ) {
            this.setState({DATA: data});
            })
    }*/
    render() {
        console.log("DATA = ", this.state.DATA)
        const plotList = this.state.DATA.map( (val, idx) => this.drawSubPlot(this.state.DATA, idx))
        const fig = this.drawSubPlot(this.state.DATA, 0);
        /*
                    //create boxes into a grid layout
                    var r = document.getElementById('container');
                    var r2 = null;
                    for (var i = 0; i < DATA.length; ++i) {
                        if (i % 3 == 0) {
                            r2 = document.createElement("div");
                            r2.className = "row";
                            r.appendChild(r2);
                        }
                        var r3 = document.createElement("div");
                        r3.className = "col-md-4 shadow";
                        r3.id = 'main' + i;
                        r3.style = "height:300px";
                        r3.innerText = i;
                        r2.appendChild(r3);
                    }
                    for (i = 0; i < DATA.length; ++i) {
                        //this.drawSubPlot(DATA, i, 'main' + i)
                        console.log('drawSubplot', i);
                    }
                });

                <div className="container" id="container">
            {plotList.map( (opt,idx) => (
                <ReactEcharts key={idx} option = {opt} data-grid={{x: 1, y: 0, w: 3}}/>
            ))}
            
        </div>
                
        */
       console.log('fig=', fig);
      return (
    <div className="container" id="container">
        <div className = "row">
        {plotList.map( (opt,idx) => (
                <ReactEcharts key={idx} option = {opt} className = "col-md-4 shadow" style={{width: "33%"}}/>
            ))}

        </div>
    </div>
    
      )}
    drawSubPlot(data, idx) {
        // const DATA = this.state.DATA; // data;
        const DATA = data;
        const i = idx;
        // based on prepared DOM, initialize echarts instance
        // var myChart = echarts.init(document.getElementById(elementId));
    
        // specify chart configuration item and data
        // var death = [];
        // for (t = 0; t < 100; ++t) {
        //     death.push([t, Math.floor(Math.random() * 10)]);
        //     if (t > 0) {
        //         death[t][1] = death[t][1] + death[t - 1][1];
        //     }
        // }
        // console.log("drawSubPlot:DATA = ", DATA);
        // console.log("drawSubPlot:i = ", i);
        // console.log("DATA[i]", DATA[i]);
        var infected = DATA[i]["infected"];
        // console.log(infected[0]);
        // console.log((new Date(infected[0][0])).getTime());
        // var min_infected = Math.min(... infected.map(x => x[1]));
        var min_infected = Math.min(...infected.map(x => x[1]));
        var max_infected = Math.max(...infected.map(x => x[1]));
        if (max_infected > 10000) {
            max_infected = Math.ceil(max_infected / 10000) * 10000;
        } else if (max_infected > 5000) {
            max_infected = Math.ceil(max_infected / 5000) * 5000;
        } else if (max_infected > 1000) {
            max_infected = Math.ceil(max_infected / 1000) * 1000;
        } else if (max_infected > 500) {
            max_infected = Math.ceil(max_infected / 500) * 500;
        } else if (max_infected > 250) {
            max_infected = Math.ceil(max_infected / 250) * 250;
        }
        var title = DATA[i]["name"];
        var changePoint = DATA[i]["changepoint"];
        var changePoint_line = changePoint.map( function(x) { 
            return {
                "name" : "CP", xAxis: x["estimate"][0], 
                "label": "R0 estimate: " + x["estimate"][0] + 
                (x["span"].length === 2 ? "<br/>CI: " + x["span"][0] + " to " + x["span"][1] : "") } });            
        var changePoint_area = changePoint.map( function(x) { return {
            "span": x["span"],
            "label": "R0 estimate: " + x["estimate"][0] + "<br/>CI: " + x["span"][0] + " to " + x["span"][1]}});
        changePoint_area = changePoint_area.filter(function(x) {return x["span"].length === 2});
        changePoint_area = changePoint_area.map(x => [ {label: x["label"], coord: [x["span"][0], max_infected * 0.1]}, {coord: [x["span"][1], max_infected * 0.9]}]);
        var r0 = DATA[i]["r0"];
    
        var r0_text = r0.map(x=>x["estimate"][0]);
        var r0_span = r0.map(x=>x["span"]);
        var getMidDate = function (x) {
            // d1 = new Date("2020-03-25");
            // d2 = new Date("2020-03-30");
            // console.log(x);
            var d1 = new Date(x[0]);
            var d2 = new Date(x[1]);
            var elapsed = d2.getTime() - d1.getTime();
            var dMid = new Date();
            dMid.setTime(d1.getTime() + elapsed / 2);
            return dMid.toJSON().substring(0, 10)
        }
        r0_span = r0_span.map(x => getMidDate(x));
        var r0_data = r0_span.map(x => [x, max_infected]);
        // console.log("i=", i, "title = ", title, "r0_text", r0_text);
        /// r0_text = ["1.3", "3.5", "4.5"]; //TODO
        var option = {
            title: {
                text: title
            },
            tooltip: {
                trigger: "item",
                formatter: function(params, ticket, cb) {
    
                    // console.log(params[0].componentType);
                    //     console.log(params[0]);     
                    if (params.componentType === "series") {
                        if (params.seriesName === "R0") {
                            return "R0 = " + r0_text[params.dataIndex];
                        } else if (params.componentSubType === "line") {
                           // console.log("line:", params);
                            return "Infected on " + params.data[0] + "<br/>" + params.data[1]   ;
                        } else {
                            
                        }
                    } else if (params.componentType === "markLine") {
                        // console.log(params.data);
                        return params.data.label;
                        // return "Date: " + params.value;
                    } else if (params.componentType === "markArea") {
                        // console.log(params);
                        return params.data["label"];
                        // return "Confidence interval: <br/>" + 
                        // params.data["coord"][0][0] + 
                        // " to " + 
                        // params.data["coord"][1][0];
                    } else {
                        // console.log(params.componentType);
                        // console.log(params);                    
                    }
                    console.log(r0_text, "=>", params);    
                    console.log(params);
                }
            },
            grid: {
                left: "15%"
            },
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: min_infected,
                max: max_infected,
                inRange: {
                    color: ['#003000', '#003300']
                }
            }],
            // legend: {
            //     data:['Sales']
            // },
            xAxis: {
                type: 'time',
                boundaryGap: false                
                // axisLabel: {
                //     formatter: function(value, idx) {
                //         console.log('xaxis formatter', value);
                //         var date = new Date(value);
                //         return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
                //     }
                // }
            },
            yAxis: {},
            series: [{
                name: 'Cumulative deaths',
                showSymbol: true,
                // smooth: 0.6,
                // symbol: 'none',
                type: 'line',
                itemStyle: {
                    opacity: 0
                },
                lineStyle: {
                    // color: 'green',
                    width: 2
                },
                data: infected,
                markLine: {
                    silent: false,
                    label: { show: false },
                    symbol: ['none', 'none'],
                    data: changePoint_line
                    // [
                    //     {
                    //         name: 'CP1',
                    //         xAxis: 37.5 // TODO
                    //     },
                    //     {
                    //         name: 'CP1',
                    //         xAxis: 67.5
                    //     }
                    // ]
                },
                markArea: {
                    silent: false,
                    symbol: ['none', 'none'],
                    label: { show: false },
                    data: changePoint_area
                    // [
                    //     [
                    //         { coord: [35, 20] }, // TODO
                    //         { coord: [40, 480] }
                    //     ],
                    //     [
                    //         { coord: [65, 20] },
                    //         { coord: [70, 480] }
                    //     ]]
                }
            }, {
                name: 'R0',
                data: r0_data, //[[18, 450], [53, 450], [83, 450]], //TODO
                type: "scatter",
                symbol: 'pin'
            }]
        };
        return (option);
        /*
        return(
            <ReactEcharts option = {option}/>
        )
        */
        /*
        // use configuration item and data specified to show chart
        myChart.setOption(option);
        myChart.on('click', function (params) {
            // printing data name in console
            console.log(params);
        });
        */
    }
  }
  
export default Content;