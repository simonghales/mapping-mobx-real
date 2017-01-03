import * as React from 'react';
import {observer} from 'mobx-react';

@observer
export default class MainHeader extends React.Component<{}, {}> {
    render() {
        return (
            <div className='mainHeader'>
                <nav className='mainHeader__nav'>
                    <a href="#" className='mainHeader__nav__link'>
                        Visual Mode
                    </a>
                    <a href="#" className='mainHeader__nav__link'>
                        Generate Reports
                    </a>
                </nav>
            </div>
        );
    }
}
