export interface IDocument {
    DocumentType: number;
    DoctorId: number;
}

export interface IDocumentResponse {
  isSuccess: boolean;
  statusDetails: string;
  data: {
    documentId: number;
    documentType: number;
    
    filePath: string;
    doctorId: number;
  };
}
