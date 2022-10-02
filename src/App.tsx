import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, scanOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { GlobalProvider } from './context/GlobalState';

import Home from './pages/Home';
import Scan from './pages/Scan';
import Element from './pages/Element';

setupIonicReact();


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <GlobalProvider>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/scan">
            <Scan />
          </Route>
          <Route exact path="/element/:id">
            <Element />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/scan">
            <IonIcon icon={scanOutline} />
            <IonLabel>Scan</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
      </GlobalProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
