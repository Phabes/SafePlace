export type AddImageModalRes = {
  uri: string;
  isTaken: boolean;
};


export type ModalProps ={
  onPressFunction:any;
  isVisible:boolean;
  setVisible:any;
}