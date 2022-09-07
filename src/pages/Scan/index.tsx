import { IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect } from 'react';
import { camera } from 'ionicons/icons';


import { usePhotoGallery } from '../../hooks/usePhotoGallery';

import './Scan.css';

const Scan: React.FC = () => {
  const { takePhoto } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SCAN</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={takePhoto}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Scan;
