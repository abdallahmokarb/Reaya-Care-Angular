export interface IDocument {
    DocumentType: number;
    DoctorId: number;
}

export interface IDocumentResponse {
  
  documentType: string;
  data: {
    documentId: number;  
    filePath: string;
  
  };
}
