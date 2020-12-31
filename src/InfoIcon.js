// Info Icon

import React from 'react';

// import $ from 'jquery';

import { FaInfo } from 'react-icons/fa';
// replace  <i className="fa fa-info" aria-hidden="true"></i>
import screenshotBig from './screenshot.orig.png'
import screenshotSmall from './screenshot.png'

export default class InfoIcon extends React.Component{
    render() {
        return(
            <div>

                <div className="p-2 flex-fill bd-highlight">
                    <h1><span data-toggle="modal" data-target="#exampleModal">
                        <FaInfo />    
                        </span></h1>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Hints</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    <b>Introduction</b><br />
                                    Coronavirus disease 2019 (COVID-19) is an ongoing global pandemic. Here we applied a novel Bayesian hierarchical model to detect multiple change points based on the daily actively infectious cases. This website demonstrates the analysis results. 
                                </p>
                                <p>
                                    <b>Usage</b><br />
                                    <a href={screenshotBig} target="_blank" rel="noreferrer"><img src={screenshotSmall} alt="Screenshot cannot be viewed"/></a>
                                </p>
                                <p>
                                    <b>Cite</b><br />
                                    BayesSMILES: Bayesian Segmentation Modeling for Longitudinal Epidemiological Studies
                                </p>
                                <p>
                                    <b>Contact</b><br />
                                    <a href="mailto:Shuang.Jiang@UTSouthwestern.edu">Shuang Jiang</a>, <a href="mailto:Qiwei.Li@utdallas.edu">Qiwei Li</a>, <a href="mailto:Xiaowei.Zhan@UTSouthwestern.edu">Xiaowei Zhan</a>
                                </p>
                                <p>

                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}