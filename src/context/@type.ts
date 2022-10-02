export interface Scan {
    id: number;
    image: string;
    text: string;
}

export type ScanContextType = {
    scans: Scan[];
    addScan: (todo: Scan) => void;
    delScan: (todo: Scan) => void;
};