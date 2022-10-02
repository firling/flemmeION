import { IonContent, IonFab, IonFabButton, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { GlobalContext } from '../../context/GlobalState';
import { Clipboard } from '@capacitor/clipboard';
import { Toast } from '@capacitor/toast';

interface Scan {
  id: number;
  image: string;
  text: string;
}


const Element: React.FC = () => {
  const [scan, setScan] = useState<Scan | null>(null);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  
  const { delScan } = useContext(GlobalContext)

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`http://localhost:3333/api/scan/${id}`)
      console.log(res)
      setScan(res.data.scan)
    }
    getData()
  }, [])

  const delElement = async () => {
    const res = await axios.delete(`http://localhost:3333/api/scan/delete/${id}`)
    if (res.data.success) {
        console.log(res.data)
        delScan(res.data.scan.id)
        history.push('/')
    }
  }

  const copy = async () => {
    await Clipboard.write({
        string: scan?.text
    });

    await Toast.show({
        text: 'Copier dans le press papier !'
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Element {scan?.id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ELEM {scan?.id}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <img className="scan-img" src={`http://localhost:3333/images/${scan?.image}`} />
            <div className='scan-text-div'>
                <IonText>{scan?.text.split('\n').map((elt, i) => <p key={i}>{elt}</p>)}</IonText>
            </div>

            <IonFab vertical="bottom" horizontal="center" slot="fixed">
                <IonFabButton class="ion-margin-bottom" onClick={copy}>
                    <IonText>Copy</IonText>          
                </IonFabButton>
                <IonFabButton color="danger" class="ion-margin-bottom" onClick={delElement}>
                    <IonText>Del</IonText>          
                </IonFabButton>
            </IonFab>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Element;
