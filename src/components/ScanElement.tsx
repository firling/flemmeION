import { Link } from 'react-router-dom';
import './ExploreContainer.css';

interface Scan {
    id: number;
    image: string;
    text: string;
}

interface Props {
    scan: Scan
}

const ScanElement: React.FC<Props> = ({scan}) => {
    return (
        <Link to={`element/${scan.id}`}>
            <img className="scan-element" src={`http://localhost:3333/images/${scan.image}`} />
        </Link>
    );
};

export default ScanElement;
