import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useContext } from 'react';
import ScanElement from '../../components/ScanElement';
import { ScanContextType } from '../../context/@type';
import { GlobalContext } from '../../context/GlobalState';
import './Home.css';

interface Scan {
  id: number;
  image: string;
  text: string;
}

const Home: React.FC = () => {
  const { scans } = useContext(GlobalContext) as ScanContextType

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">HOME</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          {scans.map(elt => <ScanElement key={elt.id} scan={elt}/>)}
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
