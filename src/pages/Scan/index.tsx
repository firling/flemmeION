import { IonButton, IonLoading, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { camera, cloudyNight, constructOutline, image } from 'ionicons/icons';

import { usePhotoGallery } from '../../hooks/usePhotoGallery';

import { Photo } from '@capacitor/camera';

import axios from 'axios';

import './Scan.css';
import { GlobalContext } from '../../context/GlobalState';

const headers = {
  'Content-Type': 'application/octet-stream',
  'Ocp-Apim-Subscription-Key': '069758e26dfc4e9598e80bffaf2aa828'
}

const Scan: React.FC = () => {
  const [img, setImg] = useState<Photo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState("");
  const { takePhoto } = usePhotoGallery();
  
  const { addScan } = useContext(GlobalContext)

  const takePicture = async () => {
    const image = await takePhoto();
    setText("");
    setImg(image)
  }

  const scan = async () => {
    setLoading(true);
    const rawData = await fetch(`data:image/jpeg;base64,${img?.base64String!}`)
    const imgData = await rawData.blob();
    const res = await axios.post('https://flemme.cognitiveservices.azure.com/vision/v3.2/ocr?language=fr&detectOrientation=true&model-version=latest', imgData, {headers})
    
    console.log(res)

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
    setLoading(false)
  }

  const save = async () => {
    const data = {
      image: img?.base64String,
      format: img?.format,
      text
    }

    const res = await axios.post('http://localhost:3333/api/scan/create', data);
    if (res.data.success) {
      addScan(res.data.post)
    }
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
        <IonLoading
          isOpen={loading}
          message={'Scanning...'}
        />
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          {
            !! text ? (
              <IonFabButton class="ion-margin-bottom" onClick={save}>
                <IonText>Save</IonText>          
              </IonFabButton>
            ) : (
              <IonFabButton disabled={!img} class="ion-margin-bottom" onClick={scan}>
                <IonText>Scan</IonText>          
              </IonFabButton>
            )
          }
          <IonFabButton onClick={takePicture}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Scan;
