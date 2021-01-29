import React from 'react';
import { Container } from 'react-bootstrap/lib/Tab';

const NoMatch = () => {
    return (
        <div className='container-fluid'>
            <row>
                <div className='col-md-12'>
                    <div className='jumbotron'>
                        <h1>404 Page Not Found</h1>
                        <h1>
                            <span role='img' aria-label='Eye Roll Emoji'>
                                🙄
                            </span>
                        </h1>
                    </div>
                </div>
            </row>
        </div>
    )
}

export default NoMatch;