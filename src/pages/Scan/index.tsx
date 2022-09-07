import { IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { camera } from 'ionicons/icons';

import { usePhotoGallery } from '../../hooks/usePhotoGallery';

import { Photo } from '@capacitor/camera';

import axios from 'axios';

import './Scan.css';

const headers = {
  'Content-Type': 'application/octet-stream',
  'Ocp-Apim-Subscription-Key': '069758e26dfc4e9598e80bffaf2aa828'
}

const Scan: React.FC = () => {
  const [img, setImg] = useState<Photo | null>(null);
  const [text, setText] = useState("");
  const { takePhoto } = usePhotoGallery();

  const takePicture = async () => {
    const image = await takePhoto();
    setImg(image)
  }

  const scan = async () => {
    const rawData = await fetch(`data:image/jpeg;base64,${img?.base64String!}`)
    const imgData = await rawData.blob();
    const res = await axios.post('https://flemme.cognitiveservices.azure.com/vision/v3.2/ocr?language=fr&detectOrientation=true&model-version=latest', imgData, {headers})
    
    var strData = "";

    for (const region of res.data.regions) {
      for (const line of region.lines) {
        for (const word of line.words) {
          strData += `${word.text} `
        }
        strData += `\n`
      }
      strData += `\n\n`
    }
    setText(strData)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SCAN</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        { !! img && 
          <img className="scan-img" src={`data:image/${img.format};base64,${img.base64String}`} />
        }
        {
          !! text &&
          <div className='scan-text-div'>
            <IonText>{text.split('\n').map(elt => <p>{elt}</p>)}</IonText>
          </div>
        }
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton disabled={!img} style={{marginBotton: 2}} onClick={scan}>
            <IonText>Scan</IonText>          
          </IonFabButton>
          <IonFabButton onClick={takePicture}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Scan;
