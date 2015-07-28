'use strict';

import React from 'react';

import Header from '../components/Header.js';
import ClickableArea from '../components/ClickableArea.js';
import LeaderBoard from '../components/LeaderBoard.js';

export default React.createClass({
    render() {
        return (
            <div className="col-md-7 center">
                <div className="title">
                    <h1>Click game example:</h1>
                </div>
                <div className="header-parent">
                    <Header />
                </div>
                <div className="col-md-10 secondary-box center">
                    <ClickableArea />
                    <LeaderBoard />
                </div>
            </div>
        );
    }
});
