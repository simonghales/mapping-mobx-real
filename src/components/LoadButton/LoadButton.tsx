import * as React from 'react';
import {action} from 'mobx';
import {observer} from 'mobx-react';
import store from '../../store';
import {loadProject} from '../../utils/data/import'

@observer
export default class LoadButton extends React.Component<{}, {}> {
    handleClick = action(() =>  {
        console.log('load stuff into the store', store);
        loadProject(store);
    })
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Load Project</button>
            </div>
        );
    }
}
