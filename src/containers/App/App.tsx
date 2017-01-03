import * as React from 'react';
import {Store} from '../../store';
import {action} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import Editor from '../../components/Editor/Editor';
import MainHeader from '../../components/MainHeader/MainHeader';
import Project from '../../components/Project/Project';
import {loadProject} from '../../utils/data/import';

declare const process: any;
const dev = process.env.NODE_ENV !== 'production';

export interface IStore {
    store: Store;
}

@observer
export default class App extends React.Component<IStore, {}> {
    constructor(props: any) {
        super(props);
        const {store} = props;
        action(() => {
            loadProject(store);
        })();
    }
    render() {
        const {project} = this.props.store;
        return (
            <div>
                <MainHeader />
                <div>
                    { project ? <Editor /> : null }
                </div>
                {/*{dev ? <DevTools/> : null}*/}
            </div>
        );
    }
}